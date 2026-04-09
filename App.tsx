import React, { useCallback, useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { AppHeader } from './components/AppHeader';
import { ControlPanel } from './components/ControlPanel';
import { PreviewCanvas } from './components/PreviewCanvas';
import { PromptHelper } from './components/PromptHelper';
import { BACKGROUNDS, INITIAL_STATE, LAYOUT_STYLES, SCHEMES, THEMES_WITH_FONTS } from './constants';
import { CoverState, LayoutStyleId, Ratio, TextElementId, ThemeId } from './types';
import { updateTextElement } from './utils/elements';
import { buildAiPrompt, buildPromptPreview, getDownloadFileName } from './utils/prompt';
import { applyThemeTemplate } from './utils/themeTemplate';

export default function App() {
  const [state, setState] = useState<CoverState>(INITIAL_STATE);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const currentScheme = SCHEMES.find((scheme) => scheme.id === state.schemeId) || SCHEMES[0];
  const currentPattern = BACKGROUNDS.find((pattern) => pattern.id === state.bgPatternId) || BACKGROUNDS[0];
  const currentTheme = THEMES_WITH_FONTS.find((theme) => theme.id === state.themeId) || THEMES_WITH_FONTS[0];
  const currentLayoutStyle = LAYOUT_STYLES.find((style) => style.id === state.layoutStyleId) || LAYOUT_STYLES[0];
  const availableSchemes = SCHEMES.filter((scheme) => currentTheme.availableSchemeIds.includes(scheme.id));
  const availableBackgrounds = BACKGROUNDS.filter((background) => currentTheme.availableBackgroundIds.includes(background.id));
  const activeScheme = availableSchemes.find((scheme) => scheme.id === state.schemeId) || availableSchemes[0] || currentScheme;
  const activePattern =
    availableBackgrounds.find((background) => background.id === state.bgPatternId) || availableBackgrounds[0] || currentPattern;

  const handleSetRatio = useCallback((ratio: Ratio) => {
    setState((prev) => ({ ...prev, ratio }));
  }, []);

  const handleSetText = useCallback((id: TextElementId, content: string) => {
    setState((prev) => updateTextElement(prev, id, { content }));
  }, []);

  const handleSetTextStyle = useCallback(
    (id: TextElementId, key: 'withBorder' | 'withMarker' | 'withDepth', value: boolean) => {
      setState((prev) => updateTextElement(prev, id, { [key]: value }));
    },
    []
  );

  const handleSetFontSize = useCallback((id: TextElementId, fontSize: number) => {
    setState((prev) => updateTextElement(prev, id, { fontSize }));
  }, []);

  const handleSetTextureIntensity = useCallback((textureIntensity: number) => {
    setState((prev) => ({ ...prev, textureIntensity }));
  }, []);

  const handleSetScheme = useCallback((schemeId: string) => {
    setState((prev) => ({ ...prev, schemeId }));
  }, []);

  const handleSetPattern = useCallback((bgPatternId: string) => {
    setState((prev) => ({ ...prev, bgPatternId }));
  }, []);

  const handleSetTheme = useCallback((themeId: ThemeId) => {
    setState((prev) => applyThemeTemplate(prev, themeId));
  }, []);

  const handleSetLayoutStyle = useCallback((layoutStyleId: LayoutStyleId) => {
    setState((prev) => ({ ...prev, layoutStyleId }));
  }, []);

  const handleSetFrameEnabled = useCallback((frameEnabled: boolean) => {
    setState((prev) => ({ ...prev, frameEnabled }));
  }, []);

  const handleSetDecorEnabled = useCallback((decorEnabled: boolean) => {
    setState((prev) => ({ ...prev, decorEnabled }));
  }, []);

  const handleDownload = useCallback(async () => {
    if (!previewRef.current) return;

    setIsGenerating(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 100));
      const dataUrl = await toPng(previewRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        quality: 1.0,
      });

      const link = document.createElement('a');
      link.download = getDownloadFileName(state);
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Failed to generate image', error);
      alert('生成图片失败，请重试');
    } finally {
      setIsGenerating(false);
    }
  }, [state]);

  const handleCopyPrompt = useCallback(() => {
    const prompt = buildAiPrompt(state, activeScheme, activePattern);
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [state, activePattern, activeScheme]);

  return (
    <div className="min-h-screen text-[#e8f0fe] relative overflow-hidden">
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundColor: '#060d1a',
          backgroundImage: `
            linear-gradient(rgba(0,229,204,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,204,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '44px 44px',
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-12">
        <AppHeader accentColor={activeScheme.accent} />

        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8 items-start">
          <ControlPanel
            state={state}
            currentScheme={activeScheme}
            availableSchemes={availableSchemes}
            availableBackgrounds={availableBackgrounds}
            isGenerating={isGenerating}
            onSetRatio={handleSetRatio}
            onSetText={handleSetText}
            onSetTextStyle={handleSetTextStyle}
            onSetTheme={handleSetTheme}
            currentLayoutStyle={currentLayoutStyle}
            onSetLayoutStyle={handleSetLayoutStyle}
            onSetFrameEnabled={handleSetFrameEnabled}
            onSetDecorEnabled={handleSetDecorEnabled}
            onSetScheme={handleSetScheme}
            onSetPattern={handleSetPattern}
            onSetFontSize={handleSetFontSize}
            onSetTextureIntensity={handleSetTextureIntensity}
            onDownload={handleDownload}
          />

          <div className="flex flex-col gap-6 sticky top-8">
            <PreviewCanvas
              state={state}
              currentScheme={activeScheme}
              currentPattern={activePattern}
              currentTheme={currentTheme}
              currentLayoutStyle={currentLayoutStyle}
              frameEnabled={state.frameEnabled}
              decorEnabled={state.decorEnabled}
              previewRef={previewRef}
            />
            <PromptHelper
              copied={copied}
              onCopyPrompt={handleCopyPrompt}
              promptPreview={buildPromptPreview(state, activeScheme)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
