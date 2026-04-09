import React from 'react';
import { Check, Copy } from 'lucide-react';

interface PromptHelperProps {
  copied: boolean;
  promptPreview: string;
  onCopyPrompt: () => void;
}

export function PromptHelper({ copied, promptPreview, onCopyPrompt }: PromptHelperProps) {
  return (
    <div className="bg-[#0c1829] border border-[rgba(255,255,255,0.07)] rounded-xl p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-[#5a7a9a] font-mono">AI PROMPT GENERATOR</span>
        <button
          onClick={onCopyPrompt}
          className={`text-[10px] px-2 py-1 rounded border transition-colors flex items-center gap-1 ${
            copied ? 'border-green-500 text-green-500' : 'border-[#1f2f45] text-[#5a7a9a] hover:bg-[#1f2f45]'
          }`}
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? '已复制' : '复制提示词'}
        </button>
      </div>
      <div className="bg-[#060d1a] p-3 rounded text-[10px] font-mono text-[#a8c8e8] leading-relaxed opacity-80 overflow-x-auto whitespace-pre-wrap">
        {promptPreview}
      </div>
    </div>
  );
}
