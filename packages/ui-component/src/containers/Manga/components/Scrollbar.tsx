import clsx from 'clsx';
import { memo, useMemo } from 'react';
import { shallow, useStore } from '../hooks/useStore';

import classes from '../index.module.css';

const selector = ({
  option: { dir, scrollbar },
  slideData,
  showScrollbar,
}: SelfState) => ({
  slideData,
  showScrollbar,
  dir,
  scrollbar,
});

/** 滚动条 */
export const Scrollbar: React.FC = memo(() => {
  const { slideData, showScrollbar, dir, scrollbar } = useStore(
    selector,
    shallow,
  );
  const activeIndex = useStore((state) => state.swiper?.activeIndex);

  /** 滚动条提示文本 */
  const tooltipText = useMemo(() => {
    if (!slideData.length || activeIndex === undefined) return '';

    const slideIndex = slideData[activeIndex].map((slide) => {
      let slideText = `${slide.index}`;
      // 如果图片未加载完毕则在其 index 后增加显示当前加载状态
      if (slide.loadType !== 'loaded') slideText += ` (${slide.loadType})`;
      return slideText;
    });
    if (dir === 'rtl') slideIndex.reverse();

    return `${slideIndex.join(' | ')}`;
  }, [slideData, activeIndex, dir]);

  return (
    <div
      className={clsx(classes.scrollbar, {
        [classes.hidden]: !scrollbar.enabled && !showScrollbar,
      })}
      role="scrollbar"
      aria-controls="mange-main"
      aria-valuenow={activeIndex || -1}
      tabIndex={0}
    >
      <div
        className={classes.scrollbarDrag}
        data-show={!scrollbar.autoHidden || showScrollbar}
      >
        <div className={classes.scrollbarPoper} data-show={showScrollbar}>
          {tooltipText}
        </div>
      </div>
    </div>
  );
});
