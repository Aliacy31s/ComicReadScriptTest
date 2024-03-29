

### [0.2.1](https://github.com/hymbz/ComicReadScriptTest/compare/v0.2.0...v0.2.1) (2023-03-26)


### Bug Fixes

* :bug: 修复 FAB 背景不能正常消失的 bug ([dfb4c15](https://github.com/hymbz/ComicReadScriptTest/commit/dfb4c150148c2279ab52be693674571841b5d7ec))


### Performance Improvements

* :zap: 声明所有已知的 [@connect](https://github.com/connect) 以避免对话框 ([d838199](https://github.com/hymbz/ComicReadScriptTest/commit/d838199f33725692f40c0d8b42a0a834e3acc09b))

## [0.2.0](https://github.com/hymbz/ComicReadScriptTest/compare/v0.1.0...v0.2.0) (2023-03-20)


### Features

* :sparkles: 为百合会的自动签到功能加上设置开关 ([90f915a](https://github.com/hymbz/ComicReadScriptTest/commit/90f915a42ac9f2bd5e0207a6f2960b2e7f90c3f1))
* :sparkles: 支持动漫之家的国漫 ([bba3e0a](https://github.com/hymbz/ComicReadScriptTest/commit/bba3e0a7e7578735e2e4ed492d4e90aec0ad9988))
* :sparkles: 重构 xmlHttpRequest 相关函数以支持暴力猴 ([f04a521](https://github.com/hymbz/ComicReadScriptTest/commit/f04a5216eaf012f5cf23c9ee6b43134e557d6441))


### Bug Fixes

* :bug: 修复 nhentai 彻底屏蔽漫画功能异常的 bug ([0e3affa](https://github.com/hymbz/ComicReadScriptTest/commit/0e3affaf4f1f1fc6a3fba62d55b8f65c7e3c0843))

## [0.1.0](https://github.com/hymbz/ComicReadScriptTest/compare/v0.0.1-beta...v0.1.0) (2023-03-16)


### Features

* :sparkles: 补全站点的 onExit 回调 ([dfae914](https://github.com/hymbz/ComicReadScriptTest/commit/dfae914d7198e460b5f36c300170f9f98cf8475d))
* :sparkles: 当图片列表里只有一张时也不显示 ([f77204c](https://github.com/hymbz/ComicReadScriptTest/commit/f77204cfac1ee66167567366197516e35f684bc5))
* :sparkles: 调整 FAB 长宽为自适应 ([699eb5b](https://github.com/hymbz/ComicReadScriptTest/commit/699eb5b5f985e4ebb4715a7a55ca5fe06f77f948))
* :sparkles: 将结束页的 zIndex 调高，防止在显示结束页时触发侧边工具栏 ([63eaa26](https://github.com/hymbz/ComicReadScriptTest/commit/63eaa26457f36d66549e19dbe386fbd8fbc30e68))
* :sparkles: 没有 onPrev 时不弹出卷首结束页 ([d197831](https://github.com/hymbz/ComicReadScriptTest/commit/d197831a5f3a696ab0f571f37c499d9d42bd9341))
* :sparkles: 实现百合会的上/下一话功能 ([ba698e3](https://github.com/hymbz/ComicReadScriptTest/commit/ba698e315bfe01e10d91addb454af5ab453e1885))
* :sparkles: 实现百合会的剩余所有功能 ([b705cca](https://github.com/hymbz/ComicReadScriptTest/commit/b705ccac3063854c485bc8a3a506abef639b41d3))
* :sparkles: 实现百合会自动签到 ([ea2c3b1](https://github.com/hymbz/ComicReadScriptTest/commit/ea2c3b18750173d16657c2c69a0b611b823cc9ae))
* :sparkles: 实现滚动模式下的结束页显示 ([aa890b3](https://github.com/hymbz/ComicReadScriptTest/commit/aa890b3689452991c5e26a831ed354efb6fb43d8))
* :sparkles: 实现设置面板在浏览器高度不足时的正常显示 ([5648fb1](https://github.com/hymbz/ComicReadScriptTest/commit/5648fb12bb88c0f8c8a6fe929382e81c83817961))
* :sparkles: 实现下载功能 ([d9acaa8](https://github.com/hymbz/ComicReadScriptTest/commit/d9acaa8fd034be4ea42f51583a28481b733ed0b5))
* :sparkles: 提供隐藏 fab 的选项，同时在所有站点的菜单里加入「进入阅读模式」的菜单项 ([c3d01e7](https://github.com/hymbz/ComicReadScriptTest/commit/c3d01e726932fb921ba370b5ae112f354299481c))
* :sparkles: 跳过百合会第一页以后的帖子 ([e582f35](https://github.com/hymbz/ComicReadScriptTest/commit/e582f35daa3b613aa933dbb958b47d35c6822c18))
* :sparkles: 完成百合会css ([349ed26](https://github.com/hymbz/ComicReadScriptTest/commit/349ed26a7debba254902fa810c39d93940592d24))
* :sparkles: 为 ehentai 增加 快捷键翻页 功能 ([cac53fa](https://github.com/hymbz/ComicReadScriptTest/commit/cac53fa742346a14bfd46301f5e4638ca026e78d))
* :sparkles: 为 FAB 组件加上自动半透明化的功能 ([c8b5875](https://github.com/hymbz/ComicReadScriptTest/commit/c8b5875a63b5907f249cfea00bdaae2125f54f82))
* :sparkles: 为百合会增加设置面板 ([7a4acfa](https://github.com/hymbz/ComicReadScriptTest/commit/7a4acfa0cbc60241f489e47a5c37002b23c52355))
* :sparkles: 为不同站点的 Fab 适配不同颜色 ([77a79a2](https://github.com/hymbz/ComicReadScriptTest/commit/77a79a2df6756e2515183a45fbb109867ca9deef))
* :sparkles: 为设置项增加 开/关 的提示 ([dcea73c](https://github.com/hymbz/ComicReadScriptTest/commit/dcea73c798e9c5279e848d18efc93e4ae9ee6187))
* :sparkles: 为图片比例加上最大限制，防止在过宽的显示器上判断出错 ([3c9fc2b](https://github.com/hymbz/ComicReadScriptTest/commit/3c9fc2b2adcf1faa1c26ac9cb6e4410862e2c1ae))
* :sparkles: 修改结束页的继续滚动功能的逻辑和相关显示 ([ea4c703](https://github.com/hymbz/ComicReadScriptTest/commit/ea4c7030f60936a21b269433c78823efbd647c6c))
* :sparkles: 在 Fab 的快捷拨号内增加网站设置项的启用关闭按钮 ([18106e2](https://github.com/hymbz/ComicReadScriptTest/commit/18106e2a83f077ff2ee174c6fbf1bcbe1ce79664))
* :sparkles: 在滚动出结束页后不会立刻触发上下话切换 ([06beff8](https://github.com/hymbz/ComicReadScriptTest/commit/06beff8f891b88fc1af9c81d59ce5f5efb31e82b))
* :sparkles: 在设置面板增加关于项 ([24aff93](https://github.com/hymbz/ComicReadScriptTest/commit/24aff93fd5b5f0c588d6e49116799f213d51ca41))
* :sparkles: 增加 ehentai 上的错误提示 ([d9931f6](https://github.com/hymbz/ComicReadScriptTest/commit/d9931f673298700d4ee3870a0858d9fe7cf894f3))
* :sparkles: 增加更新提示 ([d3cfb11](https://github.com/hymbz/ComicReadScriptTest/commit/d3cfb111b9df0d09b9a5f495a25612db774a767e))
* :sparkles: 增加滚动到尽头时继续滚动是要退出还是跳至上/下一话的设置项 ([38882fe](https://github.com/hymbz/ComicReadScriptTest/commit/38882fe487d86a15d1643e9d99b5003fd00204ef))
* :sparkles: 增加开头的结束页和在结束页上翻页的上下话切换功能 ([5dc5ba5](https://github.com/hymbz/ComicReadScriptTest/commit/5dc5ba5b60e30e14c667782d176bede342d5d4d3))
* :sparkles: 增加快捷键 z 切换页面填充 ([27f2d5d](https://github.com/hymbz/ComicReadScriptTest/commit/27f2d5d1a4bde7633ea213a400a945026a4e6bb3))
* :sparkles: 增加阅读模式的进出渐隐动画 ([1d8fb1c](https://github.com/hymbz/ComicReadScriptTest/commit/1d8fb1c1131d4e6084e7665063469b258f6ed2a7))
* :sparkles: 增加支持禁漫天堂 ([c79d6ac](https://github.com/hymbz/ComicReadScriptTest/commit/c79d6ac209f83abd788305eb38e545720d9c808d))
* :sparkles: 只在支持触屏的设备上默认开启点击翻页 ([5a33b08](https://github.com/hymbz/ComicReadScriptTest/commit/5a33b084707d1db94adc08409fc6fefee8cca763))
* :sparkles: nhentai 匹配失败改为在页面上提示，不弹框 ([f466505](https://github.com/hymbz/ComicReadScriptTest/commit/f4665058a49f1c633fa968e3d19698b0aa4672aa))
* 优化修改 ([972810a](https://github.com/hymbz/ComicReadScriptTest/commit/972810ab8095ac873a5351ff6f7dacf1c73fca06))


### Bug Fixes

* :bug: 统一改为在所有页面都会自动加载图片列表，之后根据菜单选项切换是否要在「列表加载完成」后自动进入 ([37f8dbe](https://github.com/hymbz/ComicReadScriptTest/commit/37f8dbe7d674605654f1321998367e0ac16e2d45))
* :bug: 修复 从倒数第二页开始快速滚动会直接跳至第一页的 bug ([e2e9451](https://github.com/hymbz/ComicReadScriptTest/commit/e2e94511552e5637a98b98280fca699f9e1bad48))
* :bug: 修复 单双页模式切换时提示没有跟着切换 的 bug ([6867c17](https://github.com/hymbz/ComicReadScriptTest/commit/6867c1725cf73042648f2a85add836bd8e1210cb))
* :bug: 修复 漫画图片不显示的 bug ([dd5973b](https://github.com/hymbz/ComicReadScriptTest/commit/dd5973b7c05489fb23b654028cbacadd7325bf4b))
* :bug: 修复 修改 imgList 参数时会导致所有图片闪烁的 bug ([04dfd86](https://github.com/hymbz/ComicReadScriptTest/commit/04dfd86ca6b0480806d5fd839bf10e4a02c8b9c5))
* :bug: 修复 在 imgList 中有重复 url 的情况下发生变动会导致 imgList 中出现重复 index 的图片的 bug ([5d86304](https://github.com/hymbz/ComicReadScriptTest/commit/5d86304cd2c2143749312d340f352250308d6b61))
* :bug: 修复 在标签页处于后台时进入阅读模式时未能正确初始化页面比例的 bug ([e316dfa](https://github.com/hymbz/ComicReadScriptTest/commit/e316dfad05740eb26a4e36f14911041b4ac26dab))
* :bug: 修复 在卷轴模式下通过滚动关闭结束页时会触发页面滚动的 bug ([3184e2c](https://github.com/hymbz/ComicReadScriptTest/commit/3184e2c19ec7704dfcc274f187a7fb00201baa45))
* :bug: 修复 长漫画滚动时滚动条会出现闪烁跳跃的 bug ([ef50592](https://github.com/hymbz/ComicReadScriptTest/commit/ef50592a4d5204e5e95953851ac38e5e66ccddd7))
* :bug: 修复 copymanga 上一页按钮的选择器失效的 bug ([d078501](https://github.com/hymbz/ComicReadScriptTest/commit/d07850184c414daf9d040725f84393155c5b8f6e))
* :bug: 修复百合会退出时阅读模式时会因为触发图片懒加载导致跳转位置错误的 bug ([c665cd6](https://github.com/hymbz/ComicReadScriptTest/commit/c665cd63b2312109b0a023c526c6bb6939df8f8d))
* :bug: 修复百合会因为没有使用 createShowComic 而导致的功能缺失 ([4c10580](https://github.com/hymbz/ComicReadScriptTest/commit/4c10580aadf43057fbec20f26563caf6bb9aec88))
* :bug: 修复结束页关闭时 tip 会立刻消失的 bug ([135f05a](https://github.com/hymbz/ComicReadScriptTest/commit/135f05a8698516da50ee66374578c3f0b5c03f69))
* :bug: 修复卷轴模式图片高度被限制为100%的 bug ([2a6ced8](https://github.com/hymbz/ComicReadScriptTest/commit/2a6ced87ae320f3711f54dd18c812f3a8e190d27))
* :bug: 修复使用 end 键后会报错的 bug ([ac5a0ee](https://github.com/hymbz/ComicReadScriptTest/commit/ac5a0eea5079b0ee971c534abef8589879c7f8ac))
* :bug: 修复跳转至下一话时会跳至开头的 bug ([708cbec](https://github.com/hymbz/ComicReadScriptTest/commit/708cbec61f2f51e39492e2bde97dd6adb014e691))
* :bug: 修复通过从卷尾结束页退出时没有正确触发回调的 bug ([1aa07cd](https://github.com/hymbz/ComicReadScriptTest/commit/1aa07cd51516ea44d80e861472f0d2d58c49d94d))
* :bug: 修复通过滚动退出时没有回到第一页的 bug ([92f7282](https://github.com/hymbz/ComicReadScriptTest/commit/92f7282e93421e4a66304cf53664e95a27d7b91f))
* :bug: 修复退出阅读模式后无法点击页面的 bug ([452bb30](https://github.com/hymbz/ComicReadScriptTest/commit/452bb3001fdd1b7ce3452ea4462aaf906242b6a2))
* :bug: 修复之前改为网格布局导致的图片出现中缝的 bug ([5934bee](https://github.com/hymbz/ComicReadScriptTest/commit/5934bee05bae94e4c5826d598aa716e054049368))


### Performance Improvements

* :zap: 重构打包流程，减少重复代码，减少无关页面的运行时间 ([5de1822](https://github.com/hymbz/ComicReadScriptTest/commit/5de18227f6bf5fe51c825ec78e276dd6203db67d))
* 改用 grid-template-areas 调整布局 ([8d7061d](https://github.com/hymbz/ComicReadScriptTest/commit/8d7061d9aaefe9cfcdc064a2ea8543c834eb7b7a))