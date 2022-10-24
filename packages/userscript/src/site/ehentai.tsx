/* eslint-disable camelcase */

import { querySelector } from '../helper';
import { useInit } from '../helper/useInit';

(async () => {
  const { options, showFab, toast, showManga, setManga, request } =
    await useInit('nhentai', {
      自动翻页: true,
      彻底屏蔽漫画: true,
      在新页面中打开链接: true,
    });

  // 只在漫画页内运行
  if (!Reflect.has(unsafeWindow, 'gid')) return;

  const totalImgNum = parseInt(
    querySelector('#gdd > table > tbody > tr:nth-child(6) > td.gdt2')!
      .innerHTML,
    10,
  );
  let loadedImgNum = 0;

  /**
   * 从图片页获取图片的地址
   *
   * @param url
   */
  const getImgFromImgPage = async (url: string): Promise<string> => {
    const res = await request('GET', url);

    loadedImgNum += 1;
    showFab({
      progress: loadedImgNum / totalImgNum,
      tip: `加载中 - ${loadedImgNum}/${totalImgNum}`,
    });

    return res.responseText.split('id="img" src="')[1].split('"')[0];
  };

  /** 从详情页获取图片页的地址的正则 */
  const getImgFromDetailsPageRe =
    /(?<=<div class="gdtl" style="height:320px"><a href=").+?(?=">)/gm;
  const getImgFromDetailsPage = async (pageNum = 0): Promise<string[]> => {
    const res = await request(
      'GET',
      `${window.location.origin}${window.location.pathname}${
        pageNum ? `?p=${pageNum}` : ''
      }`,
    );

    // 从详情页获取图片页的地址
    const imgPageList = res.responseText.match(
      getImgFromDetailsPageRe,
    ) as string[];

    return Promise.all(imgPageList.map(getImgFromImgPage));
  };

  const imgList = { ehentai: [] as string[], nhentai: [] as string[] };

  const findAndShowComic = async () => {
    if (imgList.ehentai.length === 0) {
      try {
        showFab({ progress: 0 });
        const totalPageNum = +querySelector('td:nth-last-child(2)')!.innerText;
        imgList.ehentai = (
          await Promise.all(
            [...Array(totalPageNum).keys()].map((pageNum) =>
              getImgFromDetailsPage(pageNum),
            ),
          )
        ).flat();
        if (imgList.ehentai.length === 0) throw new Error('获取漫画图片失败');
        setManga({ imgList: imgList.ehentai });
      } catch (e: any) {
        console.error(e);
        toast(e?.message, { type: 'error' });
      }
    }

    showManga();
  };

  showFab({ progress: undefined, onClick: findAndShowComic });

  if (options.autoLoad) await findAndShowComic();
})();