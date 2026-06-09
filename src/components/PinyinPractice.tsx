import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Volume2, Mic, Check, Play, ChevronLeft, ChevronRight, 
  Sparkles, ShieldAlert, Award, Star
} from 'lucide-react';
import { PinyinGroup, PinyinItem } from '../types';
import { INITIALS_GROUPS, FINALS_GROUPS } from '../data/pinyin';
import { useRecorder } from '../hooks/useRecorder';
import { speakPinyinTutorial, speakWordOnly, speakDemoSentence, stopSpeech } from '../utils/speech';

interface PinyinPracticeProps {
  type: 'initial' | 'final';
  onAddStar: () => void;
  onRecordHistory: (target: string, status: 'completed' | 'correct' | 'incorrect') => void;
  highlightedLetter?: string; // Shortcut navigation
}

export const PinyinPractice: React.FC<PinyinPracticeProps> = ({ 
  type, onAddStar, onRecordHistory, highlightedLetter 
}) => {
  const groups: PinyinGroup[] = type === 'initial' ? INITIALS_GROUPS : FINALS_GROUPS;
  
  // Create flat list containing all pinyin items for easy sequencing
  const allItems = groups.flatMap((g) => g.items);

  // Active Pinyin item selection
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem: PinyinItem = allItems[activeIndex] || allItems[0];

  // If shortcut highlighted letter is requested, trigger immediate jump
  useEffect(() => {
    if (highlightedLetter) {
      const index = allItems.findIndex((item) => item.pinyin === highlightedLetter);
      if (index !== -1) {
        setActiveIndex(index);
      }
    }
  }, [highlightedLetter, type]);

  // Handle Voice recorder
  const recorder = useRecorder();
  
  // Track state for completion checks
  const [hasListened, setHasListened] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [completedLetters, setCompletedLetters] = useState<string[]>([]);
  const [playSuccessTick, setPlaySuccessTick] = useState(false);

  // Clear states when item changes
  useEffect(() => {
    recorder.clearRecording();
    setHasListened(false);
    setHasRecorded(false);
    setPlaySuccessTick(false);
    stopSpeech();
    
    // Automatically speak when children land on a new card so they are guided
    const timer = setTimeout(() => {
      handleListen();
    }, 450);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  const handleListen = () => {
    setHasListened(true);
    // Speak standard pinyin tutorial
    speakPinyinTutorial(activeItem.pinyin, activeItem.speechKey);
  };

  const handleListenExample = (word: string) => {
    speakWordOnly(word);
  };

  const handleDemoSentence = () => {
    if (activeItem.examples.length > 0) {
      const ex = activeItem.examples[0];
      speakDemoSentence(activeItem.pinyin, activeItem.speechKey, ex.word);
    }
  };

  const handleStartRecord = async () => {
    stopSpeech();
    const success = await recorder.startRecording();
    if (success) {
      setHasRecorded(true);
    }
  };

  const handleStopRecord = () => {
    recorder.stopRecording();
  };

  const handlePlayMyAudio = () => {
    if (recorder.audioUrl) {
      const audio = new Audio(recorder.audioUrl);
      audio.play().catch((err) => console.error('Failed to play back recording:', err));
    }
  };

  const handlePrevItem = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleNextItem = () => {
    if (activeIndex < allItems.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const handleDone = () => {
    // Only give Star and history log if they haven't completed this letter in this selection turn
    if (!completedLetters.includes(activeItem.pinyin)) {
      onAddStar();
      onRecordHistory(activeItem.pinyin, 'completed');
      setCompletedLetters((prev) => [...prev, activeItem.pinyin]);
    }
    
    // Play celebratory sound manually & show visual feed in active card
    setPlaySuccessTick(true);
    speakWordOnly('读得真准，送你一枚星星');

    setTimeout(() => {
      // Auto move to the next item
      if (activeIndex < allItems.length - 1) {
        setActiveIndex(activeIndex + 1);
      } else {
        // Last letter finished! Speak standard success message
        speakWordOnly('太厉害了！所有的拼音都读完啦！');
      }
    }, 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 pb-12">
      {/* Sidebar List Selector (for easily shifting cards) */}
      <div className="w-full lg:w-72 bg-white rounded-3xl p-5 border-2 border-slate-100 shadow-sm flex flex-col space-y-4">
        <div>
          <h3 className="font-extrabold text-slate-800 text-lg">全部拼音卡片</h3>
          <p className="text-xs text-slate-400">点击卡片可直接切换学习</p>
        </div>

        {/* Scrollable grid container */}
        <div className="space-y-4 max-h-[300px] lg:max-h-[500px] overflow-y-auto pr-1">
          {groups.map((group) => (
            <div key={group.id} className="space-y-1.5">
              <h4 className="text-xs font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-md">
                {group.name}
              </h4>
              <div className="grid grid-cols-4 lg:grid-cols-2 gap-2">
                {group.items.map((item) => {
                  const itemIndex = allItems.findIndex((ai) => ai.pinyin === item.pinyin);
                  const isCurrent = activeItem.pinyin === item.pinyin;
                  const isCompleted = completedLetters.includes(item.pinyin);
                  
                  return (
                    <button
                      key={item.pinyin}
                      onClick={() => setActiveIndex(itemIndex)}
                      className={`relative flex items-center justify-between px-3 py-2.5 rounded-xl font-bold transition-all text-sm shadow-sm ${
                        isCurrent 
                          ? 'bg-amber-400 text-white border-2 border-amber-400 scale-[1.02]' 
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-100'
                      }`}
                    >
                      <span className="font-mono text-base font-black">{item.pinyin}</span>
                      <span className="font-sans text-xs opacity-80">{item.speechKey}</span>
                      
                      {isCompleted && (
                        <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-0.5 border border-white">
                          <Check size={8} className="stroke-[4]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Interactive Play Stage */}
      <div className="flex-1 space-y-6">
        {/* Navigation Step Indicators */}
        <div className="flex items-center justify-between text-slate-500 bg-white px-5 py-3 rounded-2xl border border-slate-100 shadow-sm text-sm">
          <button 
            onClick={handlePrevItem}
            disabled={activeIndex === 0}
            className="flex items-center gap-1 font-bold text-indigo-500 disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-transform"
          >
            <ChevronLeft size={18} />
            <span>上一个</span>
          </button>
          
          <span className="font-extrabold text-slate-700">
            卡片 {activeIndex + 1} / {allItems.length}
          </span>

          <button 
            onClick={handleNextItem}
            disabled={activeIndex === allItems.length - 1}
            className="flex items-center gap-1 font-bold text-indigo-500 disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-transform"
          >
            <span>下一个</span>
            <ChevronRight size={18} />
          </button>
        </div>

        {/* The Card */}
        <div className="relative bg-white rounded-3xl border-2 border-amber-100 shadow-sm p-6 sm:p-10 overflow-hidden">
          {/* Confetti or Star overlays on reader complete */}
          <AnimatePresence>
            {playSuccessTick && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-yellow-400/95 flex flex-col items-center justify-center text-white z-20 p-8 text-center"
              >
                <motion.div
                  animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6 }}
                  className="bg-white text-yellow-500 rounded-full p-6 shadow-xl mb-4"
                >
                  <Star size={64} fill="currentColor" />
                </motion.div>
                <h3 className="text-3xl font-black mb-2 font-display">读得真好！🌈</h3>
                <p className="text-lg font-bold text-yellow-950">获得一颗小星星！</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Letter Head Display */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-dashed border-slate-100">
            <div className="flex items-center gap-5">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-yellow-100 border-2 border-yellow-300 flex flex-col items-center justify-center p-2 text-center shadow-inner">
                <span className="text-5xl sm:text-6xl font-black text-amber-700 font-mono tracking-tight select-none">
                  {activeItem.pinyin}
                </span>
                <span className="text-xs text-amber-700/80 font-bold mt-1">发音像：{activeItem.speechKey}</span>
              </div>
              
              <div className="space-y-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded text-amber-800 text-xs font-bold font-mono">
                  {type === 'initial' ? '声母 (Shengmu)' : '韵母 (Yunmu)'}
                </div>
                <h2 className="text-2xl font-black text-slate-800 font-display">
                  拼音字母 "{activeItem.pinyin}"
                </h2>
                <p className="text-sm text-slate-400">请点击下方的按钮听一听并自己大声读出来吧！</p>
              </div>
            </div>

            {/* Quick Demo Sentence speaker */}
            <button
              onClick={handleDemoSentence}
              className="text-xs font-extrabold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl px-4 py-2.5 shadow-sm transition-all flex items-center gap-1.5 focus:outline-none"
            >
              <Volume2 size={15} />
              说句子 🗣️
            </button>
          </div>

          {/* Learning Section */}
          <div className="py-6 space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase mb-3">快乐口诀与词语</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeItem.examples.map((ex, index) => (
                  <div 
                    key={index}
                    onClick={() => handleListenExample(ex.word)}
                    className="flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-100 cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3.5xl flex items-center justify-center bg-white w-12 h-12 rounded-xl shadow-sm">
                        {ex.emoji}
                      </span>
                      <div>
                        <div className="font-bold text-slate-700 text-sm font-mono tracking-wide">{ex.pinyin}</div>
                        <div className="text-xl font-bold text-slate-900">{ex.word}</div>
                      </div>
                    </div>
                    <div className="text-slate-400 bg-white p-2 rounded-full border border-slate-100 shadow-sm">
                      <Volume2 size={16} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Micro Audio recorders and Players */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-400 uppercase">大声开口说</h3>

              {/* Recorder error states friendly to children */}
              {recorder.error && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3">
                  <ShieldAlert className="text-red-500 shrink-0 mt-0.5" size={18} />
                  <div>
                    <h4 className="font-extrabold text-red-800 text-sm">提醒家长朋友</h4>
                    <p className="text-xs text-red-700 mt-0.5 leading-relaxed">{recorder.error}</p>
                    <button 
                      onClick={() => recorder.requestPermission()}
                      className="text-xs underline font-extrabold text-red-800 mt-2 hover:text-red-950 focus:outline-none"
                    >
                      重新尝试允许麦克风权限 👉
                    </button>
                  </div>
                </div>
              )}

              {/* Action Board (Hear and Record) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Action 1: Standard Listen */}
                <button
                  onClick={handleListen}
                  className={`flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                    hasListened
                      ? 'bg-green-50/70 border-green-200 text-green-800'
                      : 'bg-indigo-50/50 border-indigo-100 hover:border-indigo-200 text-indigo-800'
                  }`}
                >
                  <div className={`p-3 bg-white rounded-full shadow-md mb-2 ${hasListened ? 'text-green-500' : 'text-indigo-500'}`}>
                    <Volume2 size={24} className="animate-pulse" />
                  </div>
                  <span className="font-bold text-base">听一听标准音</span>
                  <span className="text-xs opacity-75 mt-0.5">听听老师怎么读</span>
                </button>

                {/* Action 2: Trigger Mic Recording */}
                {recorder.isRecording ? (
                  <button
                    onClick={handleStopRecord}
                    className="flex flex-col items-center justify-center p-5 rounded-2xl bg-red-50 border-2 border-red-300 text-red-800 cursor-pointer animate-pulse"
                  >
                    <div className="p-3 bg-white rounded-full shadow-md mb-2 text-red-600">
                      <Mic size={24} className="animate-ping" />
                    </div>
                    <span className="font-bold text-base">正在录音 ({recorder.duration}秒)</span>
                    <span className="text-xs text-red-600 mt-0.5 font-bold">点击按钮 读好啦</span>
                  </button>
                ) : (
                  <button
                    onClick={handleStartRecord}
                    className={`flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                      hasRecorded
                        ? 'bg-emerald-50/70 border-emerald-200 text-emerald-800'
                        : 'bg-amber-50/50 border-amber-100 hover:border-amber-200 text-amber-800'
                    }`}
                  >
                    <div className={`p-3 bg-white rounded-full shadow-md mb-2 ${hasRecorded ? 'text-emerald-500' : 'text-amber-500'}`}>
                      <Mic size={24} />
                    </div>
                    <span className="font-bold text-base">我来读一读</span>
                    <span className="text-xs opacity-75 mt-0.5">
                      {hasRecorded ? '已录好音频，可再录' : '点击开始大声读'}
                    </span>
                  </button>
                )}

                {/* Action 3: Playback own speech */}
                <button
                  onClick={handlePlayMyAudio}
                  disabled={!recorder.audioUrl}
                  className={`flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all ${
                    recorder.audioUrl
                      ? 'bg-purple-50/70 border-purple-200 hover:border-purple-300 text-purple-800 cursor-pointer'
                      : 'bg-slate-50 border-slate-200 text-slate-400 opacity-55 cursor-not-allowed'
                  }`}
                >
                  <div className={`p-3 bg-white rounded-full shadow-md mb-2 ${recorder.audioUrl ? 'text-purple-600' : 'text-slate-400'}`}>
                    <Play size={24} fill={recorder.audioUrl ? "currentColor" : "none"} />
                  </div>
                  <span className="font-bold text-base">重放我的声音</span>
                  <span className="text-xs opacity-75 mt-0.5">听听自己读得怎么样</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Confirmation Submittals */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
            <button
              onClick={handleDone}
              disabled={!hasListened}
              className={`w-full sm:w-auto px-10 py-4 rounded-2xl text-lg font-bold flex items-center justify-center gap-2 shadow-lg transition-all border-b-4 focus:outline-none ${
                hasListened
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-green-700 active:scale-[0.98]'
                  : 'bg-slate-200 text-slate-400 border-slate-350 cursor-not-allowed'
              }`}
            >
              <Award size={22} fill="currentColor" />
              <span>读好了，得星星 ⭐</span>
            </button>
          </div>
          
          <div className="mt-2 text-center text-xs text-slate-400">
            {!hasListened && "⚠️ 需要先点击‘听一听标准音’，然后再读，才能得奖"}
          </div>
        </div>
      </div>
    </div>
  );
};
