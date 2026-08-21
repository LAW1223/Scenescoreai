# Scene Score

Scene Score 是一个 Vite + React 的可部署前端演示站，包含首页沉浸式视频开场、作品索引、评委展示、评分方法说明和作品详情页。交互参考 [The Line Studio](https://thelinestudio.com/)，品牌 Logo、评委图片、视频和文案使用项目自己的素材。

## 快速启动

需要 Node.js 24（npm 随 Node.js 安装）。在项目根目录执行：

```powershell
npm install
npm run dev
```

浏览器打开终端输出的地址，通常是 `http://localhost:5173`。

常用命令：

```powershell
npm run check    # ESLint + TypeScript + Vite production build
npm run lint     # 代码检查
npm run build    # 生成 dist/
npm run preview  # 预览已生成的 dist/
```

Windows 下也可以使用：

```powershell
cd "E:\安装\Scenescoreai"
npm install
npm run dev -- --host 127.0.0.1
```

完整的后端交接说明、路由、动画边界和建议 API 见 [docs/TECH-HANDOFF.md](docs/TECH-HANDOFF.md)。
产品经理本地查看 UI 的方法见 [docs/PRODUCT-DEMO.md](docs/PRODUCT-DEMO.md)。

## 目录速览

- `src/pages/`：页面实现。
- `src/components/layout/`：全局 Header、Footer、路由纸张转场。
- `src/data/sceneScore.ts`：当前静态作品和评委数据。
- `public/media/`：首页视频、排行榜作品视频及授权说明。
- `public/images/`：Logo、评委素材和排行榜作品首帧图片。
- `src/styles/globals.css`：全局视觉、响应式和沉浸式首页样式。

## 交互说明

- 首页橙色遮罩是首屏滚动的第一阶段；遮罩完全离开后，视频才进入第二阶段。
- 首页视频在切回 Home 的纸张转场完成后再启动，减少视频解码和页面转场同时发生造成的卡顿。
- 首页视频使用 `ScrollTrigger` 固定在视口，避免橙色遮罩滚动时视频抖动。
- 顶部菜单使用 React Router + Framer Motion 做 1.25 秒的“纸张”切换：新页面从左下进入，旧页面向右退出。
- 作品列表支持网格/列表切换和类型筛选；评委页支持点击名单切换照片和简介。

## 打包原则

后端源码交付包不包含 `node_modules/`、`dist/`、`output/`、`.playwright-cli/` 和 `.git/`；后端或新设备拿到源码后重新执行 `npm install` 即可。产品经理 UI 演示包会额外保留已构建的 `dist/`，便于直接预览。
