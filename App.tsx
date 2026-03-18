import React, { useState, useMemo } from 'react';
import { PLAYBOOK_DATA, QUOTES_DATA } from './data';
import { PostCard } from './components/PostCard';
import { QuoteCard } from './components/QuoteCard';
import { PromptModal } from './components/PromptModal';
import { AccountType, SocialPlatform, ACCOUNT_PLATFORMS, QuoteCategory, PostCategory } from './types';
import { 
  LayoutGrid, Shield, Zap, Users, Calendar, Filter, Coffee, 
  Facebook, Instagram, Linkedin, Twitter, Youtube, Globe, 
  Quote, Heart, List, Download, Palette,
  Shapes, BookOpen, Layers, Archive, CheckCircle
} from 'lucide-react';

function App() {
  const [viewMode, setViewMode] = useState<'CALENDAR' | 'QUOTES' | 'LIBRARY' | 'VAULT'>('CALENDAR');
  const [layoutMode, setLayoutMode] = useState<'BOARD' | 'LIST'>('BOARD');
  const [selectedAccount, setSelectedAccount] = useState<AccountType | 'ALL'>('ALL');
  const [selectedQuoteAccount, setSelectedQuoteAccount] = useState<AccountType>(AccountType.IB);
  
  const [selectedWeek, setSelectedWeek] = useState<number | 'ALL'>('ALL');
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform>('ALL');
  const [selectedPostCategory, setSelectedPostCategory] = useState<PostCategory | 'ALL'>('ALL');
  const [selectedDate, setSelectedDate] = useState<string | 'ALL'>('ALL');

  const [selectedQuoteCategory, setSelectedQuoteCategory] = useState<QuoteCategory | 'ALL'>('ALL');
  
  // Track completed items
  const [completedPostIds, setCompletedPostIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('completedPostIds');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [completedQuoteIds, setCompletedQuoteIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('completedQuoteIds');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  // Persist completed items
  React.useEffect(() => {
    localStorage.setItem('completedPostIds', JSON.stringify(Array.from(completedPostIds)));
  }, [completedPostIds]);

  React.useEffect(() => {
    localStorage.setItem('completedQuoteIds', JSON.stringify(Array.from(completedQuoteIds)));
  }, [completedQuoteIds]);

  const [modalData, setModalData] = useState<{ isOpen: boolean; content: string; title: string }>({
    isOpen: false,
    content: '',
    title: '',
  });

  const allAvailableDates = useMemo(() => {
    const dates = PLAYBOOK_DATA.map(p => p.date);
    return Array.from(new Set(dates));
  }, []);

  const availablePostCategories = useMemo(() => {
    const cats = PLAYBOOK_DATA.map(p => p.category);
    return Array.from(new Set(cats));
  }, []);

  const filteredPosts = useMemo(() => {
    return PLAYBOOK_DATA.filter(post => {
      const accountMatch = selectedAccount === 'ALL' || post.account === selectedAccount;
      const weekMatch = selectedWeek === 'ALL' || post.week === selectedWeek;
      const categoryMatch = selectedPostCategory === 'ALL' || post.category === selectedPostCategory;
      const dateMatch = selectedDate === 'ALL' || post.date === selectedDate;
      
      let platformMatch = true;
      if (selectedPlatform !== 'ALL') {
         const accountPlatforms = ACCOUNT_PLATFORMS[post.account] || [];
         platformMatch = accountPlatforms.includes(selectedPlatform);
      }

      return accountMatch && weekMatch && platformMatch && categoryMatch && dateMatch;
    });
  }, [selectedAccount, selectedWeek, selectedPlatform, selectedPostCategory, selectedDate]);

  const libraryGroups = useMemo(() => {
    if (viewMode !== 'LIBRARY') return [];
    
    // Group posts by category under the selected account
    const activeAccount = selectedAccount === 'ALL' ? AccountType.IB : selectedAccount;
    const accountPosts = PLAYBOOK_DATA.filter(p => p.account === activeAccount);
    
    const categories: PostCategory[] = ['Carousel', 'Reel', 'Video', 'YouTube Shorts', 'Infographic', 'Meme', 'Story', 'Slide', 'Text', 'Holiday'];
    
    return categories.map(cat => ({
      category: cat,
      posts: accountPosts.filter(p => p.category === cat)
    }));
  }, [viewMode, selectedAccount, completedPostIds]);

  const filteredQuotes = useMemo(() => {
      return QUOTES_DATA.filter(quote => {
          const accountMatch = quote.account === selectedQuoteAccount;
          const categoryMatch = selectedQuoteCategory === 'ALL' || quote.category === selectedQuoteCategory;
          return accountMatch && categoryMatch;
      });
  }, [selectedQuoteCategory, selectedQuoteAccount]);

  const availableQuoteCategories = useMemo(() => {
      const categories = new Set(QUOTES_DATA.filter(q => q.account === selectedQuoteAccount).map(q => q.category));
      return Array.from(categories);
  }, [selectedQuoteAccount]);

  // Vault data
  const vaultPosts = useMemo(() => PLAYBOOK_DATA.filter(p => completedPostIds.has(p.id)), [completedPostIds]);
  const vaultQuotes = useMemo(() => QUOTES_DATA.filter(q => completedQuoteIds.has(q.id)), [completedQuoteIds]);

  const handleOpenModal = (content: string, title: string) => {
    setModalData({ isOpen: true, content, title });
  };

  const handleExport = () => {
    const dataToExport = viewMode === 'CALENDAR' ? filteredPosts : filteredQuotes;
    const fileName = viewMode === 'CALENDAR' ? `empire_calendar_export.json` : `empire_quotes_export.json`;
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const togglePostComplete = (id: string) => {
    setCompletedPostIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const toggleQuoteComplete = (id: string) => {
    setCompletedQuoteIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const stats = {
    total: PLAYBOOK_DATA.length,
    ib: PLAYBOOK_DATA.filter(p => p.account === AccountType.IB).length,
    qc: PLAYBOOK_DATA.filter(p => p.account === AccountType.QC).length,
    lib: PLAYBOOK_DATA.filter(p => p.account === AccountType.LIB).length,
    pb: PLAYBOOK_DATA.filter(p => p.account === AccountType.PB).length,
    quotesIB: QUOTES_DATA.filter(q => q.account === AccountType.IB).length,
    quotesQC: QUOTES_DATA.filter(q => q.account === AccountType.QC).length,
    quotesPB: QUOTES_DATA.filter(q => q.account === AccountType.PB).length,
    quotesLIB: QUOTES_DATA.filter(q => q.account === AccountType.LIB).length,
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      
      {/* Navigation / Header */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30 shadow-2xl">
        <div className="max-w-[1900px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-slate-100 fill-yellow-400" />
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-white">EMPIRE PLAYBOOK</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Multi-Brand Manager</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 overflow-x-auto no-scrollbar">
              <button 
                onClick={() => setViewMode('CALENDAR')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all text-xs font-bold whitespace-nowrap ${viewMode === 'CALENDAR' ? 'bg-white text-slate-950 shadow-md' : 'text-slate-500 hover:text-white'}`}
              >
                <Calendar className="w-3.5 h-3.5" /> Calendar
              </button>
              <button 
                onClick={() => setViewMode('LIBRARY')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all text-xs font-bold whitespace-nowrap ${viewMode === 'LIBRARY' ? 'bg-white text-slate-950 shadow-md' : 'text-slate-500 hover:text-white'}`}
              >
                <BookOpen className="w-3.5 h-3.5" /> Library
              </button>
               <button 
                onClick={() => setViewMode('QUOTES')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all text-xs font-bold whitespace-nowrap ${viewMode === 'QUOTES' ? 'bg-white text-slate-950 shadow-md' : 'text-slate-500 hover:text-white'}`}
              >
                <Quote className="w-3.5 h-3.5" /> Quotes
              </button>
              <button 
                onClick={() => setViewMode('VAULT')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all text-xs font-bold whitespace-nowrap ${viewMode === 'VAULT' ? 'bg-white text-slate-950 shadow-md' : 'text-slate-500 hover:text-white'}`}
              >
                <Archive className="w-3.5 h-3.5" /> Vault
              </button>
            </div>

            <div className="hidden md:flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
              <button 
                onClick={() => setLayoutMode('BOARD')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all text-xs font-bold ${layoutMode === 'BOARD' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-white'}`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => setLayoutMode('LIST')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all text-xs font-bold ${layoutMode === 'LIST' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-white'}`}
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>

            <button 
              onClick={handleExport}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-bold transition-all border border-slate-700"
            >
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1900px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Account Selector Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-11 gap-3 mb-10">
          
          <div onClick={() => { setSelectedAccount('ALL'); }} className={`cursor-pointer p-3 rounded-xl border transition-all ${selectedAccount === 'ALL' ? 'bg-white text-slate-950 border-white shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-105' : 'bg-slate-900 border-slate-800 hover:border-slate-600 text-slate-300'}`}>
            <div className="flex items-center justify-between mb-1">
              <LayoutGrid className="w-4 h-4 opacity-80" />
              <span className="text-lg font-bold">{stats.total}</span>
            </div>
            <p className="text-[10px] font-medium uppercase tracking-wider opacity-70">All Content</p>
          </div>

          <div onClick={() => { setSelectedAccount(AccountType.IB); }} className={`cursor-pointer p-3 rounded-xl border transition-all ${selectedAccount === AccountType.IB ? 'bg-slate-800 text-white border-yellow-400 shadow-lg border-l-4 scale-105' : 'bg-slate-900 border-slate-800 hover:border-slate-600'}`}>
            <div className="flex items-center justify-between mb-1">
              <Shield className="w-4 h-4 text-yellow-400" />
              <span className="text-lg font-bold">{stats.ib}</span>
            </div>
            <p className="text-[10px] font-medium uppercase tracking-wider opacity-70">Ins. Boss</p>
          </div>

          <div onClick={() => { setSelectedAccount(AccountType.QC); }} className={`cursor-pointer p-3 rounded-xl border transition-all ${selectedAccount === AccountType.QC ? 'bg-slate-800 text-white border-teal-500 shadow-lg border-l-4 scale-105' : 'bg-slate-900 border-slate-800 hover:border-slate-600'}`}>
            <div className="flex items-center justify-between mb-1">
              <Users className="w-4 h-4 text-teal-400" />
              <span className="text-lg font-bold">{stats.qc}</span>
            </div>
            <p className="text-[10px] font-medium uppercase tracking-wider opacity-70">Quick Cov</p>
          </div>

          <div onClick={() => { setSelectedAccount(AccountType.LIB); }} className={`cursor-pointer p-3 rounded-xl border transition-all ${selectedAccount === AccountType.LIB ? 'bg-slate-800 text-white border-slate-400 shadow-lg border-l-4 scale-105' : 'bg-slate-900 border-slate-800 hover:border-slate-600'}`}>
            <div className="flex items-center justify-between mb-1">
              <Zap className="w-4 h-4 text-slate-400" />
              <span className="text-lg font-bold">{stats.lib}</span>
            </div>
            <p className="text-[10px] font-medium uppercase tracking-wider opacity-70">Life Boss</p>
          </div>

          <div onClick={() => { setSelectedAccount(AccountType.PB); }} className={`cursor-pointer p-3 rounded-xl border transition-all ${selectedAccount === AccountType.PB ? 'bg-red-600 text-white border-white shadow-lg border-l-4 scale-105' : 'bg-slate-900 border-slate-800 hover:border-slate-600'}`}>
            <div className="flex items-center justify-between mb-1">
              <Heart className="w-4 h-4 text-white" />
              <span className="text-lg font-bold text-white">{stats.pb}</span>
            </div>
            <p className="text-[10px] font-medium uppercase tracking-wider opacity-70 text-white/80">Protect</p>
          </div>

          {/* Spacer for Quote Tabs */}
          <div className="hidden xl:block col-span-1 border-r border-slate-800"></div>

          <div onClick={() => { setViewMode('QUOTES'); setSelectedQuoteAccount(AccountType.IB); setSelectedQuoteCategory('ALL'); }} className={`cursor-pointer p-3 rounded-xl border transition-all ${viewMode === 'QUOTES' && selectedQuoteAccount === AccountType.IB ? 'bg-yellow-400 text-black border-white shadow-lg scale-105' : 'bg-slate-900 border-slate-800 hover:border-slate-600'}`}>
            <div className="flex items-center justify-between mb-1">
              <Quote className="w-4 h-4" />
              <span className="text-lg font-bold">{stats.quotesIB}</span>
            </div>
            <p className="text-[10px] font-medium uppercase tracking-wider opacity-70">Boss Q</p>
          </div>

          <div onClick={() => { setViewMode('QUOTES'); setSelectedQuoteAccount(AccountType.QC); setSelectedQuoteCategory('ALL'); }} className={`cursor-pointer p-3 rounded-xl border transition-all ${viewMode === 'QUOTES' && selectedQuoteAccount === AccountType.QC ? 'bg-teal-500 text-white border-white shadow-lg scale-105' : 'bg-slate-900 border-slate-800 hover:border-slate-600'}`}>
            <div className="flex items-center justify-between mb-1">
              <Quote className="w-4 h-4" />
              <span className="text-lg font-bold">{stats.quotesQC}</span>
            </div>
            <p className="text-[10px] font-medium uppercase tracking-wider opacity-70">QC Q</p>
          </div>

          <div onClick={() => { setViewMode('QUOTES'); setSelectedQuoteAccount(AccountType.PB); setSelectedQuoteCategory('ALL'); }} className={`cursor-pointer p-3 rounded-xl border transition-all ${viewMode === 'QUOTES' && selectedQuoteAccount === AccountType.PB ? 'bg-red-600 text-white border-white shadow-lg scale-105' : 'bg-slate-900 border-slate-800 hover:border-slate-600'}`}>
            <div className="flex items-center justify-between mb-1">
              <Quote className="w-4 h-4 text-white" />
              <span className="text-lg font-bold text-white">{stats.quotesPB}</span>
            </div>
            <p className="text-[10px] font-medium uppercase tracking-wider opacity-70 text-white/80">PB Q</p>
          </div>

          <div onClick={() => { setViewMode('QUOTES'); setSelectedQuoteAccount(AccountType.LIB); setSelectedQuoteCategory('ALL'); }} className={`cursor-pointer p-3 rounded-xl border transition-all ${viewMode === 'QUOTES' && selectedQuoteAccount === AccountType.LIB ? 'bg-slate-700 text-white border-white shadow-lg scale-105' : 'bg-slate-900 border-slate-800 hover:border-slate-600'}`}>
            <div className="flex items-center justify-between mb-1">
              <Quote className="w-4 h-4 text-slate-400" />
              <span className="text-lg font-bold">{stats.quotesLIB}</span>
            </div>
            <p className="text-[10px] font-medium uppercase tracking-wider opacity-70">Life Q</p>
          </div>
        </div>

        {viewMode === 'CALENDAR' && (
        <>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-8 bg-slate-900 p-5 rounded-xl shadow-xl border border-slate-800">
                <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto overflow-x-auto no-scrollbar">
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400" /> Date
                        </span>
                        <select 
                            value={selectedDate} 
                            onChange={(e) => {
                              setSelectedDate(e.target.value);
                              if (e.target.value !== 'ALL') setSelectedWeek('ALL');
                            }}
                            className={`text-xs font-bold bg-slate-800 border-slate-700 rounded-lg py-2 px-4 focus:ring-2 focus:ring-slate-700 cursor-pointer transition-colors ${selectedDate !== 'ALL' ? 'bg-white text-slate-950' : 'text-slate-200'}`}
                        >
                            <option value="ALL">All Days</option>
                            {allAvailableDates.map(date => (
                                <option key={date} value={date}>{date}</option>
                            ))}
                        </select>
                    </div>

                    <div className="hidden sm:block w-px h-8 bg-slate-800"></div>

                    <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                            <Filter className="w-3 h-3 text-slate-400" /> Week
                        </span>
                        {[1, 2, 3, 4].map(week => (
                            <button
                                key={week}
                                onClick={() => {
                                  setSelectedWeek(selectedWeek === week ? 'ALL' : week);
                                  setSelectedDate('ALL');
                                }}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                                    selectedWeek === week 
                                    ? 'bg-white text-slate-950' 
                                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                }`}
                            >
                                W{week}
                            </button>
                        ))}
                    </div>

                    <div className="hidden sm:block w-px h-8 bg-slate-800"></div>
                    
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                            <Globe className="w-3 h-3 text-slate-400" /> Platform
                        </span>
                        
                        <div className="flex gap-1">
                            <button onClick={() => setSelectedPlatform('ALL')} className={`p-2 rounded-full transition-colors ${selectedPlatform === 'ALL' ? 'bg-white text-slate-950' : 'bg-slate-800 text-slate-500 hover:bg-slate-700'}`} title="All Platforms"><Globe className="w-4 h-4" /></button>
                            <button onClick={() => setSelectedPlatform('Instagram')} className={`p-2 rounded-full transition-colors ${selectedPlatform === 'Instagram' ? 'bg-pink-600 text-white' : 'bg-slate-800 text-slate-500 hover:bg-slate-700'}`} title="Instagram"><Instagram className="w-4 h-4" /></button>
                            <button onClick={() => setSelectedPlatform('Facebook')} className={`p-2 rounded-full transition-colors ${selectedPlatform === 'Facebook' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500 hover:bg-slate-700'}`} title="Facebook"><Facebook className="w-4 h-4" /></button>
                            <button onClick={() => setSelectedPlatform('LinkedIn')} className={`p-2 rounded-full transition-colors ${selectedPlatform === 'LinkedIn' ? 'bg-blue-700 text-white' : 'bg-slate-800 text-slate-500 hover:bg-slate-700'}`} title="LinkedIn"><Linkedin className="w-4 h-4" /></button>
                            <button onClick={() => setSelectedPlatform('X')} className={`p-2 rounded-full transition-colors ${selectedPlatform === 'X' ? 'bg-white text-slate-950' : 'bg-slate-800 text-slate-500 hover:bg-slate-700'}`} title="X"><Twitter className="w-4 h-4" /></button>
                        </div>
                    </div>

                    <div className="hidden sm:block w-px h-8 bg-slate-800"></div>

                    <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                            <Shapes className="w-3 h-3 text-slate-400" /> Post Type
                        </span>
                        <select 
                            value={selectedPostCategory} 
                            onChange={(e) => setSelectedPostCategory(e.target.value as PostCategory | 'ALL')}
                            className={`text-xs font-bold bg-slate-800 border-slate-700 rounded-lg py-2 px-4 focus:ring-2 focus:ring-slate-700 cursor-pointer transition-colors ${selectedPostCategory !== 'ALL' ? 'bg-white text-slate-950' : 'text-slate-200'}`}
                        >
                            <option value="ALL">All Types</option>
                            {availablePostCategories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>
                
                <div className="text-sm text-slate-400 font-medium bg-slate-800 px-4 py-1 rounded-full border border-slate-700">
                    {filteredPosts.length} posts
                </div>
            </div>

            {layoutMode === 'BOARD' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 pb-20 animate-in fade-in duration-300">
              {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                  <PostCard 
                      key={post.id} 
                      task={post}
                      selectedPlatform={selectedPlatform}
                      onViewPrompt={handleOpenModal} 
                      onToggleComplete={() => togglePostComplete(post.id)}
                      isCompleted={completedPostIds.has(post.id)}
                  />
                  ))
              ) : (
                  <div className="col-span-full py-20 text-center text-slate-500 bg-slate-900/50 rounded-2xl border border-dashed border-slate-800">
                      <p className="text-lg font-medium text-slate-400">No content strategies found matching your filters.</p>
                  </div>
              )}
              </div>
            ) : (
              <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-2xl animate-in slide-in-from-bottom-4 duration-300 mb-20">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-950 border-b border-slate-800">
                        <th className="px-6 py-4 font-bold text-slate-400 uppercase tracking-wider text-[10px]">Day / Date</th>
                        <th className="px-6 py-4 font-bold text-slate-400 uppercase tracking-wider text-[10px]">Brand</th>
                        <th className="px-6 py-4 font-bold text-slate-400 uppercase tracking-wider text-[10px]">Title & Goal</th>
                        <th className="px-6 py-4 font-bold text-slate-400 uppercase tracking-wider text-[10px]">Format</th>
                        <th className="px-6 py-4 font-bold text-slate-400 uppercase tracking-wider text-[10px] text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {filteredPosts.map(post => (
                        <tr key={post.id} className="hover:bg-slate-800/50 transition-colors group">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-bold text-white">Day {post.day}</div>
                            <div className="text-[10px] text-slate-500 uppercase">{post.date}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                             <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md ${
                               post.account === AccountType.IB ? 'bg-yellow-400 text-black' :
                               post.account === AccountType.QC ? 'bg-teal-500 text-white' :
                               post.account === AccountType.PB ? 'bg-red-600 text-white' :
                               'bg-slate-700 text-white'
                             }`}>
                               {post.account}
                             </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-bold text-white mb-0.5">{post.title}</div>
                            <div className="text-slate-400 line-clamp-1 text-xs">{post.content}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2 text-slate-400 bg-slate-950 px-2 py-1 rounded border border-slate-800 w-fit">
                              <span className="text-[10px] font-bold uppercase tracking-widest">{post.category}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                             <div className="flex justify-end gap-2">
                               <button 
                                  onClick={() => handleOpenModal("Use the Board View cards to launch specific campaign strategies for this task.", post.title)}
                                  className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-white hover:text-slate-950 rounded-lg text-[10px] font-black uppercase transition-all border border-slate-700"
                                >
                                  Launch
                                </button>
                                <button 
                                  onClick={() => togglePostComplete(post.id)}
                                  className="flex items-center justify-center p-2 rounded-lg bg-slate-800 hover:bg-green-600 text-white transition-colors"
                                  title="Mark Complete"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </button>
                             </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
        </>
        )}

        {viewMode === 'LIBRARY' && (
          <div className="animate-in fade-in duration-300 pb-20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-extrabold text-white flex items-center gap-3">
                  <BookOpen className="w-8 h-8 text-blue-400" />
                  {selectedAccount === 'ALL' ? 'Account Library' : `${selectedAccount} Library`}
                </h2>
                <p className="text-slate-500 mt-1 font-medium">Browse content by category (At least 7 posts each)</p>
              </div>
            </div>

            <div className="space-y-12">
              {libraryGroups.map(group => group.posts.length > 0 && (
                <section key={group.category}>
                  <div className="flex items-center gap-4 mb-6 border-b border-slate-800 pb-4">
                    <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                      <Layers className="w-5 h-5 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white uppercase tracking-widest">{group.category} <span className="text-slate-600 ml-2">({group.posts.length})</span></h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                    {group.posts.map(post => (
                      <PostCard 
                        key={post.id} 
                        task={post}
                        selectedPlatform={selectedPlatform}
                        onViewPrompt={handleOpenModal}
                        onToggleComplete={() => togglePostComplete(post.id)}
                        isCompleted={completedPostIds.has(post.id)}
                      />
                    ))}
                  </div>
                </section>
              ))}
              
              {libraryGroups.every(g => g.posts.length === 0) && (
                  <div className="py-20 text-center text-slate-500 bg-slate-900/50 rounded-2xl border border-dashed border-slate-800">
                      <p className="text-lg font-medium text-slate-400">No pending content found for this account.</p>
                  </div>
              )}
            </div>
          </div>
        )}

        {viewMode === 'QUOTES' && (
            <div className="animate-in fade-in duration-300 pb-20">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <h2 className="text-2xl font-bold flex items-center gap-3 text-white">
                        <Quote className="w-6 h-6 text-yellow-400" /> 
                        {selectedQuoteAccount} Quotes
                    </h2>

                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
                         <button
                            onClick={() => setSelectedQuoteCategory('ALL')}
                            className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-colors ${selectedQuoteCategory === 'ALL' ? 'bg-white text-slate-950 shadow-lg' : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-600'}`}
                        >
                            All Categories
                        </button>
                        {availableQuoteCategories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedQuoteCategory(cat as QuoteCategory)}
                                className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest whitespace-nowrap transition-colors ${selectedQuoteCategory === cat ? 'bg-white text-slate-950 shadow-lg' : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-600'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {layoutMode === 'BOARD' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredQuotes.map(quote => (
                          <QuoteCard 
                            key={quote.id} 
                            quote={quote} 
                            onViewPrompt={handleOpenModal} 
                            onToggleComplete={() => toggleQuoteComplete(quote.id)}
                            isCompleted={completedQuoteIds.has(quote.id)}
                          />
                      ))}
                      {filteredQuotes.length === 0 && (
                           <div className="col-span-full py-20 text-center text-slate-500 bg-slate-900/50 rounded-2xl border border-slate-800">
                              <p>No pending quotes found in this category.</p>
                          </div>
                      )}
                  </div>
                ) : (
                  <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
                     <table className="w-full text-left text-sm border-collapse">
                        <thead>
                          <tr className="bg-slate-950 border-b border-slate-800">
                            <th className="px-6 py-4 font-bold text-slate-400 uppercase tracking-wider text-[10px]">Quote Narrative</th>
                            <th className="px-6 py-4 font-bold text-slate-400 uppercase tracking-wider text-[10px]">Category</th>
                            <th className="px-6 py-4 font-bold text-slate-400 uppercase tracking-wider text-[10px] text-right">Visuals</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                          {filteredQuotes.map(quote => (
                            <tr key={quote.id} className="hover:bg-slate-800/50 transition-colors group">
                                <td className="px-6 py-6">
                                  <p className="text-base font-serif italic text-white line-clamp-2 leading-relaxed">"{quote.text}"</p>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="text-[10px] font-black uppercase tracking-widest bg-slate-950 px-3 py-1.5 rounded-full border border-slate-800">
                                    {quote.category}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                   <div className="flex justify-end gap-2">
                                      <button 
                                        onClick={() => handleOpenModal("Switch to Board View to generate the 'Quad-Director' art prompt for this quote.", "List Mode Instruction")}
                                        className="p-2.5 bg-slate-950 hover:bg-white hover:text-slate-950 rounded-lg transition-all border border-slate-800 group-hover:border-white/20"
                                        title="Generate Art Direction"
                                      >
                                        <Palette className="w-4 h-4" />
                                      </button>
                                      <button 
                                        onClick={() => toggleQuoteComplete(quote.id)}
                                        className="p-2.5 bg-slate-950 hover:bg-green-600 hover:text-white rounded-lg transition-all border border-slate-800 group-hover:border-white/20"
                                        title="Mark Complete"
                                      >
                                        <CheckCircle className="w-4 h-4" />
                                      </button>
                                   </div>
                                </td>
                            </tr>
                          ))}
                        </tbody>
                     </table>
                  </div>
                )}
            </div>
        )}

        {viewMode === 'VAULT' && (
          <div className="animate-in fade-in duration-300 pb-20">
            <h2 className="text-3xl font-extrabold text-white mb-8 flex items-center gap-3">
              <Archive className="w-8 h-8 text-slate-400" /> The Vault
            </h2>
            
            <div className="space-y-12">
              {vaultPosts.length > 0 && (
                <section>
                   <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-800 pb-2">Completed Posts</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                     {vaultPosts.map(post => (
                       <PostCard 
                          key={post.id} 
                          task={post} 
                          selectedPlatform="ALL" 
                          onViewPrompt={handleOpenModal} 
                          onToggleComplete={() => togglePostComplete(post.id)} 
                          isCompleted={true} 
                       />
                     ))}
                   </div>
                </section>
              )}

              {vaultQuotes.length > 0 && (
                <section>
                   <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-800 pb-2">Completed Quotes</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                     {vaultQuotes.map(quote => (
                       <QuoteCard 
                          key={quote.id} 
                          quote={quote} 
                          onViewPrompt={handleOpenModal} 
                          onToggleComplete={() => toggleQuoteComplete(quote.id)} 
                          isCompleted={true} 
                       />
                     ))}
                   </div>
                </section>
              )}

              {vaultPosts.length === 0 && vaultQuotes.length === 0 && (
                <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-800 text-slate-500">
                   <Archive className="w-12 h-12 mx-auto mb-4 opacity-20" />
                   <p className="text-lg font-medium">The Vault is empty.</p>
                   <p className="text-sm mt-1">Mark posts and quotes as complete to archive them here.</p>
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      <PromptModal 
        isOpen={modalData.isOpen}
        title={modalData.title}
        content={modalData.content}
        onClose={() => setModalData({ ...modalData, isOpen: false })}
      />
    </div>
  );
}

export default App;