import { THEMES_WITH_FONTS } from '../constants';
import { CoverState, ThemeId } from '../types';

export function applyThemeTemplate(state: CoverState, themeId: ThemeId): CoverState {
  const theme = THEMES_WITH_FONTS.find((item) => item.id === themeId);
  if (!theme) {
    return { ...state, themeId };
  }

  return {
    ...state,
    themeId,
    schemeId: theme.defaultSchemeId,
    bgPatternId: theme.defaultBgPatternId,
    elements: state.elements.map((element) => {
      if (element.id === 'line1') return { ...element, fontSize: theme.defaultFontSizes.line1 };
      if (element.id === 'line2') return { ...element, fontSize: theme.defaultFontSizes.line2 };
      if (element.id === 'line3') return { ...element, fontSize: theme.defaultFontSizes.line3 };
      return element;
    }),
  };
}
