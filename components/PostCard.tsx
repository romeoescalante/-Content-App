import React, { useState } from 'react';
import { PostTask, AccountType, SocialPlatform, ACCOUNT_PLATFORMS } from '../types';
import { Sparkles, Film, Image as ImageIcon, FileText, Video, Loader2, Facebook, Instagram, Linkedin, Twitter, Youtube, CalendarHeart, PlaySquare, PieChart, Layers, CheckCircle, RotateCcw } from 'lucide-react';
import { generatePostPrompt } from '../services/geminiService';

interface PostCardProps {
  task: PostTask;
  selectedPlatform: SocialPlatform;
  onViewPrompt: (prompt: string, title: string) => void;
  onToggleComplete: () => void;
  isCompleted?: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({ task, selectedPlatform, onViewPrompt, onToggleComplete, isCompleted = false }) => {
  const [isLoading, setIsLoading] = useState(false);

  const getIcon = () => {
    switch (task.category) {
      case 'Reel': return <Film className="w-4 h-4" />;
      case 'Meme': return <Sparkles className="w-4 h-4" />;
      case 'Slide': return <ImageIcon className="w-4 h-4" />;
      case 'Carousel': return <Layers className="w-4 h-4 text-blue-400" />;
      case 'Infographic': return <PieChart className="w-4 h-4" />;
      case 'Story': return <Video className="w-4 h-4" />;
      case 'Holiday': return <CalendarHeart className="w-4 h-4 text-red-400" />;
      case 'YouTube Shorts': return <PlaySquare className="w-4 h-4 text-red-500" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getPlatformIcon = (platform: SocialPlatform) => {
    switch (platform) {
        case 'Facebook': return <Facebook className="w-3 h-3" />;
        case 'Instagram': return <Instagram className="w-3 h-3" />;
        case 'LinkedIn': return <Linkedin className="w-3 h-3" />;
        case 'X': return <Twitter className="w-3 h-3" />;
        case 'YouTube': return <Youtube className="w-3 h-3" />;
        default: return null;
    }
  };

  const getAccountStyle = () => {
    if (isCompleted) {
      return "border-slate-800 bg-slate-950 text-slate-600 opacity-60 grayscale shadow-none";
    }
    switch (task.account) {
      case AccountType.IB: 
        return "border-yellow-400 bg-slate-900 text-slate-100 shadow-[0_4px_20px_rgba(250,204,21,0.1)]";
      case AccountType.QC: 
        return "border-teal-500 bg-slate-900 text-slate-100 shadow-[0_4px_20px_rgba(20,184,166,0.1)]";
      case AccountType.CB: 
        return "border-slate-500 bg-slate-900 text-slate-100 shadow-[0_4px_20px_rgba(100,116,139,0.1)]";
      case AccountType.PB: 
        return "border-red-600 bg-slate-900 text-slate-100 shadow-[0_4px_20px_rgba(220,38,38,0.1)]";
      case AccountType.GB: 
        return "border-green-600 bg-stone-900 text-stone-100 shadow-[0_4px_20px_rgba(22,163,74,0.1)]"; 
      default: 
        return "border-slate-800 bg-slate-900 text-slate-100";
    }
  };

  const getAccountBadge = () => {
    if (isCompleted) return "bg-slate-900 text-slate-600 border border-slate-800";
    switch (task.account) {
      case AccountType.IB: return "bg-yellow-400 text-black";
      case AccountType.QC: return "bg-teal-500 text-white";
      case AccountType.CB: return "bg-slate-700 text-white";
      case AccountType.PB: return "bg-red-600 text-white";
      case AccountType.GB: return "bg-green-700 text-white";
      default: return "bg-slate-700 text-white";
    }
  };

  const displayTitle = selectedPlatform === 'ALL' 
    ? `Post ${task.day}: ${task.title}` 
    : `${selectedPlatform} Post: ${task.title}`;

  const handleGenerate = async () => {
    setIsLoading(true);
    const prompt = await generatePostPrompt(task, selectedPlatform);
    setIsLoading(false);
    onViewPrompt(prompt, displayTitle);
  };

  const availablePlatforms = ACCOUNT_PLATFORMS[task.account] || [];
  
  return (
    <div className={`relative flex flex-col p-5 rounded-xl border-l-4 transition-all hover:scale-[1.02] ${getAccountStyle()}`}>
      <div className="flex justify-between items-start mb-3">
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${getAccountBadge()}`}>
          {task.account.length > 20 ? task.account.substring(0, 15) + '...' : task.account}
        </span>
        <div className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md bg-white/5 text-slate-400">
            {getIcon()}
            {task.category}
        </div>
      </div>
      
      <div className="mb-2">
         <h3 className={`text-lg font-bold leading-tight ${isCompleted ? 'text-slate-400' : 'text-white'}`}>{displayTitle}</h3>
         <span className="text-xs font-medium opacity-50 uppercase block mt-1">{task.date}</span>
      </div>
      
      <p className={`text-sm mb-4 flex-grow leading-relaxed ${isCompleted ? 'text-slate-500' : 'text-slate-400'}`}>{task.content}</p>

      <div className={`flex gap-2 mb-4 ${isCompleted ? 'opacity-20' : 'opacity-40'}`}>
        {availablePlatforms.map(p => (
            <span key={p} title={p} className={`${selectedPlatform === p ? 'text-white opacity-100 scale-125' : ''} transition-transform`}>
                {getPlatformIcon(p)}
            </span>
        ))}
      </div>

      <div className="mt-auto space-y-2">
        <button
          onClick={handleGenerate}
          disabled={isLoading || isCompleted}
          className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all active:scale-95 disabled:opacity-50 ${
              isCompleted 
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
              : task.account === AccountType.IB 
              ? 'bg-yellow-400 text-black hover:bg-yellow-300' 
              : task.account === AccountType.PB
              ? 'bg-red-600 text-white hover:bg-red-500'
              : task.account === AccountType.GB
              ? 'bg-green-700 text-white hover:bg-green-600'
              : 'bg-white text-slate-950 hover:bg-slate-200'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Directing...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              {selectedPlatform === 'ALL' ? 'Launch Strategy' : `Build for ${selectedPlatform}`}
            </>
          )}
        </button>
        
        <button
          onClick={onToggleComplete}
          className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-semibold transition-all active:scale-95 ${
            isCompleted 
              ? 'bg-slate-700 text-white hover:bg-slate-600' 
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