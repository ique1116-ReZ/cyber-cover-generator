import { CoverState, TextElement, TextElementId } from '../types';

export function getTextElement(state: CoverState, id: TextElementId): TextElement {
  const element = state.elements.find((item) => item.id === id && item.type === 'text');
  if (!element) {
    throw new Error(`Missing text element: ${id}`);
  }
  return element;
}

export function updateTextElement(
  state: CoverState,
  id: TextElementId,
  patch: Partial<Pick<TextElement, 'content' | 'fontSize' | 'withBorder' | 'withMarker' | 'withDepth'>>
): CoverState {
  return {
    ...state,
    elements: state.elements.map((element) => {
      if (element.id !== id || element.type !== 'text') {
        return element;
      }
      return {
        ...element,
        ...patch,
      };
    }),
  };
}

export function getPrimaryTitle(state: CoverState): string {
  return getTextElement(state, 'line2').content;
}
