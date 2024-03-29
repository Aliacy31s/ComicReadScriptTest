import MdOutlineFormatTextdirectionLToR from '@material-design-icons/svg/round/format_textdirection_l_to_r.svg';
import MdOutlineFormatTextdirectionRToL from '@material-design-icons/svg/round/format_textdirection_r_to_l.svg';

import type { ChangeEvent } from 'react';
import { useCallback } from 'react';
import clsx from 'clsx';
import { useStore } from './hooks/useStore';
import { SettingsItem } from './components/SettingsItem';
import { SettingsItemSwitch } from './components/SettingsItemSwitch';
import { needDarkMode } from '../../helper';

import classes from './index.module.css';

export type SettingList = [string, React.FC][];

/** 默认菜单项 */
export const defaultSettingList: SettingList = [
  [
    '阅读方向',
    () => {
      const dir = useStore((state) => state.option.dir);
      const handleEditDir = useCallback(() => {
        useStore.setState((state) => {
          state.option.dir = state.option.dir === 'rtl' ? 'ltr' : 'rtl';
        });
      }, []);

      return (
        <SettingsItem
          name={dir === 'rtl' ? '从右到左（日漫）' : '从左到右（美漫）'}
        >
          <button
            className={classes.SettingsItemIconButton}
            type="button"
            onClick={handleEditDir}
          >
            {dir === 'rtl' ? (
              <MdOutlineFormatTextdirectionRToL />
            ) : (
              <MdOutlineFormatTextdirectionLToR />
            )}
          </button>
        </SettingsItem>
      );
    },
  ],
  [
    '滚动条',
    () => {
      const enabled = useStore((state) => state.option.scrollbar.enabled);
      const handleEnable = useCallback(() => {
        useStore.setState((state) => {
          state.option.scrollbar.enabled = !state.option.scrollbar.enabled;
        });
      }, []);

      const autoHidden = useStore((state) => state.option.scrollbar.autoHidden);
      const handleAutoHidden = useCallback(() => {
        useStore.setState((state) => {
          state.option.scrollbar.autoHidden =
            !state.option.scrollbar.autoHidden;
        });
      }, []);

      const showProgress = useStore(
        (state) => state.option.scrollbar.showProgress,
      );
      const handleShowProgress = useCallback(() => {
        useStore.setState((state) => {
          state.option.scrollbar.showProgress =
            !state.option.scrollbar.showProgress;
        });
      }, []);

      return (
        <>
          <SettingsItemSwitch
            name="显示滚动条"
            value={enabled}
            onChange={handleEnable}
          />
          <SettingsItemSwitch
            name="自动隐藏滚动条"
            value={autoHidden}
            className={clsx(enabled || classes.hidden)}
            onChange={handleAutoHidden}
          />
          <SettingsItemSwitch
            name="显示图片加载状态"
            value={showProgress}
            className={clsx(enabled || classes.hidden)}
            onChange={handleShowProgress}
          />
        </>
      );
    },
  ],
  [
    '点击翻页',
    () => {
      /** 是否启用点击翻页功能 */
      const clickPage = useStore((state) => state.option.clickPage.enabled);
      const handleClickPages = useCallback(() => {
        useStore.setState((state) => {
          state.option.clickPage.enabled = !state.option.clickPage.enabled;
        });
      }, []);

      /** 是否显示点击区域 */
      const showTouchArea = useStore((state) => state.showTouchArea);
      const handleShowTouchArea = useCallback(() => {
        useStore.setState((state) => {
          state.showTouchArea = !state.showTouchArea;
        });
      }, []);

      /** 是否左右反转点击区域 */
      const overturn = useStore((state) => state.option.clickPage.overturn);
      const handleOverturn = useCallback(() => {
        useStore.setState((state) => {
          state.option.clickPage.overturn = !state.option.clickPage.overturn;
        });
      }, []);

      return (
        <>
          <SettingsItemSwitch
            name="启用点击翻页"
            value={clickPage}
            onChange={handleClickPages}
          />
          <SettingsItemSwitch
            name="左右反转点击区域"
            value={overturn}
            className={clsx(!clickPage && classes.hidden)}
            onChange={handleOverturn}
          />
          <SettingsItemSwitch
            name="显示点击区域提示"
            value={showTouchArea}
            className={clsx(!clickPage && classes.hidden)}
            onChange={handleShowTouchArea}
          />
        </>
      );
    },
  ],
  [
    '其他',
    () => {
      const darkMode = useStore((state) => state.option.darkMode);
      const background = useStore((state) => state.option.customBackground);
      const handleDarkMode = useCallback(() => {
        useStore.setState((state) => {
          state.option.darkMode = !state.option.darkMode;
        });
      }, []);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const handleBgColor = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
          useStore.setState((state) => {
            // 在拉到纯黑或纯白时改回初始值
            state.option.customBackground =
              event.target.value === '#000000' ||
              event.target.value === '#ffffff'
                ? undefined
                : event.target.value;
            state.option.darkMode = needDarkMode(event.target.value);
          });
        },
        [],
      );

      const disableZoom = useStore((state) => state.option.disableZoom);
      const handleDisableZoom = useCallback(() => {
        useStore.setState((state) => {
          state.option.disableZoom = !state.option.disableZoom;
        });
      }, []);

      const flipToNext = useStore((state) => state.option.flipToNext);
      const handleFlipToNext = useCallback(() => {
        useStore.setState((state) => {
          state.option.flipToNext = !state.option.flipToNext;
        });
      }, []);

      return (
        <>
          <SettingsItemSwitch
            name="翻页至上/下一话"
            value={flipToNext}
            onChange={handleFlipToNext}
          />

          <SettingsItemSwitch
            name="启用夜间模式"
            value={darkMode}
            onChange={handleDarkMode}
          />

          <SettingsItemSwitch
            name="禁止放大图片"
            value={disableZoom}
            onChange={handleDisableZoom}
          />

          <SettingsItem name="背景颜色">
            <input
              type="color"
              value={background ?? (darkMode ? 'black' : 'white')}
              onChange={handleBgColor}
              style={{ width: '2em', marginRight: '.4em' }}
            />
          </SettingsItem>
        </>
      );
    },
  ],
  [
    '关于',
    () => (
      <>
        <SettingsItem name="版本号">
          <a href="https://github.com/hymbz/ComicReadScript">0.0.1</a>
        </SettingsItem>
        <SettingsItem name="反馈">
          <div>
            <a
              href="https://github.com/hymbz/ComicReadScript/issues"
              style={{ marginRight: '.5em' }}
            >
              Github
            </a>
            <a href="https://greasyfork.org/zh-CN/scripts/374903-comicread/feedback">
              Greasy Fork
            </a>
          </div>
        </SettingsItem>
      </>
    ),
  ],
];
