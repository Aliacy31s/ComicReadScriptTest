import {
  insertNode,
  querySelector,
  querySelectorAll,
  scrollIntoView,
} from '../helper';
import { useCache } from '../helper/useCache';
import { useInit } from '../helper/useInit';

declare const fid: number;

interface History {
  tid: string;
  lastPageNum: number;
  lastReplies: number;
  lastAnchor: string;
}

(async () => {
  const { options, setFab, setManga, request, createShowComic } = await useInit(
    'yamibo',
    {
      记录阅读进度: {
        enable: true,
        上次阅读进度标签颜色: '#6e2b19',
        保留天数: -1,
      },
      关闭快捷导航按钮的跳转: true,
      修正点击页数时的跳转判定: true,
      固定导航条: true,
    },
  );

  await GM.addStyle(
    `#fab { --fab: #6E2B19; --fab_hover: #A15640; };
    ${
      options.固定导航条 ? '.header-stackup { position: fixed !important};' : ''
    }

    * {
      --lastReadTagColor: ${options.记录阅读进度.上次阅读进度标签颜色};
    }

    .historyTag {
      white-space: nowrap;

      border: 2px solid var(--lastReadTagColor);
    }

    a.historyTag {
      font-weight: bold;

      margin-left: 1em;
      padding: 1px 4px;

      color: var(--lastReadTagColor);
      border-radius: 6px 0 0 6px;
    }
    a.historyTag:last-child {
      border-radius: 6px;
    }

    div.historyTag {
      display: initial;

      margin-left: -.4em;
      padding: 1px;

      color: RGB(255, 237, 187);
      border-radius: 0 6px 6px 0;
      background-color: var(--lastReadTagColor);
    }

    #threadlisttableid tbody:nth-child(2n) div.historyTag {
      color: RGB(255, 246, 215);
    }

    // TODO: 看下有没有不需要的 css

    .tl th a:visited,
    .tl td.fn a:visited {
      color: #6E2B19;
    }

    .tl .num {
      width: 80px !important;
    }

    .tc {
      display: flex;
      justify-content: center;

      margin: 0;
    }

    #fp-nav ul li .fp-tooltip {
      color: black;
    }

    .header-tool.y {
      width: auto !important;
    }
    `,
  );

  if (options.关闭快捷导航按钮的跳转)
    // eslint-disable-next-line no-script-url
    querySelector('#qmenu a')?.setAttribute('href', 'javascript:;');

  // 判断当前页是帖子
  if (/thread(-\d+){3}|mod=viewthread/.test(document.URL)) {
    // 修复微博图床的链接
    [...document.querySelectorAll('img[file*="sinaimg.cn"]')].map((e) =>
      e.setAttribute('referrerpolicy', 'no-referrer'),
    );

    // 限定板块启用
    if (fid === 30 || fid === 37) {
      let imgList = querySelectorAll<HTMLImageElement>('.t_fsz img');

      const updateImgList = () => {
        let i = imgList.length;
        while (i--) {
          const img = imgList[i];

          const file = img.getAttribute('file');
          if (file && img.src !== file) img.setAttribute('src', file);

          // 测试例子：https://bbs.yamibo.com/thread-502399-1-1.html

          // 删掉表情和小图
          if (
            img.src.includes('static/image') ||
            (img.complete &&
              img.naturalHeight &&
              img.naturalWidth &&
              img.naturalHeight < 500 &&
              img.naturalWidth < 500)
          )
            imgList.splice(i, 1);
        }
        return imgList.map((img) => img.src);
      };

      setManga({
        // 在图片加载完成后再检查一遍有没有小图，有就删掉
        onLoading: (img) => {
          // 跳过符合标准的
          if (img.height && img.width && img.height > 500 && img.width > 500)
            return;

          const delImgIndex = imgList.findIndex(
            (image) => image.src === img.src,
          );
          if (delImgIndex !== -1) imgList.splice(delImgIndex, 1);

          setManga({ imgList: imgList.map((image) => image.src) });
        },
        onExit: (isEnd) => {
          if (isEnd) {
            scrollIntoView('.psth, .rate, #postlist > div:nth-of-type(2)');
            // 因为好像有懒加载的缘故，直接移到指定位置后会加载出新的楼层导致位置偏移
            // 所以移动两次并且在第二次延时移动后再隐藏漫画界面
            setTimeout(() => {
              scrollIntoView('.psth, .rate, #postlist > div:nth-of-type(2)');
              setManga({ show: false });
            });
          } else setManga({ show: false });
        },
      });

      updateImgList();
      const showComic = createShowComic(() => imgList.map((img) => img.src));
      if (options.autoShow) await showComic();

      setFab({ progress: 1, tip: '阅读模式', onClick: showComic });

      // 虽然有 Fab 了不需要这个按钮，但都点习惯了没有还挺别扭的（
      insertNode(
        querySelector('div.pti > div.authi')!,
        '<span class="pipe show">|</span><a id="comicReadMode" class="show" href="javascript:;">漫画阅读</a>',
      );
      document
        .getElementById('comicReadMode')
        ?.addEventListener('click', showComic);

      // 如果帖子内有设置目录
      if (querySelector('#threadindex')) {
        querySelectorAll('#threadindex li').forEach((dom) => {
          dom.addEventListener('click', () => {
            setTimeout(() => {
              imgList = querySelectorAll<HTMLImageElement>('.t_fsz img');
              setManga({
                imgList: updateImgList(),
                show: options.autoShow ?? undefined,
              });
            }, 1000);
          });
        });
      }
    }

    if (options.记录阅读进度.enable) {
      const { tid } = unsafeWindow;
      const res = await request(
        'GET',
        `https://bbs.yamibo.com/api/mobile/index.php?module=viewthread&tid=${tid}`,
        { errorText: '获取帖子回复数时出错' },
      );
      /** 回复数 */
      const allReplies = parseInt(
        JSON.parse(res.responseText)?.Variables?.thread?.allreplies,
        10,
      );
      if (!allReplies) return;

      /** 当前所在页数 */
      const currentPageNum = parseInt(
        document.querySelector('#pgt strong')?.innerHTML ?? '1',
        10,
      );

      const cache = useCache<{ history: History }>((db: IDBDatabase) => {
        db.createObjectStore('history', { keyPath: 'tid' });
      });
      const data = await cache.get('history', `${tid}`);
      // 如果是在翻阅之前页数的内容，则跳过不处理
      if (data && currentPageNum < data.lastPageNum) return;

      // 如果有上次阅读进度的数据，则监视上次的进度之后的楼层，否则监视所有
      /** 监视楼层列表 */
      const watchFloorList = querySelectorAll(
        data?.lastAnchor && currentPageNum === data.lastPageNum
          ? `#${data.lastAnchor} ~ div`
          : '#postlist > div',
      );
      if (!watchFloorList.length) return;

      let id = 0;
      /** 储存数据，但是防抖 */
      const debounceSave = (saveData: History) => {
        if (id) window.clearTimeout(id);
        id = window.setTimeout(async () => {
          id = 0;
          console.log('save');
          await cache.set('history', saveData);
        }, 200);
      };

      // 在指定楼层被显示出来后重新存储进度数据
      const observer = new IntersectionObserver(
        (entries) => {
          // 找到触发楼层
          const trigger = entries.find((e) => e.isIntersecting);
          if (!trigger) return;

          // 取消触发楼层上面楼层的监视
          const triggerIndex = watchFloorList.findIndex(
            (e) => e === trigger.target,
          );
          if (triggerIndex === -1) return;
          watchFloorList
            .splice(0, triggerIndex + 1)
            .forEach((e) => observer.unobserve(e));

          // 储存数据
          debounceSave({
            tid: `${tid}`,
            lastPageNum: currentPageNum,
            lastReplies: allReplies,
            lastAnchor: trigger.target.id,
          });
        },
        { threshold: 1.0 },
      );
      watchFloorList.forEach((e) => observer.observe(e));
    }

    return;
  }

  // 判断当前页是板块
  if (/forum(-\d+){2}|mod=forumdisplay/.test(document.URL)) {
    if (options.修正点击页数时的跳转判定) {
      const List = document.querySelectorAll('.tps>a');
      let i = List.length;
      while (i--) List[i].setAttribute('onclick', 'atarget(this)');
    }

    if (options.记录阅读进度.enable) {
      const cache = useCache<{ history: History }>((db: IDBDatabase) => {
        db.createObjectStore('history', { keyPath: 'tid' });
      });

      // 更新页面上的阅读进度提示
      const updateHistoryTag = () => {
        // 先删除所有进度提示
        querySelectorAll('.historyTag').forEach((e) => e.remove());

        // 再添加上进度提示
        return Promise.all(
          querySelectorAll('tbody[id^=normalthread]').map(async (e) => {
            const tid = e.id.split('_')[1];
            const data = await cache.get('history', tid);
            if (!data) return;

            const lastReplies =
              +e.querySelector('.num a')!.innerHTML - data.lastReplies;

            insertNode(
              e.getElementsByTagName('th')[0],
              `
                <a
                  class="historyTag"
                  onclick="atarget(this)"
                  href="thread-${tid}-${data.lastPageNum}-1.html#${
                data.lastAnchor
              }"
                >
                  回第${data.lastPageNum}页
                </a>
                ${
                  lastReplies > 0
                    ? `<div class="historyTag">+${lastReplies}</div>`
                    : ''
                }
              `,
            );
          }),
        );
      };
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      updateHistoryTag();

      // 切换回当前页时更新提示
      document.addEventListener('visibilitychange', updateHistoryTag);
      // 点击下一页后更新提示
      querySelector('#autopbn')!.addEventListener('click', updateHistoryTag);
    }
  }
})();
