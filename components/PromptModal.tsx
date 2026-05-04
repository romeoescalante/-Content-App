import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Sparkles, Loader2, Image as ImageIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { generateImage } from '../services/geminiService';

interface PromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  title: string;
}

export const PromptModal: React.FC<PromptModalProps> = ({ isOpen, onClose, content, title }) => {
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [images, setImages] = useState<Record<number, string>>({});
  const [prompts, setPrompts] = useState<{ index: number; prompt: string; type: 'IMAGE' | 'VIDEO' }[]>([]);

  // Extract image and video prompts and clean the main content
  const { displayContent, extractedPrompts } = React.useMemo(() => {
    if (!isOpen) return { displayContent: content, extractedPrompts: [] };

    const regex = /\*\*(📸 IMAGE PROMPT|🎥 VIDEO PROMPT)\*\*:\s*\[?([^\]\n]+)\]?/g;
    const foundPrompts: { index: number; prompt: string; type: 'IMAGE' | 'VIDEO' }[] = [];
    let match;
    let index = 0;
    while ((match = regex.exec(content)) !== null) {
      foundPrompts.push({ 
        index: index++, 
        prompt: match[2].trim(), 
        type: match[1].includes('IMAGE') ? 'IMAGE' : 'VIDEO' 
      });
    }

    // Remove prompts from the display content to "separate" them
    const cleanedContent = content.replace(/\*\*(📸 IMAGE PROMPT|🎥 VIDEO PROMPT)\*\*:\s*\[?[^\]\n]+\]?/g, '').trim();

    return { displayContent: cleanedContent, extractedPrompts: foundPrompts };
  }, [isOpen, content]);

  useEffect(() => {
    if (isOpen) {
      setPrompts(extractedPrompts);
      setImages({}); // Reset images when content changes
    }
  }, [isOpen, extractedPrompts]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateVisuals = async () => {
    if (generating || prompts.length === 0) return;
    setGenerating(true);
    
    const newImages: Record<number, string> = { ...images };
    
    for (const item of prompts) {
      if (newImages[item.index]) continue; // Skip already generated
      try {
        const url = await generateImage(item.prompt);
        if (url) {
          newImages[item.index] = url;
          setImages({ ...newImages });
        }
      } catch (error) {
        console.error("Failed to generate image", error);
      }
    }
    
    setGenerating(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-slate-900 w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-slate-800 flex flex-col animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div>
             <h2 className="text-xl font-bold text-white">{title}</h2>
             <p className="text-sm text-slate-500">2026 AI Campaign Strategy & Visuals</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
            {/* Strategy Text */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-950/50 border-r border-slate-800">
                <div className="prose prose-sm sm:prose-base max-w-none prose-invert text-slate-300 prose-headings:text-white prose-strong:text-yellow-400">
                    <ReactMarkdown>{displayContent}</ReactMarkdown>
                </div>
            </div>

            {/* Visuals Sidebar */}
            <div className="w-full md:w-80 bg-slate-900 overflow-y-auto p-4 flex flex-col gap-4">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        <ImageIcon className="w-4 h-4" />
                        Campaign Visuals
                    </h3>
                    {prompts.length > 0 && (
                        <button
                            onClick={handleGenerateVisuals}
                            disabled={generating}
                            className={`p-1.5 rounded-md transition-all ${
                                generating 
                                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                                : 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 shadow-sm'
                            }`}
                            title="Generate all images"
                        >
                            {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                        </button>
                    )}
                </div>

                {prompts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <ImageIcon className="w-8 h-8 text-slate-700 mb-2" />
                        <p className="text-xs text-slate-600">No visual prompts detected in this strategy.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {prompts.map((item) => (
                            <div key={item.index} className={`group relative aspect-square rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shadow-inner ${item.type === 'VIDEO' ? 'ring-1 ring-blue-500/30' : ''}`}>
                                {images[item.index] ? (
                                    <img 
                                        src={images[item.index]} 
                                        alt={`Visual ${item.index + 1}`} 
                                        className="w-full h-full object-cover animate-in fade-in duration-500"
                                        referrerPolicy="no-referrer"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                                        <p className="text-[10px] text-slate-600 mb-2 line-clamp-3 italic">"{item.prompt}"</p>
                                        {item.type === 'IMAGE' ? (
                                            <button
                                                onClick={async () => {
                                                    const url = await generateImage(item.prompt);
                                                    if (url) setImages({ ...images, [item.index]: url });
                                                }}
                                                className="text-[10px] font-bold text-yellow-500/50 hover:text-yellow-500 transition-colors uppercase tracking-widest"
                                            >
                                                Generate Image {item.index + 1}
                                            </button>
                                        ) : (
                                            <div className="flex flex-col items-center gap-1">
                                                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Video Prompt</span>
                                                <p className="text-[9px] text-slate-500 leading-tight">Copy this prompt into a video generator (Sora, Kling, HeyGen).</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                                <div className={`absolute top-2 left-2 bg-black/60 backdrop-blur-md text-[10px] font-bold text-white px-2 py-0.5 rounded-full border border-white/10 flex items-center gap-1`}>
                                    {item.type === 'IMAGE' ? <ImageIcon className="w-3 h-3" /> : <Sparkles className="w-3 h-3 text-blue-400" />}
                                    {item.type === 'IMAGE' ? `Image ${item.index + 1}` : `Video Prompt`}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-800 flex justify-between items-center bg-slate-900 rounded-b-2xl">
          <div className="text-xs text-slate-500 italic max-w-md">
            * Visuals are AI-generated based on the strategic prompts.
          </div>
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
