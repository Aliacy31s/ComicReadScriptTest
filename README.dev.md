TODO: 补全所有站点的 EndExit 回调
TODO: 禁止缩放功能还需要测试不同类型的图片
TODO: 为 Fab 增加点击特效
TODO: 迁移至 valtio

### dev

通过向开发服务器请求 bundle.user.js 代码，然后用 eval 执行，来实现每次刷新都是最新的代码，也不用复制粘贴到油猴，只需要将 dev.user.js 的代码添加到油猴离去就行了。
但如果有修改 @resource 或 @grant 之类的还是得手动更新。

### 动态导入外部库

`src\helper\import.ts`
创建一个自定义的 require 函数放在脚本开头，再让 rollup 导出 cjs 模块规范的代码，就能直接在脚本里使用 cjs、umd 模块了。
不过因为有些 cjs 会使用 node 环境特有的变量、在模块里再 require() 其他模块（这种情况下也需要将其依赖模块在 @resource 中声明），所以尽量还是选择 umd 的代码。

### 使用 React 组件

为了能实现动态导入，`src\component` 内的组件不能直接 `export`，需要导出一个返回函数组件的异步函数来 `() => Promise<React.FC<{}>>`。另外为了方便调用时命名（可以直接用 import 的组件名来声明变量），再在 `src\component\index.ts` 中重新声明一下。

### 支持新站点时的参考

能直接通过网页变量获取所有图片链接的站点参考 manhuagui
需要通过调用 api 获取所有图片链接的站点参考 mangabz