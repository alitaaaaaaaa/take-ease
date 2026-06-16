# Take Ease

给正在焦虑中的你的一封未来来信。

这是一个完整的沉浸式互动叙事网页项目：叙事疗愈 × 人生模拟 × 互动小说。产品从大学当下焦虑开始，逐步回溯到初高中和童年，并在最终页生成成长属性、人生轨迹树与最后一封未来来信。

## 目录结构

- `app/`：Next.js App Router 页面：首页、章节页、报告页
- `components/`：视觉小说、未来来信、雷达图、轨迹树、漂浮信件等组件
- `lib/types.ts`：TypeScript 数据模型
- `lib/data.ts`：示例剧情数据与章节结构
- `lib/storage.ts`：LocalStorage 自动存档系统
- `public/assets/`：项目内生成的 PNG 场景资产

## 页面架构

1. `/` 首页：Hero、漂浮信件、开始/继续/重开
2. `/journey/university` 大学副本《你的选择，自有答案》
3. `/journey/teen` 初高中副本《那些还来得及的事》
4. `/journey/childhood` 童年副本《最初的房间》
5. `/report` 人生整合报告与最终来信

## 运行

```bash
npm install
npm run dev
```

然后打开 `http://localhost:3000`。

## 技术栈

Next.js、TypeScript、TailwindCSS、Shadcn 风格 UI、Framer Motion、Recharts、Lucide Icons、LocalStorage。
