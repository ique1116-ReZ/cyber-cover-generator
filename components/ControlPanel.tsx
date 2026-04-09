import React from 'react';
import { Download, Grid, LayoutTemplate, Palette, RefreshCw, Sparkles, Type } from 'lucide-react';
import { THEMES_WITH_FONTS } from '../constants';
import { BackgroundPattern, ColorScheme, CoverState, LayoutStylePreset, Ratio, TextElementId, ThemeId } from '../types';
import { getTextElement } from '../utils/elements';

interface ControlPanelProps {
  state: CoverState;
  currentScheme: ColorScheme;
  availableSchemes: ColorScheme[];
  availableBackgrounds: BackgroundPattern[];
  isGenerating: boolean;
  onSetRatio: (ratio: Ratio) => void;
  onSetText: (id: TextElementId, content: string) => void;
  onSetTextStyle: (id: TextElementId, key: 'withBorder' | 'withMarker' | 'withDepth', value: boolean) => void;
  onSetTheme: (themeId: ThemeId) => void;
  currentLayoutStyle: LayoutStylePreset;
  onSetLayoutStyle: (layoutStyleId: string) => void;
  onSetFrameEnabled: (enabled: boolean) => void;
  onSetDecorEnabled: (enabled: boolean) => void;
  onSetScheme: (schemeId: string) => void;
  onSetPattern: (patternId: string) => void;
  onSetFontSize: (id: TextElementId, fontSize: number) => void;
  onSetTextureIntensity: (val: number) => void;
  onDownload: () => void;
}

export function ControlPanel({
  state,
  currentScheme,
  availableSchemes,
  availableBackgrounds,
  isGenerating,
  onSetRatio,
  onSetText,
  onSetTextStyle,
  onSetTheme,
  currentLayoutStyle,
  onSetLayoutStyle,
  onSetFrameEnabled,
  onSetDecorEnabled,
  onSetScheme,
  onSetPattern,
  onSetFontSize,
  onSetTextureIntensity,
  onDownload,
}: ControlPanelProps) {
  const line1 = getTextElement(state, 'line1');
  const line2 = getTextElement(state, 'line2');
  const line3 = getTextElement(state, 'line3');
  const selectedTheme = THEMES_WITH_FONTS.find((theme) => theme.id === state.themeId) || THEMES_WITH_FONTS[0];
  const styleOptions = [
    { key: 'withBorder' as const, label: '边框' },
    { key: 'withMarker' as const, label: 'Mark' },
    { key: 'withDepth' as const, label: '立体' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-[#0c1829] border border-[rgba(255,255,255,0.07)] rounded-xl p-6 relative overflow-hidden backdrop-blur-sm shadow-xl">
        <div
          className="absolute top-0 left-0 right-0 h-[1px] opacity-40"
          style={{ background: `linear-gradient(90deg, transparent, ${currentScheme.accent}, transparent)` }}
        />

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#00e5cc]" />
            <span className="font-mono text-[10px] tracking-[2px] text-[#00e5cc] uppercase">封面主题库</span>
            <div className="flex-1 h-[1px] bg-[rgba(255,255,255,0.07)]" />
          </div>
          <p className="text-[11px] text-[#5a7a9a] mb-3">选择主题会自动应用对应字体、字号、配色、纹理和排版，不会改你的文案。</p>
          <div className="space-y-3">
            <select
              value={state.themeId}
              onChange={(event) => onSetTheme(event.target.value)}
              className="w-full bg-[#060d1a] border border-[rgba(255,255,255,0.12)] rounded-lg px-3 py-2.5 text-sm text-[#d8e9fa] outline-none focus:border-[#00e5cc]"
            >
              {THEMES_WITH_FONTS.map((theme) => (
                <option key={theme.id} value={theme.id}>
                  {theme.name}
                </option>
              ))}
            </select>
            <div className="rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#060d1a] px-3 py-2">
              <div className="text-xs text-[#9cc3e8] font-semibold">{selectedTheme.name}</div>
              <div className="text-[10px] text-[#5a7a9a]">{selectedTheme.tagline}</div>
              <div className="text-[12px] mt-1 text-[#dcecff]" style={{ fontFamily: selectedTheme.fontFamily }}>
                Aa 字体预览 Typography Preview
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <LayoutTemplate className="w-4 h-4 text-[#00e5cc]" />
            <span className="font-mono text-[10px] tracking-[2px] text-[#00e5cc] uppercase">排版风格</span>
            <div className="flex-1 h-[1px] bg-[rgba(255,255,255,0.07)]" />
          </div>
          <div className="space-y-2">
            <select
              value={state.layoutStyleId}
              onChange={(event) => onSetLayoutStyle(event.target.value)}
              className="w-full bg-[#060d1a] border border-[rgba(255,255,255,0.12)] rounded-lg px-3 py-2.5 text-sm text-[#d8e9fa] outline-none focus:border-[#00e5cc]"
            >
              <option value="left-default">左侧默认</option>
              <option value="center-hero">居中聚焦</option>
              <option value="top-lead">顶部引导</option>
              <option value="bottom-impact">底部冲击</option>
              <option value="left-compact">左中紧凑</option>
            </select>
            <p className="text-[11px] text-[#5a7a9a]">{currentLayoutStyle.description}</p>
            <div className="flex items-center justify-between rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#060d1a] px-3 py-2">
              <span className="text-[11px] text-[#9cc3e8]">画面边框</span>
              <button
                onClick={() => onSetFrameEnabled(!state.frameEnabled)}
                className={`text-[10px] px-2 py-1 rounded border ${
                  state.frameEnabled
                    ? 'border-[rgba(0,229,204,0.5)] text-[#00e5cc] bg-[rgba(0,229,204,0.1)]'
                    : 'border-[rgba(255,255,255,0.12)] text-[#7f9ab6]'
                }`}
              >
                {state.frameEnabled ? '开启' : '关闭'}
              </button>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#060d1a] px-3 py-2">
              <span className="text-[11px] text-[#9cc3e8]">主题装饰</span>
              <button
                onClick={() => onSetDecorEnabled(!state.decorEnabled)}
                className={`text-[10px] px-2 py-1 rounded border ${
                  state.decorEnabled
                    ? 'border-[rgba(0,229,204,0.5)] text-[#00e5cc] bg-[rgba(0,229,204,0.1)]'
                    : 'border-[rgba(255,255,255,0.12)] text-[#7f9ab6]'
                }`}
              >
                {state.decorEnabled ? '开启' : '关闭'}
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <LayoutTemplate className="w-4 h-4 text-[#00e5cc]" />
            <span className="font-mono text-[10px] tracking-[2px] text-[#00e5cc] uppercase">封面比例</span>
            <div className="flex-1 h-[1px] bg-[rgba(255,255,255,0.07)]" />
          </div>
          <div className="flex gap-2">
            {(['4:3', '3:4'] as Ratio[]).map((ratio) => (
              <button
                key={ratio}
                onClick={() => onSetRatio(ratio)}
                className={`flex-1 py-3 px-4 rounded-lg border flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
                  state.ratio === ratio
                    ? 'bg-[rgba(0,229,204,0.08)] border-[rgba(0,229,204,0.5)] text-[#00e5cc]'
                    : 'bg-[#060d1a] border-[rgba(255,255,255,0.07)] text-[#5a7a9a] hover:border-[rgba(255,255,255,0.2)]'
                }`}
              >
                <div className={`border-2 rounded-[2px] border-current opacity-80 ${ratio === '4:3' ? 'w-7 h-5' : 'w-5 h-7'}`} />
                <span className="font-mono text-xs">{ratio === '4:3' ? '横屏 Landscape' : '竖屏 Portrait'}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Type className="w-4 h-4 text-[#00e5cc]" />
            <span className="font-mono text-[10px] tracking-[2px] text-[#00e5cc] uppercase">内容输入</span>
            <div className="flex-1 h-[1px] bg-[rgba(255,255,255,0.07)]" />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs text-[#5a7a9a] mb-1.5">第一行 (彩色小字)</label>
              <div className="grid grid-cols-[1fr_auto] gap-2">
                <input
                  type="text"
                  value={line1.content}
                  onChange={(event) => onSetText('line1', event.target.value)}
                  className="w-full bg-[#060d1a] border border-[rgba(255,255,255,0.07)] rounded-lg px-3 py-2.5 text-sm focus:border-[#00e5cc] focus:ring-1 focus:ring-[#00e5cc] outline-none transition-all placeholder-[#5a7a9a]/50"
                  placeholder="话题标签"
                />
                <div className="flex items-center gap-1">
                  {styleOptions.map((option) => (
                    <button
                      key={option.key}
                      onClick={() => onSetTextStyle('line1', option.key, !line1[option.key])}
                      className={`text-[10px] px-2 py-1 rounded border ${
                        line1[option.key]
                          ? 'border-[rgba(0,229,204,0.5)] text-[#00e5cc] bg-[rgba(0,229,204,0.1)]'
                          : 'border-[rgba(255,255,255,0.12)] text-[#7f9ab6]'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs text-[#5a7a9a] mb-1.5">第二行 (核心大标题)</label>
              <div className="grid grid-cols-[1fr_auto] gap-2">
                <input
                  type="text"
                  value={line2.content}
                  onChange={(event) => onSetText('line2', event.target.value)}
                  className="w-full bg-[#060d1a] border border-[rgba(255,255,255,0.07)] rounded-lg px-3 py-2.5 text-sm focus:border-[#00e5cc] focus:ring-1 focus:ring-[#00e5cc] outline-none transition-all placeholder-[#5a7a9a]/50 font-bold"
                  placeholder="核心冲突"
                />
                <div className="flex items-center gap-1">
                  {styleOptions.map((option) => (
                    <button
                      key={option.key}
                      onClick={() => onSetTextStyle('line2', option.key, !line2[option.key])}
                      className={`text-[10px] px-2 py-1 rounded border ${
                        line2[option.key]
                          ? 'border-[rgba(0,229,204,0.5)] text-[#00e5cc] bg-[rgba(0,229,204,0.1)]'
                          : 'border-[rgba(255,255,255,0.12)] text-[#7f9ab6]'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs text-[#5a7a9a] mb-1.5">第三行 (补充说明)</label>
              <div className="grid grid-cols-[1fr_auto] gap-2">
                <input
                  type="text"
                  value={line3.content}
                  onChange={(event) => onSetText('line3', event.target.value)}
                  className="w-full bg-[#060d1a] border border-[rgba(255,255,255,0.07)] rounded-lg px-3 py-2.5 text-sm focus:border-[#00e5cc] focus:ring-1 focus:ring-[#00e5cc] outline-none transition-all placeholder-[#5a7a9a]/50"
                  placeholder="补充信息"
                />
                <div className="flex items-center gap-1">
                  {styleOptions.map((option) => (
                    <button
                      key={option.key}
                      onClick={() => onSetTextStyle('line3', option.key, !line3[option.key])}
                      className={`text-[10px] px-2 py-1 rounded border ${
                        line3[option.key]
                          ? 'border-[rgba(0,229,204,0.5)] text-[#00e5cc] bg-[rgba(0,229,204,0.1)]'
                          : 'border-[rgba(255,255,255,0.12)] text-[#7f9ab6]'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="w-4 h-4 text-[#00e5cc]" />
            <span className="font-mono text-[10px] tracking-[2px] text-[#00e5cc] uppercase">风格配色</span>
            <div className="flex-1 h-[1px] bg-[rgba(255,255,255,0.07)]" />
          </div>
          <div className="grid grid-cols-6 gap-2">
            {availableSchemes.map((scheme) => (
              <button
                key={scheme.id}
                onClick={() => onSetScheme(scheme.id)}
                className={`aspect-square rounded-lg transition-transform duration-200 hover:scale-110 ${state.schemeId === scheme.id ? 'ring-2 ring-white scale-110' : ''}`}
                style={{ background: scheme.gradient }}
                title={scheme.name}
              />
            ))}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Grid className="w-4 h-4 text-[#00e5cc]" />
            <span className="font-mono text-[10px] tracking-[2px] text-[#00e5cc] uppercase">背景纹理</span>
            <div className="flex-1 h-[1px] bg-[rgba(255,255,255,0.07)]" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {availableBackgrounds.map((background) => (
              <button
                key={background.id}
                onClick={() => onSetPattern(background.id)}
                className={`h-10 rounded-lg border flex items-center justify-center relative overflow-hidden transition-all duration-200 ${
                  state.bgPatternId === background.id
                    ? 'border-[#00e5cc] bg-[rgba(0,229,204,0.1)]'
                    : 'border-[rgba(255,255,255,0.1)] bg-[#0f172a] hover:border-[rgba(255,255,255,0.2)]'
                }`}
                title={background.name}
              >
                <div
                  className="absolute inset-0 opacity-50"
                  style={{
                    backgroundImage: background.css,
                    backgroundSize: background.size === 'auto' ? 'cover' : background.size,
                  }}
                />
                <span className={`relative z-10 text-[10px] font-mono ${state.bgPatternId === background.id ? 'text-[#00e5cc]' : 'text-[#5a7a9a]'}`}>
                  {background.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {(state.themeId === 'anthropic' || state.themeId === 'mac-classic') && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Grid className="w-4 h-4 text-[#c4ad97]" />
              <span className="font-mono text-[10px] tracking-[2px] text-[#c4ad97] uppercase">纹理强度</span>
              <div className="flex-1 h-[1px] bg-[rgba(255,255,255,0.07)]" />
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={20}
                max={180}
                value={Math.round(state.textureIntensity * 100)}
                onChange={(event) => onSetTextureIntensity(parseInt(event.target.value, 10) / 100)}
                className="flex-1 h-1 bg-[#2f2923] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#d0a889]"
              />
              <span className="text-[10px] font-mono w-8 text-right text-[#b79a83]">{Math.round(state.textureIntensity * 100)}%</span>
            </div>
          </div>
        )}

        <button
          onClick={onDownload}
          disabled={isGenerating}
          className="w-full py-3.5 rounded-lg font-bold text-[#060d1a] text-sm tracking-wide flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: currentScheme.gradient }}
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              生成中...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              下载封面图片
            </>
          )}
        </button>
      </div>

      <div className="bg-[#0c1829] border border-[rgba(255,255,255,0.07)] rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Type className="w-3 h-3 text-[#5a7a9a]" />
          <span className="font-mono text-[10px] text-[#5a7a9a] uppercase">字号微调</span>
        </div>
        <div className="space-y-4">
          {[
            { label: '第一行', key: 'line1' as const, min: 12, max: 60 },
            { label: '第二行', key: 'line2' as const, min: 20, max: 140 },
            { label: '第三行', key: 'line3' as const, min: 12, max: 50 },
          ].map((slider) => (
            <div key={slider.key} className="flex items-center gap-3">
              <span className="text-[10px] text-[#5a7a9a] font-mono w-10">{slider.label}</span>
              <input
                type="range"
                min={slider.min}
                max={slider.max}
                value={getTextElement(state, slider.key).fontSize}
                onChange={(event) => onSetFontSize(slider.key, parseInt(event.target.value, 10))}
                className="flex-1 h-1 bg-[#1f2f45] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
              />
              <span className="text-[10px] font-mono w-8 text-right" style={{ color: currentScheme.accent }}>
                {getTextElement(state, slider.key).fontSize}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
