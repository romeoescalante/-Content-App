import React, { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface PromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  title: string;
}

export const PromptModal: React.FC<PromptModalProps> = ({ isOpen, onClose, content, title }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-slate-900 w-full max-w-2xl max-h-[85vh] rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-slate-800 flex flex-col animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div>
             <h2 className="text-xl font-bold text-white">{title}</h2>
             <p className="text-sm text-slate-500">2026 AI Campaign Strategy</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-950/50">
            <div className="prose prose-sm sm:prose-base max-w-none prose-invert text-slate-300 prose-headings:text-white prose-strong:text-yellow-400">
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-800 flex justify-end bg-slate-900 rounded-b-2xl">
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold transition-all ${
              copied 
                ? 'bg-green-600 text-white' 
                : 'bg-white text-slate-950 hover:bg-slate-200 shadow-xl'
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Campaign Copied' : 'Copy All Assets'}
          </button>
        </div>
      </div>
    </div>
  );
};