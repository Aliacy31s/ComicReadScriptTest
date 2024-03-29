## TODO

- 测试平板上的使用
- 卷轴模式下滚动到底要能触发结束页

## 项目结构

为了能单独分隔出UI组件和不同站点的脚本逻辑的代码，项目通过 pnpm 的 workspace 功能分为了三个部分

- `/`: 根目录存放两个项目通用的各种配置文件以及各种杂项
- `/packages/ui-component`: 脚本用到的UI组件，通过 vite 进行测试
- `/packages/userscript`: 脚本的主体代码

在用 vscode 打开项目后，应该通过 `ComicReadScript.code-workspace` 文件打开工作区进行开发

## 调试

```bash
cd packages/userscript
pnpm dev
```

然后将 `dist/dev.user.js` 的代码添加到油猴扩展里去就行了，之后每次修改完代码后只要刷新页面就能运行最新的代码，只要没有修改到 @resource 或 @grant 都不用更新油猴扩展上的代码。

## 支持新站点

> 首先到 `src\index.tsx` 里参考其他网站增加站点对应的 url 和 `// #站点代码文件名` 的注释，再到 `src\site` 里创建 `站点代码文件名.tsx` 的文件，之后再开始编写里面的代码

先在站点漫画页的网页控制台执行下列代码找出网页内的自定义全局变量

```js
iframe = document.createElement("iframe", { url: "about:blank" });
iframe.style.display = "none";
document.body.appendChild(iframe);

Object.fromEntries(
  Object.entries(window)
    .filter(([x]) => !Reflect.has(iframe.contentWindow, x))
)
```

手动检视一遍看能不能通过变量直接获取所有图片的链接，如果可以就参考 [manhuagui.ts](/packages/userscript/src/site/manhuagui.tsx) 的代码，否则参考 [mangabz.ts](/packages/userscript/src/site/mangabz.tsx) 的代码

一般的代码逻辑流程是这样的

1. 通过页面变量或 url 的判断，跳过漫画页以外的页面
2. 使用 `useInit` 函数进行初始化，参数名为网站名，将会作为保存读取配置时的 id
3. 如果有上下一话的按钮，就通过 `setManga` 修改 onNext、onPrev 两个参数。注意如果按钮存在但无法点击的话，应该传递空值或直接不传
4. 向 `init` 函数传一个返回所有图片链接的函数

## 动态导入外部库

`src\helper\import.ts`
创建一个自定义的 require 函数放在脚本开头，再让 rollup 导出 cjs 模块规范的代码，就能直接在脚本里使用 cjs、umd 模块了。
不过因为有些 cjs 会使用 node 环境特有的变量、在模块里再 require() 其他模块（这种情况下也需要将其依赖模块在 @resource 中声明），所以尽量还是选择 umd 的代码。

另外为了尽量减少在无关页面浪费时间，components、helper 下的代码会被打包视为外部库 `'../helper'` 来使用，如果只需要其中一段代码则通过 `helper/XXX` 来导入即可。
