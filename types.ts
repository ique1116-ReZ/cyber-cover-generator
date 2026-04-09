export type Ratio = '4:3' | '3:4';
export type ThemeId = string;
export type LayoutStyleId = string;

export type TextElementId = 'line1' | 'line2' | 'line3';
export type CoverElementType = 'text';

export interface ColorScheme {
  id: string;
  name: string;
  accent: string;
  bg: string;
  glow: string;
  gradient: string;
}

export interface BackgroundPattern {
  id: string;
  name: string;
  css: string;
  size: string;
}

export interface TextElement {
  id: TextElementId;
  type: CoverElementType;
  content: string;
  fontSize: number;
  withBorder: boolean;
  withMarker: boolean;
  withDepth: boolean;
  colorRole: 'accent' | 'primary' | 'muted';
  weight: 'normal' | 'bold' | 'black';
}

export interface CoverThemePreset {
  id: ThemeId;
  name: string;
  tagline: string;
  defaultSchemeId: string;
  defaultBgPatternId: string;
  availableSchemeIds: string[];
  availableBackgroundIds: string[];
  defaultFontSizes: {
    line1: number;
    line2: number;
    line3: number;
  };
  fontFamily: string;
  titleCase: 'none' | 'uppercase';
  titleLetterSpacing: number;
  titleFontWeight: number;
  titleShadow: string;
  textAlign: 'left' | 'center';
  subtitleStyle: 'plain' | 'pill' | 'outline';
  primaryTextColor: string;
  secondaryTextColor: string;
  subtitleBg: string;
  subtitleBorder: string;
  patternOpacity: number;
  overlayGradient: string;
  frameStyle: 'none' | 'neon' | 'border';
}

export interface LayoutStylePreset {
  id: LayoutStyleId;
  name: string;
  description: string;
  textAlign: 'left' | 'center';
  alignItems: 'flex-start' | 'center';
  justifyContent: 'flex-start' | 'center' | 'flex-end';
  contentWidth: string;
  contentOffsetY: number;
  lineGapEm: number;
}

export interface CoverState {
  ratio: Ratio;
  schemeId: string;
  bgPatternId: string;
  themeId: ThemeId;
  layoutStyleId: LayoutStyleId;
  frameEnabled: boolean;
  decorEnabled: boolean;
  textureIntensity: number;
  elements: TextElement[];
}
