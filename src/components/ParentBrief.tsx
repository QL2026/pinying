import React from 'react';
import { 
  BarChart, TrendingUp, Star, ShieldAlert, BookOpen, 
  Trash2, Smile, ArrowRight 
} from 'lucide-react';
import { getHistory, getErrors, clearAllProgress } from '../utils/storage';

interface ParentBriefProps {
  stars: number;
  onResetAll: () => void;
  onNavigateToLetter: (type: 'initial' | 'final', letter: string) => void;
}

export const ParentBrief: React.FC<ParentBriefProps> = ({ stars, onResetAll, onNavigateToLetter }) => {
  const history = getHistory();
  const rawErrors = getErrors();

  // Convert raw errors map to a sorted array
  const sortedErrors = Object.entries(rawErrors)
    .map(([target, count]) => ({ target, count }))
    .sort((a, b) => b.count - a.count);

  // Group practice target lists (Initials vs Finals)
  const initialsPracticed = Array.from(
    new Set(
      history
        .filter((h) => h.type === 'initial' && h.status === 'completed')
        .map((h) => h.target)
    )
  ).slice(0, 8);

  const finalsPracticed = Array.from(
    new Set(
      history
        .filter((h) => h.type === 'final' && h.status === 'completed')
        .map((h) => h.target)
    )
  ).slice(0, 8);

  const totalChallengesAnswered = history.filter((h) => h.type === 'challenge').length;
  const challengeCorrects = history.filter((h) => h.type === 'challenge' && h.status === 'correct').length;
  const accuracyRate = totalChallengesAnswered > 0 
    ? Math.round((challengeCorrects / totalChallengesAnswered) * 100) 
    : 0;

  return (
    <div className="space-y-8 pb-12">
      {/* Overview Head block */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-500/10 text-teal-400 font-bold rounded-lg text-sm">
            <Smile size={16} />
            <span>家长控制中心与进度报表</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
            宝贝的学习情况简报 📊
          </h2>
          <p className="text-slate-400 text-sm max-w-xl">
            本页供家长查看。第一版致力于通过轻量数据反映孩子的“开口意愿、辨音习惯以及需要加强练习的声音组”。
          </p>
        </div>

        <button
          onClick={() => {
            if (confirm('确认要清除所有学习记录和星星吗？重新开始后，星星数将被设为0。')) {
              clearAllProgress();
              onResetAll();
            }
          }}
          className="px-4 py-2.5 bg-red-600/20 hover:bg-red-600/35 text-red-400 hover:text-red-300 font-bold rounded-xl text-xs transition-all border border-red-500/20 flex items-center gap-1.5 cursor-pointer"
        >
          <Trash2 size={14} />
          <span>重置练习进度</span>
        </button>
      </div>

      {/* Numerical Stats Bento */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Stat 1: Stars */}
        <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-amber-100 rounded-xl text-amber-600">
            <Star size={24} fill="currentColor" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-500">已获星星数</div>
            <div className="text-3xl font-black text-amber-950 font-display">{stars} 个</div>
          </div>
        </div>

        {/* Stat 2: Total Practices */}
        <div className="bg-indigo-50/50 border border-indigo-200 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-indigo-100 rounded-xl text-indigo-600">
            <BookOpen size={24} />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-500">累计跟读发音数</div>
            <div className="text-3xl font-black text-indigo-950 font-display">
              {history.filter((h) => h.status === 'completed').length} 次
            </div>
          </div>
        </div>

        {/* Stat 3: Challenge Accuracy */}
        <div className="bg-purple-50/50 border border-purple-200 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-purple-100 rounded-xl text-purple-600">
            <TrendingUp size={24} />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-500">听辨游戏正确率</div>
            <div className="text-3xl font-black text-purple-950 font-display">
              {totalChallengesAnswered > 0 ? `${accuracyRate}%` : '暂无挑战'}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Practiced list targets */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-6">
          <h3 className="font-extrabold text-slate-800 text-lg flex items-center gap-2 pb-3 border-b border-slate-100">
            <span>最近练习的声母韵母</span>
          </h3>

          <div className="space-y-4">
            {/* Initials and Finals list */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-md">
                声母部分 (Shengmu)
              </h4>
              {initialsPracticed.length > 0 ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  {initialsPracticed.map((letter) => (
                    <button
                      key={letter}
                      onClick={() => onNavigateToLetter('initial', letter)}
                      className="px-3 py-1.5 bg-slate-50 hover:bg-amber-100 hover:text-amber-950 text-slate-700 rounded-xl border border-slate-100 shadow-sm text-sm font-bold font-mono flex items-center gap-1 transition-all"
                    >
                      <span>{letter}</span>
                      <ArrowRight size={10} />
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic px-1 pt-1">暂无声母练习。请引导孩子在‘声母’栏目跟读。</p>
              )}
            </div>

            <div className="space-y-2 pt-3">
              <h4 className="text-xs font-bold text-sky-900 bg-sky-50 px-2.5 py-1 rounded-md">
                韵母部分 (Yunmu)
              </h4>
              {finalsPracticed.length > 0 ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  {finalsPracticed.map((letter) => (
                    <button
                      key={letter}
                      onClick={() => onNavigateToLetter('final', letter)}
                      className="px-3 py-1.5 bg-slate-50 hover:bg-sky-100 hover:text-sky-950 text-slate-700 rounded-xl border border-slate-100 shadow-sm text-sm font-bold font-mono flex items-center gap-1 transition-all"
                    >
                      <span>{letter}</span>
                      <ArrowRight size={10} />
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic px-1 pt-1">暂无韵母练习。请引导孩子在‘韵母’栏目跟读。</p>
              )}
            </div>
          </div>
        </div>

        {/* Errors Lists */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-6">
          <h3 className="font-extrabold text-slate-800 text-lg flex items-center gap-2 pb-3 border-b border-slate-100">
            <ShieldAlert size={20} className="text-red-500" />
            <span>听辨易错音分析</span>
          </h3>

          {sortedErrors.length > 0 ? (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">
                按答错次数高到低排序，下述字母组合极具听音淆混可能，可重点加强专项辨音跟读练习：
              </p>
              <div className="divide-y divide-slate-50">
                {sortedErrors.map(({ target, count }) => (
                  <div key={target} className="flex items-center justify-between py-2.5">
                    <span className="font-mono font-extrabold text-slate-700">{target} 拼音对比组</span>
                    <span className="text-xs font-bold text-red-500 bg-red-50 px-2.5 py-1 rounded-full border border-red-100">
                      答错 {count} 次
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-44 flex flex-col items-center justify-center text-slate-400 border border-dashed border-slate-100 rounded-xl p-4 text-center">
              <span className="text-2xl mb-1">⭐</span>
              <p className="text-sm font-bold text-slate-600">目前暂无经常错音记录</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs leading-relaxed">
                每次进行易混音挑战时，如果答错会被记录，以便您可以指导孩子重复训练。
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Parental guidance cards */}
      <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl p-6 border border-teal-100 shadow-sm space-y-3">
        <h3 className="font-extrabold text-teal-950 font-display text-base">
          💡 家长引导小课堂（如何居家辅助练习）：
        </h3>
        
        <ul className="space-y-2 text-sm text-teal-900/85 font-medium leading-relaxed list-disc list-inside">
          <li>
            <strong className="text-teal-950">平翘舌和唇齿分辩：</strong> 如果孩子在 <span className="underline">zh/ch/sh</span> 或者是 <span className="underline">b/p/m</span> 上出错，可以用大夸张的嘴型在他面前示范，鼓励孩子仔细看爸爸妈妈的嘴唇闭合或者舌头的位置变化。
          </li>
          <li>
            <strong className="text-teal-950">创造轻松的大氛围：</strong> 针对 4-7 岁的幼童，不要过度强调“读错了/不对”，而是用“老师想再听一次可爱的小声音”、“多拿一个大星星给妈妈看看”等方式进行柔性引导。
          </li>
          <li>
            <strong className="text-teal-950">录音回放极具效果：</strong> 充分使用功能里的“重放我的声音”按钮，让孩子听一听大喇叭念的标准音，再听听自己读的，引导孩子自己感知到它们声音的长短和爆破音的区别。
          </li>
        </ul>
      </div>
    </div>
  );
};
