import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Sparkles, Award } from 'lucide-react';
import { speakText } from '../utils/speech';

interface RewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  starsCount: number;
}

export const RewardModal: React.FC<RewardModalProps> = ({ isOpen, onClose, starsCount }) => {
  useEffect(() => {
    if (isOpen) {
      // Play a verbal cue to celebrate!
      speakText('太棒啦！今天的小耳朵很灵！你真棒！继续加油哦！');
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-full max-w-md p-8 overflow-hidden text-center bg-gradient-to-br from-yellow-50 to-orange-100 rounded-3xl shadow-2xl border-4 border-yellow-300"
          >
            {/* Ambient sparkles background */}
            <div className="absolute top-4 left-4 text-yellow-500 animate-bounce">
              <Sparkles size={24} />
            </div>
            <div className="absolute bottom-4 right-4 text-orange-500 animate-pulse">
              <Sparkles size={24} />
            </div>

            {/* Icon Header */}
            <motion.div
              initial={{ rotate: -15, scale: 0.5 }}
              animate={{ rotate: 0, scale: [1, 1.2, 1] }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center justify-center w-24 h-24 mb-4 bg-yellow-400 rounded-full shadow-lg text-white"
            >
              <Award size={56} className="stroke-[1.5]" />
            </motion.div>

            {/* Title */}
            <h2 id="star-reward-title" className="text-3xl font-bold text-orange-700 tracking-wide mb-2 font-display">
              太棒啦！🎉
            </h2>
            
            {/* Encouragement text */}
            <p className="text-lg text-amber-900 font-medium leading-relaxed mb-6">
              “今天的小耳朵很灵哦！你已经得到了 <span className="text-2xl font-extrabold text-orange-600 px-1">{starsCount}</span> 颗小星星了！”
            </p>

            {/* Group of animated stars */}
            <div className="flex justify-center gap-3 mb-8">
              {[0, 1, 2, 3, 4].map((index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0, scale: [1, 1.3, 1] }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                  className="text-yellow-400 drop-shadow-md"
                >
                  <Star size={36} fill="currentColor" className="stroke-amber-600 stroke-[1.5]" />
                </motion.div>
              ))}
            </div>

            {/* Action button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="w-full py-4 text-xl font-bold text-white bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl shadow-lg border-b-4 border-orange-700 focus:outline-none"
            >
              继续加油 🌟
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
