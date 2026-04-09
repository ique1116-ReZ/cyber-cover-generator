import React from 'react';

interface AppHeaderProps {
  accentColor: string;
}

export function AppHeader({ accentColor }: AppHeaderProps) {
  return (
    <header className="text-center mb-12">
      <div className="inline-block border border-[rgba(0,229,204,0.3)] px-3 py-1 rounded-[2px] mb-4">
        <span className="text-[10px] tracking-[3px] uppercase text-[#00e5cc]" style={{ fontFamily: "'Space Mono', monospace" }}>
          Cover Generator Pro
        </span>
      </div>
      <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-3">
        抖音封面<span style={{ color: accentColor }}>生成器</span>
      </h1>
      <p className="text-sm tracking-wide text-[#5a7a9a]">
        封面主题 · 实时预览 · 一键导出
      </p>
    </header>
  );
}
