import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Volume2, Ear, Sparkles, Star, CheckCircle, XCircle, RotateCcw
} from 'lucide-react';
import { ChallengeItem } from '../types';
import { CHALLENGES } from '../data/pinyin';
import { speakWordOnly, stopSpeech } from '../utils/speech';

interface ConfusedChallengeProps {
  onAddStar: () => void;
  onRecordHistory: (target: string, status: 'completed' | 'correct' | 'incorrect') => void;
  onRecordError: (target: string) => void;
}

export const ConfusedChallenge: React.FC<ConfusedChallengeProps> = ({ 
  onAddStar, onRecordHistory, onRecordError 
}) => {
  // Shuffle or map sequential challenges
  const [currentIdx, setCurrentIdx] = useState(0);
  const activeChallenge: ChallengeItem = CHALLENGES[currentIdx] || CHALLENGES[0];

  const [hasPlayedText, setHasPlayedText] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isDone, setIsDone] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);
  
  // Clean states when challenge progresses
  useEffect(() => {
    setSelectedOption(null);
    setIsDone(false);
    setIsIncorrect(false);
    setHasPlayedText(false);
    stopSpeech();
  }, [currentIdx]);

  const handlePlayWord = () => {
    setHasPlayedText(true);
    speakWordOnly(activeChallenge.audioText);
  };

  const handleSelectOption = (option: string) => {
    if (isDone) return; // Locked once correct
    
    setSelectedOption(option);
    
    if (option === activeChallenge.answer) {
      // Correct!
      setIsIncorrect(false);
      setIsDone(true);
      onAddStar();
      onRecordHistory(activeChallenge.pair, 'correct');

      // Speak celebration standard voice
      speakWordOnly(`答对了！太棒啦！这是 ${activeChallenge.word}`);
    } else {
      // Incorrect!
      setIsIncorrect(true);
      onRecordError(activeChallenge.pair);
      onRecordHistory(activeChallenge.pair, 'incorrect');

      // Speak error standard voice
      speakWordOnly('不对哦，再小耳朵仔细听一次吧！');
    }
  };

  const handleNext = () => {
    if (currentIdx < CHALLENGES.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      // Reset to beginning or shuffle
      speakWordOnly('太棒了，完成所有易混音大挑战啦！');
      setCurrentIdx(0);
    }
  };

  const handleRetry = () => {
    setSelectedOption(null);
    setIsIncorrect(false);
    handlePlayWord();
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-12">
      {/* Level bar status */}
      <div className="flex items-center justify-between bg-white px-5 py-3 rounded-2xl border border-slate-100 shadow-sm">
        <span className="font-extrabold text-slate-700 flex items-center gap-1.5">
          <Ear className="text-purple-500" size={18} />
          <span>易混音大挑战</span>
        </span>
        <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
          关卡 {currentIdx + 1} / {CHALLENGES.length}
        </span>
      </div>

      {/* Challenge Play Arena */}
      <div className="bg-white rounded-3xl border-2 border-purple-100 shadow-sm p-6 sm:p-10 relative overflow-hidden">
        
        {/* Confetti Sparkles decor */}
        <div className="absolute top-4 right-4 text-purple-200">
          <Sparkles size={36} className="animate-pulse" />
        </div>

        {/* Level description */}
        <div className="text-center space-y-2 mb-8">
          <span className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-black tracking-widest">
            辨析对比：{activeChallenge.pair}
          </span>
          <h2 className="text-2xl font-black text-slate-800">
            听一听，这是哪个音？👂
          </h2>
          <p className="text-sm text-slate-400">点击“听听声音”后选择正确的拼音</p>
        </div>

        {/* Speaker play section */}
        <div className="flex flex-col items-center justify-center my-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlayWord}
            className={`w-28 h-28 rounded-full shadow-lg border-b-4 flex flex-col items-center justify-center transition-all focus:outline-none ${
              hasPlayedText
                ? 'bg-purple-100 text-purple-700 border-purple-300'
                : 'bg-purple-500 text-white border-purple-700 hover:bg-purple-600'
            }`}
          >
            <Volume2 size={38} className={hasPlayedText ? 'animate-bounce' : ''} />
            <span className="text-xs font-bold mt-1">听听声音</span>
          </motion.button>

          {/* Hidden/Revealed graphic support (only shown if they answer correctly) */}
          <AnimatePresence>
            {isDone ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.7, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 flex flex-col items-center p-3 bg-green-50 rounded-2xl border border-green-100 min-w-[200px]"
              >
                <span className="text-4xl shadow-sm bg-white p-2.5 rounded-full mb-1">
                  {activeChallenge.emoji}
                </span>
                <span className="text-xl font-bold text-slate-900">{activeChallenge.word}</span>
                <span className="text-xs font-bold text-slate-500 font-mono">拼音: {activeChallenge.pinyin}</span>
              </motion.div>
            ) : (
              <div className="h-[98px] mt-6 flex items-center justify-center text-slate-300 font-bold border-2 border-dashed border-slate-100 w-44 rounded-2xl">
                <span>答对后解锁魔法图 🪄</span>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Choices Area */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          {activeChallenge.options.map((option) => {
            const isSelected = selectedOption === option;
            const isCorrect = option === activeChallenge.answer;
            
            // Choose styles dynamically
            let btnClass = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300';
            let iconElement = null;

            if (isSelected) {
              if (isCorrect) {
                btnClass = 'bg-green-500 border-green-700 text-white shadow-green-200 shadow-md';
                iconElement = <CheckCircle size={20} fill="currentColor" className="text-green-600" />;
              } else {
                btnClass = 'bg-red-500 border-red-700 text-white animate-shake shadow-red-200 shadow-md';
                iconElement = <XCircle size={20} fill="currentColor" className="text-red-600" />;
              }
            } else if (isDone && isCorrect) {
              // Highlight the correct answer if they finished but had chosen wrong earlier or just to display success state
              btnClass = 'bg-green-100 border-green-200 text-green-800';
            }

            return (
              <motion.button
                key={option}
                whileTap={{ scale: 0.95 }}
                disabled={isDone && !isSelected}
                onClick={() => handleSelectOption(option)}
                className={`py-8 text-4xl font-black rounded-3xl border-2 shadow-sm flex items-center justify-center gap-2 transition-all transition-transform font-mono relative focus:outline-none ${btnClass}`}
              >
                <span>{option}</span>
                {iconElement && <span className="absolute top-3 right-3">{iconElement}</span>}
              </motion.button>
            );
          })}
        </div>

        {/* Feedback text alerts */}
        <div className="h-6 mt-4 text-center">
          {isDone && (
            <span className="text-green-600 font-bold text-sm flex items-center justify-center gap-1">
              🎉 太棒啦！得到 1 颗星星奖励！
            </span>
          )}
          {isIncorrect && !isDone && (
            <span className="text-red-500 font-bold text-sm flex items-center justify-center gap-1">
              ❌ 不正确哦，我们可以再多听几次~
            </span>
          )}
        </div>

        {/* Stage controls navigation */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex gap-3">
          {isIncorrect && !isDone && (
            <button
              onClick={handleRetry}
              className="flex-1 py-3 bg-amber-400 hover:bg-amber-500 active:scale-95 text-white font-bold rounded-2xl flex items-center justify-center gap-1.5 shadow border-b-4 border-amber-600 focus:outline-none"
            >
              <RotateCcw size={16} />
              <span>重新再听一次</span>
            </button>
          )}

          <button
            onClick={handleNext}
            disabled={!isDone && selectedOption !== null} // Wait till they hit correct before locking, OR if they haven't solved it allow continuing to avoid frustration
            className={`flex-1 py-4 text-base font-bold rounded-2xl flex items-center justify-center gap-1.5 shadow focus:outline-none ${
              isDone
                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-b-4 border-purple-700'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-500 border border-slate-200'
            }`}
          >
            <span>{isDone ? '下一关 👉' : '跳过去，下一关'}</span>
          </button>
        </div>

        <div className="mt-6 p-4 bg-purple-50/60 rounded-2xl border border-purple-100 text-xs text-purple-950 leading-relaxed">
          <span className="font-extrabold block text-purple-900 mb-1">💡 听到没声音？请检查：</span>
          <ul className="list-disc list-inside space-y-1 text-purple-950/90">
            <li><b>物理静音键</b>：请确认手机侧边的物理静音开关<b>没有</b>露出橙红色。</li>
            <li><b>点击喇叭播放</b>：请手动点击上方的紫粉色<b>“听听声音”</b>大按钮来触发播放。</li>
            <li>安装多媒体音量加到合适大小。或戴上耳机游玩。</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
