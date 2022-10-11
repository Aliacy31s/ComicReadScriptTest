import AutoStories from '@material-design-icons/svg/round/auto_stories.svg';

import { IconBotton } from '@crs/ui-component/dist/IconBotton';
import { showComicReadWindow } from '../components/ComicReadWindow';
import { showFab } from '../components/Fab';
import { useSiteValue } from '../helper';

// 页面自带的变量
declare const MANGABZ_CID: number;
declare const MANGABZ_MID: number;
declare const MANGABZ_VIEWSIGN_DT: string;
declare const MANGABZ_VIEWSIGN: string;
declare const MANGABZ_COOKIEDOMAIN: string;
declare const MANGABZ_CURL: string;
/** 总页数 */
declare const MANGABZ_IMAGE_COUNT: number;

(async () => {
  const [options, setOptions] = await useSiteValue('mangabz', {
    // TODO: 完成 comicRead 的 options 修改回调
    option: undefined,
    autoLoad: false,
  });

  const getImgList = async (imgList: string[] = []): Promise<string[]> => {
    const urlParams = Object.entries({
      cid: MANGABZ_CID,
      page: imgList.length + 1,
      key: '',
      _cid: MANGABZ_CID,
      _mid: MANGABZ_MID,
      _dt: MANGABZ_VIEWSIGN_DT.replace(' ', '+').replace(':', '%3A'),
      _sign: MANGABZ_VIEWSIGN,
    })
      .map(([key, val]) => `${key}=${val}`)
      .join('&');

    // FIXME: 完成 FAB 进度联调后删除
    console.log(imgList.length);

    const res = await GM.xmlHttpRequest({
      method: 'GET',
      url: `http://${MANGABZ_COOKIEDOMAIN}${MANGABZ_CURL}chapterimage.ashx?${urlParams}`,
    });

    if (res.status !== 200 || !res.responseText) {
      console.error('漫画图片加载出错', res);
      throw new Error('漫画图片加载出错');
    }

    // 返回的数据只能通过 eval 获得
    // eslint-disable-next-line no-eval
    const newImgList = [...imgList, ...(eval(res.responseText) as string[])];

    if (imgList.length !== MANGABZ_IMAGE_COUNT) {
      // TODO: 通过 fab 显示进度
      // comicReadMode.innerText = `漫画加载中 - ${imgList.length}/${MANGABZ_IMAGE_COUNT}`;
      return getImgList(newImgList);
    }

    return newImgList;
  };

  let imgList: string[] = [];
  const loadAndShowComic = async () => {
    if (!imgList.length) imgList = await getImgList();

    // TODO: 显示后需要将 #comicRead dom 的 display 改为 none 再改回来才能正常显示
    setTimeout(() => {
      showComicReadWindow(imgList);
    }, 1000 * 3);
  };

  showFab({
    tip: '进入阅读模式',
    onClick: loadAndShowComic,
    speedDial: [
      <IconBotton
        tip="自动加载"
        placement="left"
        enabled={options.autoLoad}
        onClick={() => setOptions({ ...options, autoLoad: !options.autoLoad })}
      >
        <AutoStories />
      </IconBotton>,
    ],
  });

  if (options.autoLoad) await loadAndShowComic();
})();