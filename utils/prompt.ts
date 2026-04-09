import { BackgroundPattern, ColorScheme, CoverState } from '../types';
import { getTextElement } from './elements';

export function buildAiPrompt(
  state: CoverState,
  currentScheme: ColorScheme,
  currentPattern: BackgroundPattern
): string {
  const line1 = getTextElement(state, 'line1').content;
  const line2 = getTextElement(state, 'line2').content;
  const line3 = getTextElement(state, 'line3').content;

  return `
设计一张抖音封面，${state.ratio === '4:3' ? '4:3横屏' : '3:4竖屏'}。
背景颜色：${currentScheme.bg}，极简科技感，暗色调。
背景纹理：${currentPattern.name}。
文字内容：
1. 小标题："${line1}" (颜色 ${currentScheme.accent})
2. 主标题："${line2}" (白色超大粗体)
3. 副标题："${line3}" (灰色小字)
左下角添加微弱的${currentScheme.name}光晕。
`;
}

export function buildPromptPreview(state: CoverState, currentScheme: ColorScheme): string {
  const line1 = getTextElement(state, 'line1').content;
  const line2 = getTextElement(state, 'line2').content;

  return `// ${currentScheme.name} · ${state.ratio} \nPicture ideal for digital marketing. \nMain text: "${line2 || '...'}", color: White. \nAccent: "${line1 || '...'}", color: ${currentScheme.accent}.`;
}

export function getDownloadFileName(state: CoverState): string {
  const line2 = getTextElement(state, 'line2').content;
  return `cover-${line2}-${state.ratio.replace(':', '')}.png`;
}
