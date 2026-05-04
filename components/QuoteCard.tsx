import React, { useState } from 'react';
import { QuoteItem, AccountType } from '../types';
import { Loader2, Palette, Quote, Shield, DollarSign, Heart, Car, Coffee, CheckCircle, RotateCcw } from 'lucide-react';
import { generateQuoteArtPrompt } from '../services/geminiService';

interface QuoteCardProps {
  quote: QuoteItem;
  onViewPrompt: (prompt: string, title: string) => void;
  onToggleComplete: () => void;
  isCompleted?: boolean;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({ quote, onViewPrompt, onToggleComplete, isCompleted = false }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateArt = async () => {
    setIsLoading(true);
    const prompt = await generateQuoteArtPrompt(quote);
    setIsLoading(false);
    onViewPrompt(prompt, `Art Direction: "${quote.text.substring(0, 30)}..."`);
  };

  const getStyle = () => {
      if (isCompleted) {
         return {
            wrapper: "border-slate-800 bg-black text-slate-400 shadow-none",
            badge: "bg-slate-900 text-slate-500 border border-slate-800",
            icon: <Quote className="w-5 h-5 opacity-20 text-slate-600" />,
            button: "bg-slate-900 text-slate-500 cursor-not-allowed border border-slate-800"
         };
      }
      switch (quote.account) {
        case AccountType.IB:
            return {
                wrapper: "border-yellow-400 bg-slate-900 text-slate-100 shadow-[0_0_20px_rgba(250,204,21,0.05)]",
                badge: "bg-yellow-400 text-black",
                icon: <Shield className="w-5 h-5 opacity-40 text-yellow-400" />,
                button: "bg-yellow-400 text-black hover:bg-yellow-300"
            };
        case AccountType.QC:
            return {
                wrapper: "border-teal-500 bg-slate-900 text-slate-100 shadow-[0_0_20px_rgba(20,184,166,0.05)]",
                badge: "bg-teal-500 text-white",
                icon: <DollarSign className="w-5 h-5 opacity-40 text-teal-500" />,
                button: "bg-teal-500 text-white hover:bg-teal-400"
            };
        case AccountType.LIB:
            return {
                wrapper: "border-slate-500 bg-slate-900 text-slate-100 shadow-[0_0_20px_rgba(100,116,139,0.05)]",
                badge: "bg-slate-700 text-white",
                icon: <Quote className="w-5 h-5 opacity-40 text-slate-400" />,
                button: "bg-slate-700 text-white hover:bg-slate-600"
            };
        default:
             return {
                wrapper: "border-slate-700 bg-slate-900 text-slate-100",
                badge: "bg-slate-700 text-white",
                icon: <Quote className="w-5 h-5 opacity-40 text-slate-500" />,
                button: "bg-white text-slate-950 hover:bg-slate-200"
            };
      }
  }

  const style = getStyle();

  return (
    <div className={`flex flex-col p-6 rounded-xl border transition-all hover:scale-[1.02] shadow-2xl ${style.wrapper}`}>
      <div className="flex justify-between items-start mb-4">
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${style.badge}`}>
          {quote.category}
        </span>
        {style.icon}
      </div>
      
      <p className={`text-xl font-serif italic leading-relaxed mb-6 flex-grow ${isCompleted ? 'text-slate-300' : 'text-white'}`}>
        "{quote.text}"
      </p>

      <div className="mt-auto space-y-2">
        <button
          onClick={handleGenerateArt}
          disabled={isLoading || isCompleted}
          className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-bold transition-all active:scale-95 disabled:opacity-50 ${style.button}`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Visualizing...
            </>
          ) : (
            <>
              <Palette className="w-4 h-4" />
              Generate Art Direction
            </>
          )}
        </button>
        
        <button
          onClick={onToggleComplete}
          className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-semibold transition-all active:scale-95 ${
            isCompleted 
              ? 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800' 
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
          }`}
        >
          {isCompleted ? (
            <><RotateCcw className="w-4 h-4" /> Recover</>
          ) : (
            <><CheckCircle className="w-4 h-4" /> Complete</>
          )}
        </button>
      </div>
    </div>
  );
};