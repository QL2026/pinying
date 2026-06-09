import { useState, useEffect } from 'react';
import { 
  HomeIcon, Ear, BookOpen, UserCheck, Star, Sparkles, Smile, Speech 
} from 'lucide-react';
import { getStars, addHistory, recordError } from './utils/storage';
import { Home } from './components/Home';
import { PinyinPractice } from './components/PinyinPractice';
import { ConfusedChallenge } from './components/ConfusedChallenge';
import { ParentBrief } from './components/ParentBrief';
import { RewardModal } from './components/RewardModal';
import { speakText, stopSpeech } from './utils/speech';

type ActiveTab = 'home' | 'initials' | 'finals' | 'challenges' | 'parents';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [stars, setStars] = useState<number>(0);
  const [sessionStarsEarned, setSessionStarsEarned] = useState<number>(0);
  const [isRewardOpen, setIsRewardOpen] = useState<boolean>(false);
  
  // States used to request a jump to a specific letter card
  const [specificLetter, setSpecificLetter] = useState<string | undefined>(undefined);

  // Sync stars from LocalStorage on mount
  useEffect(() => {
    setStars(getStars());
  }, []);

  const handleAddStar = () => {
    // Write directly in LocalStorage and increment local state
    const nextStars = getStars() + 1;
    localStorage.setItem('pinyin_stars', nextStars.toString());
    setStars(nextStars);

    // Track active session earnings & trigger modal every 5 stars
    setSessionStarsEarned((prev) => {
      const nextSessionGains = prev + 1;
      
      if (nextSessionGains > 0 && nextSessionGains % 5 === 0) {
        setIsRewardOpen(true);
      }
      return nextSessionGains;
    });
  };

  const handleRecordHistory = (target: string, status: 'completed' | 'correct' | 'incorrect') => {
    let type: 'initial' | 'final' | 'challenge' = 'challenge';
    if (activeTab === 'initials') type = 'initial';
    if (activeTab === 'finals') type = 'final';

    addHistory({
      type,
      target,
      status,
    });
  };

  const handleRecordError = (target: string) => {
    recordError(target);
  };

  const handleNavigate = (tab: ActiveTab) => {
    setSpecificLetter(undefined);
    setActiveTab(tab);
    stopSpeech();
  };

  const handleStartSpecificPractice = (type: 'initial' | 'final', letter: string) => {
    setSpecificLetter(letter);
    setActiveTab(type === 'initial' ? 'initials' : 'finals');
    stopSpeech();
  };

  const handleReset = () => {
    setStars(0);
    setSessionStarsEarned(0);
    setIsRewardOpen(false);
    setActiveTab('home');
    stopSpeech();
  };

  // Vocalize current tab change briefly to assist pre-literate children
  const speakTabGuide = (tab: ActiveTab) => {
    if (tab === 'home') speakText('去首页');
    if (tab === 'initials') speakText('开始练习声母');
    if (tab === 'finals') speakText('开始学习韵母');
    if (tab === 'challenges') speakText('易混音听音大闯关');
    if (tab === 'parents') speakText('给爸爸妈妈的简报');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased">
      {/* Visual Navigation Bar (Header) */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div 
            onClick={() => handleNavigate('home')} 
            className="flex items-center gap-2 cursor-pointer select-none group focus:outline-none"
            id="brand-logo"
            tabIndex={0}
          >
            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-teal-400 rounded-xl flex items-center justify-center text-white font-extrabold shadow-md transform group-hover:rotate-6 transition-all">
              <span>拼</span>
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-900 tracking-tight leading-tight">
                拼音发音畅乐园
              </h1>
              <span className="text-[10px] text-slate-400 font-bold block leading-none">
                PRESCHOOL拼音跟读练习
              </span>
            </div>
          </div>

          {/* Right Header: Stars Counter */}
          <div className="flex items-center gap-4">
            {/* Quick Star Bar */}
            <div 
              onClick={() => speakText(`有 ${stars} 颗小星星了`)}
              className="flex items-center gap-1.5 bg-yellow-100 hover:bg-yellow-200 border border-yellow-300 px-3.5 py-1.5 rounded-full text-yellow-600 font-bold text-sm shadow-inner cursor-pointer transition-colors"
            >
              <Star size={18} fill="currentColor" className="stroke-amber-600" />
              <span className="text-amber-950 font-black">{stars}</span>
            </div>
          </div>

        </div>
      </header>

      {/* Main Container Stage */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Render Tab Contents */}
        {activeTab === 'home' && (
          <Home 
            stars={stars} 
            onNavigate={handleNavigate}
            onStartSpecificPractice={handleStartSpecificPractice}
          />
        )}

        {activeTab === 'initials' && (
          <PinyinPractice 
            key="practice-initials"
            type="initial"
            onAddStar={handleAddStar}
            onRecordHistory={handleRecordHistory}
            highlightedLetter={specificLetter}
          />
        )}

        {activeTab === 'finals' && (
          <PinyinPractice 
            key="practice-finals"
            type="final"
            onAddStar={handleAddStar}
            onRecordHistory={handleRecordHistory}
            highlightedLetter={specificLetter}
          />
        )}

        {activeTab === 'challenges' && (
          <ConfusedChallenge 
            onAddStar={handleAddStar}
            onRecordHistory={handleRecordHistory}
            onRecordError={handleRecordError}
          />
        )}

        {activeTab === 'parents' && (
          <ParentBrief 
            stars={stars} 
            onResetAll={handleReset}
            onNavigateToLetter={handleStartSpecificPractice}
          />
        )}

      </main>

      {/* App Tab Bar / Footer Nav Bar - Optimized, centered, accessible for mobile */}
      <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-slate-100 shadow-[0_-4px_12px_rgba(0,0,0,0.03)] z-40 py-2">
        <div className="max-w-md mx-auto px-6 flex justify-between items-center">
          {/* Tab 1: Home */}
          <button
            onClick={() => {
              handleNavigate('home');
              speakTabGuide('home');
            }}
            className={`flex flex-col items-center gap-0.5 p-1.5 transition-all text-xs font-bold font-display ${
              activeTab === 'home' 
                ? 'text-indigo-600 scale-105' 
                : 'text-slate-400 hover:text-slate-650'
            }`}
          >
            <HomeIcon size={22} className={`${activeTab === 'home' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
            <span>乐园首页</span>
          </button>

          {/* Tab 2: Initials */}
          <button
            onClick={() => {
              handleNavigate('initials');
              speakTabGuide('initials');
            }}
            className={`flex flex-col items-center gap-0.5 p-1.5 transition-all text-xs font-bold font-display ${
              activeTab === 'initials' 
                ? 'text-yellow-600 scale-105' 
                : 'text-slate-400 hover:text-slate-650'
            }`}
          >
            <BookOpen size={22} className={`${activeTab === 'initials' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
            <span>声母训练</span>
          </button>

          {/* Tab 3: Finals */}
          <button
            onClick={() => {
              handleNavigate('finals');
              speakTabGuide('finals');
            }}
            className={`flex flex-col items-center gap-0.5 p-1.5 transition-all text-xs font-bold font-display ${
              activeTab === 'finals' 
                ? 'text-sky-600 scale-105' 
                : 'text-slate-400 hover:text-slate-650'
            }`}
          >
            <Smile size={22} className={`${activeTab === 'finals' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
            <span>韵母跟学</span>
          </button>

          {/* Tab 4: Challenges */}
          <button
            onClick={() => {
              handleNavigate('challenges');
              speakTabGuide('challenges');
            }}
            className={`flex flex-col items-center gap-0.5 p-1.5 transition-all text-xs font-bold font-display ${
              activeTab === 'challenges' 
                ? 'text-purple-600 scale-105' 
                : 'text-slate-400 hover:text-slate-650'
            }`}
          >
            <Ear size={22} className={`${activeTab === 'challenges' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
            <span>听力辨识</span>
          </button>

          {/* Tab 5: Parents */}
          <button
            onClick={() => {
              handleNavigate('parents');
              speakTabGuide('parents');
            }}
            className={`flex flex-col items-center gap-0.5 p-1.5 transition-all text-xs font-bold font-display ${
              activeTab === 'parents' 
                ? 'text-teal-600 scale-105' 
                : 'text-slate-400 hover:text-slate-650'
            }`}
          >
            <UserCheck size={22} className={`${activeTab === 'parents' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
            <span>家长报表</span>
          </button>
        </div>
      </div>

      {/* 5-Star Milestone Popup Modal */}
      <RewardModal 
        isOpen={isRewardOpen} 
        onClose={() => setIsRewardOpen(false)} 
        starsCount={stars} 
      />
    </div>
  );
}
