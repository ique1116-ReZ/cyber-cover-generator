import React from 'react';
import { SCHEME_TONES } from '../constants';
import { BackgroundPattern, ColorScheme, CoverState, CoverThemePreset, LayoutStylePreset } from '../types';
import { getTextElement } from '../utils/elements';

interface PreviewCanvasProps {
  state: CoverState;
  currentScheme: ColorScheme;
  currentPattern: BackgroundPattern;
  currentTheme: CoverThemePreset;
  currentLayoutStyle: LayoutStylePreset;
  frameEnabled: boolean;
  decorEnabled: boolean;
  previewRef: React.RefObject<HTMLDivElement | null>;
}

export function PreviewCanvas({ state, currentScheme, currentPattern, currentTheme, currentLayoutStyle, frameEnabled, decorEnabled, previewRef }: PreviewCanvasProps) {
  const line1 = getTextElement(state, 'line1');
  const line2 = getTextElement(state, 'line2');
  const line3 = getTextElement(state, 'line3');
  const isAnthropic = currentTheme.id === 'anthropic';
  const isRetro = currentTheme.id === 'retro-future';
  const isMacClassic = currentTheme.id === 'mac-classic';
  const isCyber = currentTheme.id === 'cyber';
  const isLight = isAnthropic || isRetro || isMacClassic;
  const tone = SCHEME_TONES[currentScheme.id];
  const primaryText = tone?.primaryText || currentTheme.primaryTextColor;
  const secondaryText = tone?.secondaryText || currentTheme.secondaryTextColor;
  const subtitleBg = tone?.subtitleBg || currentTheme.subtitleBg;
  const subtitleBorder = tone?.subtitleBorder || currentTheme.subtitleBorder;
  const markerColor = tone?.marker || `${currentScheme.accent}66`;
  const mainTitle = currentTheme.titleCase === 'uppercase' ? line2.content.toUpperCase() : line2.content;

  const withEffectStyle = (
    text: { withBorder: boolean; withMarker: boolean; withDepth: boolean },
    color: string,
    borderColor: string
  ) => ({
    textShadow: text.withDepth ? `0 2px 0 rgba(0,0,0,0.35), 0 6px 18px rgba(0,0,0,0.25)` : undefined,
    backgroundImage: text.withMarker ? `linear-gradient(transparent 58%, ${markerColor} 58%, ${markerColor} 92%, transparent 92%)` : undefined,
    color,
    display: 'inline-block',
    padding: text.withBorder ? '0.14em 0.42em' : text.withMarker ? '0 0.2em' : undefined,
    borderRadius: text.withBorder ? '0.42em' : text.withMarker ? '2px' : undefined,
    border: text.withBorder ? `1.5px solid ${isLight ? subtitleBorder : borderColor}` : undefined,
    backgroundColor: text.withBorder ? (isLight ? subtitleBg : 'rgba(255,255,255,0.06)') : undefined,
    boxShadow: text.withBorder && text.withDepth ? '0 4px 14px rgba(0,0,0,0.22)' : undefined,
  });

  const lineGap = isMacClassic
    ? currentLayoutStyle.lineGapEm + 0.12
    : isAnthropic
    ? currentLayoutStyle.lineGapEm + 0.08
    : isRetro
    ? currentLayoutStyle.lineGapEm + 0.04
    : currentLayoutStyle.lineGapEm;

  return (
    <div className="bg-[#0c1829] border border-[rgba(255,255,255,0.07)] rounded-xl p-6 md:p-10 flex flex-col items-center justify-center min-h-[500px] relative">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent" />
      <div className="flex items-center gap-2 mb-4 absolute top-4 left-6">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00e5cc] animate-pulse" />
        <span className="font-mono text-[10px] tracking-[2px] text-[#00e5cc] uppercase">实时预览</span>
      </div>

      <div
        className={`relative overflow-hidden transition-all duration-500 shadow-2xl ${
          state.ratio === '4:3' ? 'w-full aspect-[4/3] max-w-[500px]' : 'h-[500px] aspect-[3/4]'
        }`}
        ref={previewRef}
        style={{ backgroundColor: currentScheme.bg }}
      >
        {/* Background texture */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            backgroundImage: currentPattern.css,
            backgroundSize: currentPattern.size,
            opacity: Math.max(0.08, Math.min(0.9, currentTheme.patternOpacity * state.textureIntensity)),
            mixBlendMode: isLight ? 'multiply' : 'normal',
          }}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: currentTheme.overlayGradient }} />

        {/* Glow blob */}
        <div
          className="absolute z-0 pointer-events-none rounded-full blur-[80px]"
          style={{
            width: state.ratio === '3:4' ? '120%' : '70%',
            height: state.ratio === '3:4' ? '50%' : '70%',
            bottom: '-15%',
            left: '-15%',
            background: currentScheme.glow,
            backgroundBlendMode: 'screen',
          }}
        />

        {/* Frame border */}
        {frameEnabled && currentTheme.frameStyle !== 'none' && (
          <div
            className="absolute inset-[3.5%] z-20 pointer-events-none"
            style={{
              border:
                currentTheme.frameStyle === 'border'
                  ? isRetro
                    ? `2px dashed ${subtitleBorder}`
                    : `2px solid ${isAnthropic ? subtitleBorder : 'rgba(255,255,255,0.28)'}`
                  : `1px solid ${currentScheme.accent}`,
              boxShadow: currentTheme.frameStyle === 'neon'
                ? `0 0 0 1px rgba(255,255,255,0.07), 0 0 22px ${currentScheme.glow}`
                : 'none',
            }}
          />
        )}

        {/* ── Theme-specific SVG decorative elements ── */}
        {decorEnabled && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 17 }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* ── CYBER GRID: HUD corner brackets + radar + binary ── */}
            {isCyber && (
              <>
                {/* Corner HUD brackets */}
                <path d="M5,14 L5,5 L14,5" fill="none" stroke={currentScheme.accent} strokeWidth="0.45" opacity="0.55"/>
                <path d="M86,5 L95,5 L95,14" fill="none" stroke={currentScheme.accent} strokeWidth="0.45" opacity="0.55"/>
                <path d="M5,86 L5,95 L14,95" fill="none" stroke={currentScheme.accent} strokeWidth="0.45" opacity="0.55"/>
                <path d="M86,95 L95,95 L95,86" fill="none" stroke={currentScheme.accent} strokeWidth="0.45" opacity="0.55"/>
                {/* Bright corner anchor dots */}
                <rect x="4.2" y="4.2" width="1.6" height="1.6" fill={currentScheme.accent} opacity="0.65"/>
                <rect x="94.2" y="4.2" width="1.6" height="1.6" fill={currentScheme.accent} opacity="0.65"/>
                <rect x="4.2" y="94.2" width="1.6" height="1.6" fill={currentScheme.accent} opacity="0.65"/>
                <rect x="94.2" y="94.2" width="1.6" height="1.6" fill={currentScheme.accent} opacity="0.65"/>
                {/* Radar rings — bottom right corner */}
                <ellipse cx="85" cy="86" rx="9.5" ry="8" fill="none" stroke={currentScheme.accent} strokeWidth="0.38" opacity="0.22"/>
                <ellipse cx="85" cy="86" rx="5.5" ry="4.7" fill="none" stroke={currentScheme.accent} strokeWidth="0.38" opacity="0.2"/>
                <ellipse cx="85" cy="86" rx="2" ry="1.7" fill="none" stroke={currentScheme.accent} strokeWidth="0.5" opacity="0.35"/>
                <line x1="85" y1="86" x2="94.5" y2="80" stroke={currentScheme.accent} strokeWidth="0.38" opacity="0.4"/>
                <circle cx="90" cy="83" r="0.7" fill={currentScheme.accent} opacity="0.75"/>
                {/* Binary data strip at bottom */}
                <text x="5" y="97.8" fontFamily="Space Mono, monospace" fontSize="1.9" fill={currentScheme.accent} opacity="0.18" letterSpacing="1.5">
                  {'01001100 01001111 01000001 01000100 01001001 01001110 01000111'}
                </text>
              </>
            )}

            {/* ── ANTHROPIC EDITORIAL: Large quote + ornamental rules ── */}
            {isAnthropic && (
              <>
                {/* Giant opening quotation mark */}
                <text x="3.5" y="46" fontFamily="Noto Serif SC, Georgia, serif" fontSize="40" fill={primaryText} opacity="0.06" fontWeight="700">
                  {'“'}
                </text>
                {/* Top editorial rule with diamond ornament */}
                <line x1="8" y1="7" x2="44" y2="7" stroke={primaryText} strokeWidth="0.35" opacity="0.18"/>
                <polygon points="50,4.2 52.8,7 50,9.8 47.2,7" fill={primaryText} opacity="0.22"/>
                <line x1="56" y1="7" x2="92" y2="7" stroke={primaryText} strokeWidth="0.35" opacity="0.18"/>
                {/* Bottom rule */}
                <line x1="8" y1="93" x2="92" y2="93" stroke={primaryText} strokeWidth="0.25" opacity="0.13"/>
                {/* Page / volume info */}
                <text x="92" y="97.8" fontFamily="Noto Serif SC, serif" fontSize="2.8" fill={primaryText} opacity="0.28" textAnchor="end" letterSpacing="1.5">
                  {'· IV ·'}
                </text>
                <text x="8" y="97.8" fontFamily="Space Mono, monospace" fontSize="2" fill={primaryText} opacity="0.2" letterSpacing="1">
                  {'VOL. I  NO. 4'}
                </text>
              </>
            )}

            {/* ── RETRO TERMINAL: Double ASCII corners + prompt + status bar ── */}
            {isRetro && (
              <>
                {/* Outer corner frames */}
                <path d="M5,17 L5,5 L17,5" fill="none" stroke={subtitleBorder} strokeWidth="0.52" opacity="0.55"/>
                <path d="M83,5 L95,5 L95,17" fill="none" stroke={subtitleBorder} strokeWidth="0.52" opacity="0.55"/>
                <path d="M5,83 L5,95 L17,95" fill="none" stroke={subtitleBorder} strokeWidth="0.52" opacity="0.55"/>
                <path d="M83,95 L95,95 L95,83" fill="none" stroke={subtitleBorder} strokeWidth="0.52" opacity="0.55"/>
                {/* Inner corner frames */}
                <path d="M8,14 L8,8 L14,8" fill="none" stroke={subtitleBorder} strokeWidth="0.32" opacity="0.35"/>
                <path d="M86,8 L92,8 L92,14" fill="none" stroke={subtitleBorder} strokeWidth="0.32" opacity="0.35"/>
                <path d="M8,86 L8,92 L14,92" fill="none" stroke={subtitleBorder} strokeWidth="0.32" opacity="0.35"/>
                <path d="M86,92 L92,92 L92,86" fill="none" stroke={subtitleBorder} strokeWidth="0.32" opacity="0.35"/>
                {/* >_ command prompt */}
                <text x="9.5" y="24" fontFamily="Space Mono, monospace" fontSize="4.5" fill={primaryText} opacity="0.42">
                  {'>'}
                </text>
                <rect x="14" y="20.5" width="2.8" height="4" fill={primaryText} opacity="0.35"/>
                {/* Bottom status bar */}
                <rect x="5" y="88.5" width="90" height="6.5" fill={primaryText} opacity="0.04"/>
                <line x1="5" y1="88.5" x2="95" y2="88.5" stroke={subtitleBorder} strokeWidth="0.3" opacity="0.3"/>
                <text x="8" y="93" fontFamily="Space Mono, monospace" fontSize="2.2" fill={primaryText} opacity="0.42" letterSpacing="0.4">
                  {'STATUS: OK  |  MEM: 512K FREE  |  DSK: 5.25"'}
                </text>
                <text x="92" y="93" fontFamily="Space Mono, monospace" fontSize="2.2" fill={primaryText} opacity="0.32" textAnchor="end">
                  {'v1.0'}
                </text>
              </>
            )}

            {/* ── MAC CLASSIC: System 6 title bar + mini Mac + spec text ── */}
            {isMacClassic && (
              <>
                {/* Window title bar rectangle */}
                <rect x="5" y="4.5" width="90" height="8" rx="0.5" fill="none" stroke={subtitleBorder} strokeWidth="0.45" opacity="0.42"/>
                {/* Close box (left) */}
                <rect x="6.8" y="5.8" width="5" height="5" fill="none" stroke={subtitleBorder} strokeWidth="0.38" opacity="0.48"/>
                {/* Zoom box (right) */}
                <rect x="88.2" y="5.8" width="5" height="5" fill="none" stroke={subtitleBorder} strokeWidth="0.38" opacity="0.48"/>
                {/* Horizontal stripe pattern left of title */}
                <line x1="15" y1="7" x2="36" y2="7" stroke={subtitleBorder} strokeWidth="0.28" opacity="0.32"/>
                <line x1="15" y1="8.8" x2="36" y2="8.8" stroke={subtitleBorder} strokeWidth="0.28" opacity="0.32"/>
                <line x1="15" y1="10.5" x2="36" y2="10.5" stroke={subtitleBorder} strokeWidth="0.28" opacity="0.32"/>
                {/* Horizontal stripe pattern right of title */}
                <line x1="64" y1="7" x2="85" y2="7" stroke={subtitleBorder} strokeWidth="0.28" opacity="0.32"/>
                <line x1="64" y1="8.8" x2="85" y2="8.8" stroke={subtitleBorder} strokeWidth="0.28" opacity="0.32"/>
                <line x1="64" y1="10.5" x2="85" y2="10.5" stroke={subtitleBorder} strokeWidth="0.28" opacity="0.32"/>
                {/* Title text */}
                <text x="50" y="9.8" fontFamily="Space Mono, monospace" fontSize="2.6" fill={primaryText} opacity="0.35" textAnchor="middle">
                  Untitled
                </text>
                {/* Mini Mac 128K outline — bottom right */}
                <rect x="78" y="79" width="17" height="14" rx="2" fill="none" stroke={primaryText} strokeWidth="0.45" opacity="0.2"/>
                <rect x="80" y="81" width="13" height="9" rx="0.5" fill={primaryText} opacity="0.04"/>
                {/* Scanlines on mini screen */}
                <line x1="80.5" y1="83" x2="92.5" y2="83" stroke={primaryText} strokeWidth="0.25" opacity="0.1"/>
                <line x1="80.5" y1="85.5" x2="92.5" y2="85.5" stroke={primaryText} strokeWidth="0.25" opacity="0.1"/>
                <line x1="80.5" y1="88" x2="92.5" y2="88" stroke={primaryText} strokeWidth="0.25" opacity="0.1"/>
                {/* Disk slot */}
                <rect x="84.5" y="90.8" width="5.5" height="0.8" rx="0.4" fill={primaryText} opacity="0.18"/>
                {/* Base stand */}
                <rect x="81" y="93" width="11" height="0.8" rx="0.4" fill={primaryText} opacity="0.15"/>
                <rect x="84" y="93.8" width="5" height="1.5" rx="0.4" fill={primaryText} opacity="0.12"/>
                {/* Spec text at bottom */}
                <text x="5" y="97.8" fontFamily="Space Mono, monospace" fontSize="2.1" fill={primaryText} opacity="0.26" letterSpacing="0.3">
                  {'PROC: Neural  ·  MEM: 512K  ·  5.25" FDD'}
                </text>
              </>
            )}
          </svg>
        )}

        {/* Text content */}
        <div
          className="absolute inset-0 z-20 flex flex-col px-[8%]"
          style={{ justifyContent: currentLayoutStyle.justifyContent, alignItems: currentLayoutStyle.alignItems }}
        >
          <div
            className="flex flex-col"
            style={{
              width: currentLayoutStyle.contentWidth,
              transform: `translateY(${currentLayoutStyle.contentOffsetY}%)`,
              fontFamily: currentTheme.fontFamily,
              gap: `${lineGap}em`,
              textAlign: currentLayoutStyle.textAlign,
              alignItems: currentLayoutStyle.alignItems,
            }}
          >

            {/* ────── LINE 1 ────── */}
            {isMacClassic ? (
              // Mac Classic: monospace small-caps category label (like "PROCESSOR")
              <div
                style={{
                  fontFamily: "'Space Mono', 'IBM Plex Mono', monospace",
                  fontSize: `${line1.fontSize - 4}px`,
                  fontWeight: 400,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: secondaryText,
                  display: 'inline-block',
                  paddingBottom: line1.withMarker ? undefined : '0.28em',
                  borderBottom: line1.withBorder || line1.withMarker ? 'none' : `1px solid ${subtitleBorder}`,
                  ...(line1.withBorder ? {
                    border: `1px solid ${subtitleBorder}`,
                    borderRadius: '2px',
                    padding: '0.22em 0.65em',
                    backgroundColor: subtitleBg,
                    color: primaryText,
                  } : {}),
                  ...(line1.withMarker ? {
                    backgroundImage: `linear-gradient(transparent 58%, ${markerColor} 58%, ${markerColor} 92%, transparent 92%)`,
                    padding: '0 0.2em',
                  } : {}),
                  textShadow: line1.withDepth ? `0 1px 0 rgba(255,255,255,0.85)` : undefined,
                }}
              >
                {line1.content || '第一行文本'}
              </div>
            ) : isRetro ? (
              <div
                className="font-bold leading-tight mb-2 break-words"
                style={{
                  ...withEffectStyle(line1, currentScheme.bg, 'rgba(0,0,0,0.5)'),
                  fontSize: `${line1.fontSize - 1}px`,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  backgroundImage: line1.withMarker
                    ? withEffectStyle(line1, currentScheme.bg, 'rgba(0,0,0,0.5)').backgroundImage
                    : undefined,
                  backgroundColor: '#232323',
                  border: line1.withBorder ? `1.5px dashed ${subtitleBorder}` : '1px solid #232323',
                  borderRadius: '999px',
                  padding: '0.18em 0.72em',
                }}
              >
                {line1.content || '第一行文本'}
              </div>
            ) : (
              <div
                className="font-bold leading-tight mb-2 break-words"
                style={{ ...withEffectStyle(line1, currentScheme.accent, 'rgba(0,0,0,0.5)'), fontSize: `${line1.fontSize}px` }}
              >
                {line1.content || '第一行文本'}
              </div>
            )}

            {/* ────── LINE 2 ────── */}
            {isMacClassic ? (
              // Mac Classic: large italic Playfair Display serif headline
              <div
                style={{
                  fontFamily: "'Playfair Display', 'Noto Serif SC', serif",
                  fontSize: `${line2.fontSize}px`,
                  fontWeight: 700,
                  fontStyle: 'italic',
                  letterSpacing: '-0.025em',
                  lineHeight: 1.05,
                  color: primaryText,
                  display: 'inline-block',
                  ...(line2.withBorder ? {
                    border: `1.5px solid ${subtitleBorder}`,
                    borderRadius: '5px',
                    padding: '0.12em 0.42em',
                    backgroundColor: subtitleBg,
                  } : {}),
                  backgroundImage: line2.withMarker
                    ? `linear-gradient(transparent 62%, ${markerColor} 62%, ${markerColor} 93%, transparent 93%)`
                    : undefined,
                  padding: line2.withMarker && !line2.withBorder
                    ? '0 0.2em'
                    : line2.withBorder ? '0.12em 0.42em' : undefined,
                  textShadow: line2.withDepth
                    ? `0 2px 0 rgba(255,255,255,0.75), 0 -1px 0 rgba(0,0,0,0.10)`
                    : undefined,
                  boxShadow: line2.withBorder && line2.withDepth ? '0 4px 14px rgba(0,0,0,0.08)' : undefined,
                }}
              >
                {mainTitle || '第二行文本'}
              </div>
            ) : (
              <div
                className="leading-[1.08] mb-3 break-words"
                style={{
                  fontSize: `${line2.fontSize}px`,
                  letterSpacing: `${currentTheme.titleLetterSpacing}em`,
                  textShadow: line2.withDepth
                    ? `${currentTheme.titleShadow === 'none' ? '' : `${currentTheme.titleShadow}, `}0 3px 0 rgba(0,0,0,0.3), 0 10px 24px rgba(0,0,0,0.35)`
                    : currentTheme.titleShadow,
                  color: primaryText,
                  fontWeight: currentTheme.titleFontWeight,
                  backgroundImage: line2.withMarker
                    ? `linear-gradient(transparent 62%, ${markerColor} 62%, ${markerColor} 92%, transparent 92%)`
                    : undefined,
                  display: 'inline-block',
                  padding: line2.withBorder ? '0.16em 0.44em' : line2.withMarker ? '0 0.2em' : undefined,
                  borderRadius: line2.withBorder ? '0.46em' : line2.withMarker ? '3px' : undefined,
                  border: line2.withBorder
                    ? `1.5px solid ${isAnthropic || isRetro ? subtitleBorder : `${currentScheme.accent}99`}`
                    : undefined,
                  backgroundColor: line2.withBorder
                    ? (isAnthropic || isRetro ? subtitleBg : 'rgba(255,255,255,0.05)')
                    : undefined,
                  boxShadow: line2.withBorder && line2.withDepth ? '0 6px 16px rgba(0,0,0,0.24)' : undefined,
                }}
              >
                {mainTitle || '第二行文本'}
              </div>
            )}

            {/* Retro divider */}
            {isRetro && (
              <div
                className="h-[1px] w-full max-w-[520px] border-t border-dashed mb-1"
                style={{ borderColor: subtitleBorder }}
              />
            )}

            {/* ────── LINE 3 ────── */}
            {isMacClassic ? (
              // Mac Classic: monospace spec / body description text
              <div
                style={{
                  fontFamily: "'Space Mono', 'IBM Plex Mono', monospace",
                  fontSize: `${line3.fontSize - 2}px`,
                  fontWeight: 400,
                  color: secondaryText,
                  lineHeight: 1.7,
                  letterSpacing: '0.01em',
                  display: 'inline-block',
                  ...(line3.withBorder ? {
                    border: `1px solid ${subtitleBorder}`,
                    borderRadius: '3px',
                    padding: '0.2em 0.6em',
                    backgroundColor: subtitleBg,
                  } : {}),
                  backgroundImage: line3.withMarker
                    ? `linear-gradient(transparent 60%, ${markerColor} 60%, ${markerColor} 90%, transparent 90%)`
                    : undefined,
                  padding: line3.withMarker && !line3.withBorder
                    ? '0 0.2em'
                    : line3.withBorder ? '0.2em 0.6em' : undefined,
                  textShadow: line3.withDepth ? `0 1px 0 rgba(255,255,255,0.85)` : undefined,
                }}
              >
                {line3.content || '第三行文本'}
              </div>
            ) : (
              <>
                {currentTheme.subtitleStyle === 'pill' && (
                  <div
                    className="inline-flex px-3 py-1.5 rounded-full break-words"
                    style={{
                      ...withEffectStyle(line3, secondaryText, currentScheme.accent),
                      fontSize: `${line3.fontSize}px`,
                      backgroundColor: line3.withMarker ? undefined : subtitleBg,
                    }}
                  >
                    {line3.content || '第三行文本'}
                  </div>
                )}

                {currentTheme.subtitleStyle === 'outline' && (
                  <div
                    className="inline-flex px-3 py-1.5 rounded-md break-words border"
                    style={{
                      ...withEffectStyle(line3, secondaryText, currentScheme.accent),
                      fontSize: `${line3.fontSize}px`,
                      borderColor: subtitleBorder,
                    }}
                  >
                    {line3.content || '第三行文本'}
                  </div>
                )}

                {currentTheme.subtitleStyle === 'plain' && (
                  <div
                    className="font-normal break-words"
                    style={{ ...withEffectStyle(line3, secondaryText, currentScheme.accent), fontSize: `${line3.fontSize}px` }}
                  >
                    {line3.content || '第三行文本'}
                  </div>
                )}
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
