# Cyber Cover Generator - 开发进度记录

最后更新：2026-04-09  
项目路径：`/Users/rez/Documents/cyber-cover-generator`

## 1. 当前目标（用户已确认）

- 这是一个“抖音封面生成器”。
- 主题含义是“封面视觉系统主题”，不是“生成器界面皮肤”。
- 切换主题后应整体切换：字体、字号、配色、背景纹理、排版风格。
- 用户文案（三行文本）必须保持用户自定义，不应被主题覆盖。
- `cyber` 是默认主题，作为基线主题，后续新增主题与其解耦。

## 2. 已完成事项

### 2.1 架构重构（第一阶段）

- 将原本超大 `App.tsx` 拆分为多组件：
  - `components/AppHeader.tsx`
  - `components/ControlPanel.tsx`
  - `components/PreviewCanvas.tsx`
  - `components/PromptHelper.tsx`
- 提取工具函数：
  - `utils/elements.ts`
  - `utils/prompt.ts`
  - `utils/themeTemplate.ts`
- 状态从固定字段过渡到可扩展元素结构：
  - `state.elements[]`（`line1/line2/line3`）

### 2.2 主题系统（当前版本）

- 目前保留三个主题：
  - `cyber`（默认）
  - `anthropic`
  - `retro-future`（复古未来风）
- 主题切换会应用：
  - 默认配色（`defaultSchemeId`）
  - 默认背景纹理（`defaultBgPatternId`）
  - 默认字号（`defaultFontSizes`）
  - 排版/文字风格参数（字体、标题字距、字重、副标题样式等）
- 主题切换不会改文案内容。

### 2.3 主题专属配色池/纹理池

- 已实现按主题过滤：
  - `availableSchemeIds`
  - `availableBackgroundIds`
- `cyber` 主题已恢复完整 12 配色（用户要求）。
- `anthropic` 主题使用素雅配色池与纸感纹理池。
- `retro-future` 主题使用复古专属配色与纹理池。

### 2.4 排版风格系统（独立于主题）

- 新增“排版风格”下拉（与主题解耦，可自由组合）：
  - `左侧默认`（基线样式）
  - `居中聚焦`
  - `顶部引导`
  - `底部冲击`
  - `左中紧凑`
- 修复过一次回归：`左侧默认` 已恢复为原来的左侧居中视觉，不再挤到左上。

### 2.5 Anthropic 视觉方向（v2）

- 参考图方向：暖灰纸面、深色衬线标题、低饱和对比、克制纹理。
- 已加入 Anthropic 专属配色：
  - `anthropic-paper`
  - `anthropic-stone`
  - `anthropic-ink`
- 已加入 Anthropic 专属纹理：
  - `paper-fiber`
  - `linen`
  - `soft-haze`
  - `noise`
- 提升了 Anthropic 纹理可见性：
  - `patternOpacity` 提升
  - `mix-blend-mode: multiply`（Anthropic 下）
- 新增 Anthropic 专属“纹理强度”滑杆（仅 Anthropic 显示）。
- 三套配色已做“整体联动”，不再只是第一行颜色变化：
  - 主文字色
  - 副文字色
  - 副标题底色/边框
  - Mark 高亮色

### 2.6 文本特效开关（逐行）

- 已在三行输入框右侧新增 3 个逐行开关：
  - `边框`（文字外侧圆角矩形框，tab 风格）
  - `Mark`（高亮笔划效果）
  - `立体`（层次阴影）
- 三个开关适用于所有主题，且按行独立控制。
- 已按用户要求修正：
  - `cyber` 主题第三行默认不带 tab；
  - 只有用户手动开启“边框”才出现 tab 风格。

### 2.7 画面边框开关

- 新增“画面边框”总开关（在排版风格区域）：
  - 用户可控制是否显示最外层边框。
  - 默认开启。

### 2.8 复古未来风（新）

- 新增 `retro-future` 主题（参考 `page.html`）：
  - 米白纸面底色
  - 深色等宽字体语气
  - 虚线外框
  - 第一行黑底胶囊标签风
  - 主副标题之间虚线分隔
- 复古专属配色：
  - `retro-parchment`
  - `retro-ivory`
  - `retro-mint`
- 复古专属纹理：
  - `retro-grid-fine`
  - `retro-dash`
  - `retro-halftone`
  - `paper-fiber`
- 说明：曾新增 `retro-future-soft`，已按用户要求删除，仅保留 `retro-future`。

## 3. 当前文件状态（关键）

- 主题与设计参数：`constants.ts`
- 类型定义：`types.ts`
- 主流程编排：`App.tsx`
- 左侧面板（主题下拉、配色与纹理选择）：`components/ControlPanel.tsx`
- 右侧预览渲染逻辑：`components/PreviewCanvas.tsx`
- 主题应用逻辑：`utils/themeTemplate.ts`

## 4. 用户明确要求（不可偏离）

1. 主题定义是“封面主题”，不是应用 UI 主题。  
2. 主题切换应全套联动视觉参数。  
3. 文案始终用户自定义，不应自动替换。  
4. `cyber` 作为默认基准主题，不与后续主题耦合。  
5. 主题选择用下拉，不用平铺卡片。  
6. “边框”效果定义为文字外侧圆角矩形，不是字体描边。  
7. `cyber` 默认主题是基线，不与后续主题耦合。  
8. 复古未来风只保留一个版本，不保留柔和变体。  

## 5. 已知问题/风险

- Anthropic 视觉虽然已到 v2，但仍可能需继续微调：
  - 标题字重与行高细节
  - 留白节奏
  - 纹理强度边界（不同屏幕表现可能不同）
- 文本特效（边框/Mark/立体）目前可用，但不同字号下视觉权重还可继续精修。
- 复古未来风已做第一版主题化元素，后续可继续增强“信息卡片/虚线框”细节层次。
- 目前没有自动化测试（视觉回归/交互回归），主要靠手动验证。

## 6. 下一步建议（按优先级）

1. Anthropic 精调（继续贴近参考图：留白、标题层级、按钮/标签语气）  
2. 复古未来风精调（虚线密度、标签比例、分隔线节奏）  
3. 文本特效精调（按行字号自适配边框厚度、Mark 高度、立体阴影力度）  
4. 补最基础回归测试（主题切换、配色池过滤、纹理池过滤、文本特效与边框开关）  

## 7. 快速恢复上下文提示（给下次开发）

如果是继续本项目，先做这三步：

1. 打开 `DEVELOPMENT_PROGRESS.md` 查看目标与约束。  
2. 打开 `constants.ts` 查看当前主题配置与可用池。  
3. 在 `App.tsx + ControlPanel.tsx + PreviewCanvas.tsx` 连线检查“主题切换 -> 可选项过滤 -> 预览渲染”链路。  
