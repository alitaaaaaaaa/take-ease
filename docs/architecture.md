# Take Ease 项目设计说明

## 1. 完整项目目录结构

```text
take-ease/
  app/
    layout.tsx
    page.tsx
    globals.css
    journey/[chapter]/page.tsx
    report/page.tsx
  components/
    AttributeRadar.tsx
    FloatingLetters.tsx
    GrowthTree.tsx
    LetterModal.tsx
    NarrativeScene.tsx
    Typewriter.tsx
    ui/button.tsx
  lib/
    data.ts
    storage.ts
    types.ts
    utils.ts
  public/assets/
    dorm-night.png
    school-corridor.png
    childhood-room.png
    paper-grain.png
  docs/
    architecture.md
```

## 2. 页面架构

- `/`：首页 Hero。提供“开始我的旅程”“继续我的故事”“重新开始”。
- `/journey/university`：大学副本《你的选择，自有答案》。包含保研、实习、留学、就业四类焦虑场景。
- `/journey/teen`：初高中副本《那些还来得及的事》。包含转学融入、成绩单之夜、高二暗恋。
- `/journey/childhood`：童年副本《最初的房间》。包含试卷、画笔、讲故事比赛、操场边的位置。
- `/report`：人生整合报告。展示动态雷达图、人生轨迹树、专属关键词和最终来信。

## 3. 数据模型

核心类型定义在 `lib/types.ts`：

- `AttributeKey`：成长属性键名。
- `Attributes`：六维成长属性数值。
- `ChapterId`：章节 ID。
- `Choice`：选项、结果反馈、未来来信和属性影响。
- `Scene`：视觉小说场景。
- `Chapter`：副本章节。
- `SaveState`：LocalStorage 存档结构。

## 4. 成长属性系统

六个属性：

- 自我认同
- 心理韧性
- 表达能力
- 探索欲
- 关系信任
- 情绪觉察

用户每次选择会影响属性，属性在 `AttributeRadar` 中以 Recharts 雷达图动态展示。

## 5. 组件设计

- `NarrativeScene`：全屏视觉小说模式，支持背景图、情绪标签、打字机文本、选项与章节进度。
- `LetterModal`：未来来信弹窗，使用信纸质感与柔和展开动画。
- `Typewriter`：打字机文本组件。
- `FloatingLetters`：首页漂浮信件与缓慢动画。
- `AttributeRadar`：成长属性雷达图。
- `GrowthTree`：人生轨迹树，回看所有选择路径。
- `Button`：Shadcn 风格按钮组件，使用 8px 圆角、可组合 variant。

## 6. 存档系统

`lib/storage.ts` 使用 `localStorage` 保存：

- 当前章节
- 已完成场景
- 所有选择记录
- 成长属性
- 报告解锁状态
- 更新时间

存档键名为 `take-ease-save-v1`。

## 7. 动画实现

项目使用 Framer Motion：

- 首页标题和文案渐入
- 信件漂浮
- 视觉小说面板进入
- 未来来信弹窗淡入与展开

CSS 中还包含纸张噪点、打字机光标、柔和光晕背景。

## 8. 示例剧情数据

剧情数据集中在 `lib/data.ts`，采用“现在 → 回溯 → 整合”结构：

1. 大学：用户从真实焦虑进入。
2. 初高中：理解评价、比较和表达。
3. 童年：理解焦虑最初的保护方式。
4. 报告：整合选择路径和成长属性。

## 9. 视觉系统

主色来自需求：

- 背景：`#FAF8F4`、`#F5EEDC`
- 文字：`#3A3A3A`
- 强调：`#89A8B2`、`#A3B18A`
- 辅助：`#D6CFC7`

项目内包含三张叙事背景 PNG 和一张纸张纹理 PNG，用于避免纯色占位，让页面更像“会回应自己的小说”。

## 10. 运行方式

```bash
npm install
npm run dev
```

打开 `http://localhost:3000`。
