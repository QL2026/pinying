import React from 'react';
import { motion } from 'motion/react';
import { Star, Ear, BookOpen, Sparkles, Smile, Speech } from 'lucide-react';
import { speakText } from '../utils/speech';

interface HomeProps {
  stars: number;
  onNavigate: (tab: 'home' | 'initials' | 'finals' | 'challenges' | 'parents') => void;
  onStartSpecificPractice: (type: 'initial' | 'final', letter: string) => void;
}

export const Home: React.FC<HomeProps> = ({ stars, onNavigate, onStartSpecificPractice }) => {
  // Let voice greet children
  const handleVoiceWelcome = () => {
    speakText('小朋友，你好呀！今天想和老师一起练习哪些拼音呢？我们来开始快乐的学习吧！');
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Banner / Greeting */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-teal-50 to-green-50 p-6 sm:p-8 rounded-3xl border-2 border-indigo-100 shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-indigo-100/80 px-4 py-1.5 rounded-full text-indigo-700 font-bold text-sm">
              <Smile size={16} fill="currentColor" />
              <span>幼小衔接 拼音好帮手</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-950 font-display flex items-center justify-center md:justify-start gap-2">
              拼音发音畅乐园 🎈
            </h1>
            <p className="text-indigo-900/80 font-medium text-base sm:text-lg max-w-md">
              听听标准音、自己读一读、连连耳朵大挑战，让发音标准又好听！
            </p>
            <div className="pt-2">
              <button
                onClick={handleVoiceWelcome}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 active:scale-95 transition-all text-white font-bold rounded-2xl shadow-md border-b-4 border-indigo-700"
              >
                <Speech size={20} />
                听听打招呼 🎧
              </button>
            </div>
          </div>

          {/* Stars Tally Badge */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center justify-center p-6 bg-yellow-100 border-4 border-yellow-300 rounded-3xl shadow-md min-w-[160px] cursor-pointer"
            onClick={() => speakText(`你今天已经得到了 ${stars} 颗小星星，真优秀！继续努力吧`)}
          >
            <span className="text-sm font-extrabold text-amber-800 uppercase tracking-wider mb-1">
              今日奖章 ⭐
            </span>
            <div className="flex items-center gap-1.5 my-1 text-yellow-500">
              <Star size={36} fill="currentColor" className="stroke-amber-600 stroke-[1.5]" />
              <span className="text-4xl font-extrabold text-amber-900 font-display">{stars}</span>
            </div>
            <span className="text-xs text-amber-800/80 font-medium mt-1">小星星数量</span>
          </motion.div>
        </div>

        {/* Backdrop blob decors */}
        <div className="absolute top-0 right-1/4 w-32 h-32 bg-indigo-200/20 rounded-full filter blur-xl transform translate-x-10 -translate-y-10"></div>
        <div className="absolute bottom-0 left-10 w-24 h-24 bg-green-200/20 rounded-full filter blur-lg"></div>
      </div>

      {/* Suggested Daily Practice (今日练习) */}
      <div className="bg-white p-6 rounded-3xl border-2 border-orange-100 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-orange-950 flex items-center gap-2">
          <span className="p-1.5 bg-orange-100 rounded-lg text-orange-600">
            <Sparkles size={20} fill="currentColor" />
          </span>
          今日推荐练习 🎯
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Practice Initial Sg-1 */}
          <div className="flex items-center justify-between p-4 bg-orange-50/70 border border-orange-100 rounded-2xl">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-black text-orange-600 font-mono bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-inner border border-orange-100">
                b
              </span>
              <div>
                <h3 className="font-bold text-orange-950 text-base">声母推荐</h3>
                <p className="text-sm text-orange-900/75">例词：爸爸 👨、杯子 🥛</p>
              </div>
            </div>
            <button
              onClick={() => onStartSpecificPractice('initial', 'b')}
              className="px-4 py-2 bg-orange-400 hover:bg-orange-500 text-white font-bold rounded-xl text-sm transition-all shadow-sm"
            >
              去练练 👉
            </button>
          </div>

          {/* Practice Final Yg-1 */}
          <div className="flex items-center justify-between p-4 bg-teal-50/70 border border-teal-100 rounded-2xl">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-black text-teal-600 font-mono bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-inner border border-teal-100">
                a
              </span>
              <div>
                <h3 className="font-bold text-teal-950 text-base">韵母推荐</h3>
                <p className="text-sm text-teal-900/75">例词：鸭子 🦆、卡车 🚚</p>
              </div>
            </div>
            <button
              onClick={() => onStartSpecificPractice('final', 'a')}
              className="px-4 py-2 bg-teal-400 hover:bg-teal-500 text-white font-bold rounded-xl text-sm transition-all shadow-sm"
            >
              去练练 👉
            </button>
          </div>
        </div>
      </div>

      {/* Main Mode Portals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Module 1: Initials */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => onNavigate('initials')}
          className="bg-yellow-50/60 border-2 border-yellow-100 hover:border-yellow-300 transition-all p-6 rounded-3xl shadow-sm cursor-pointer flex flex-col justify-between group space-y-6"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center text-yellow-600">
              <BookOpen size={28} className="stroke-[1.75]" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-amber-950 group-hover:text-yellow-600 transition-colors">
                声母大训练 🎙️
              </h3>
              <p className="text-sm text-amber-900/80 leading-relaxed">
                练习双唇音、舌尖音、平翘舌音等23个主要声母的发音和跟读
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['b', 'p', 'm', 'f', 'd', 't', '...'].map((letter) => (
                <span key={letter} className="px-2 py-0.5 bg-white text-xs font-bold text-amber-800 rounded-md border border-yellow-200 font-mono">
                  {letter}
                </span>
              ))}
            </div>
          </div>
          <div className="w-full text-center py-3 bg-yellow-400 hover:bg-yellow-500 transition-colors text-white font-bold rounded-2xl shadow-sm text-base">
            开始声母练习 🚀
          </div>
        </motion.div>

        {/* Module 2: Finals */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => onNavigate('finals')}
          className="bg-sky-50/60 border-2 border-sky-100 hover:border-sky-300 transition-all p-6 rounded-3xl shadow-sm cursor-pointer flex flex-col justify-between group space-y-6"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center text-sky-600">
              <Ear size={28} className="stroke-[1.75]" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-sky-950 group-hover:text-sky-600 transition-colors">
                韵母开心读 🎵
              </h3>
              <p className="text-sm text-sky-900/80 leading-relaxed">
                拼音核心：进行单韵母以及常见复韵母（双重元音）的发音大冲关
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['a', 'o', 'e', 'i', 'u', 'ü', '...'].map((letter) => (
                <span key={letter} className="px-2 py-0.5 bg-white text-xs font-bold text-sky-800 rounded-md border border-sky-200 font-mono">
                  {letter}
                </span>
              ))}
            </div>
          </div>
          <div className="w-full text-center py-3 bg-sky-400 hover:bg-sky-500 transition-colors text-white font-bold rounded-2xl shadow-sm text-base">
            开始韵母练习 🚀
          </div>
        </motion.div>

        {/* Module 3: Challenges */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => onNavigate('challenges')}
          className="bg-purple-50/60 border-2 border-purple-100 hover:border-purple-300 transition-all p-6 rounded-3xl shadow-sm cursor-pointer flex flex-col justify-between group space-y-6"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600">
              <Star size={28} className="stroke-[1.75]" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-purple-950 group-hover:text-purple-600 transition-colors">
                易混音挑战 🛡️
              </h3>
              <p className="text-sm text-purple-900/80 leading-relaxed">
                听觉辨析：听一听，分清 b/p、d/t、n/l、前鼻音与后鼻音的区别吧
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['b/p', 'd/t', 'n/l', 'z/zh', 'in/ing'].map((letter) => (
                <span key={letter} className="px-2 py-0.5 bg-white text-xs font-bold text-purple-800 rounded-md border border-purple-200 font-mono">
                  {letter}
                </span>
              ))}
            </div>
          </div>
          <div className="w-full text-center py-3 bg-purple-500 hover:bg-purple-600 transition-colors text-white font-bold rounded-2xl shadow-sm text-base">
            小朋友，来挑战 🎮
          </div>
        </motion.div>
      </div>

      {/* Parental guidance tip */}
      <div className="text-center text-xs text-slate-400 mt-6 max-w-md mx-auto">
        提示：本软件旨在帮助儿童进行发音听写练习，为幼小衔接提供辅助拼音跟学工具，无诊断或矫正发音障碍功能。
      </div>
    </div>
  );
};
