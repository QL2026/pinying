let currentUtterance: SpeechSynthesisUtterance | null = null;

/**
 * Stop any current speech synthesis
 */
export function stopSpeech() {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Get a friendly Chinese voice if available
 */
function getChineseVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  
  // Try to find a standard Chinese (Mandarin/Simplified) voice
  const preferredLocales = ['zh-CN', 'zh-SG', 'zh-Hans', 'zh'];
  for (const locale of preferredLocales) {
    const voice = voices.find((v) => v.lang.toLowerCase().includes(locale.toLowerCase()));
    if (voice) return voice;
  }
  
  // Fallback to any voice with "zh"
  return voices.find((v) => v.lang.toLowerCase().includes('zh')) || null;
}

/**
 * Speak text using SpeechSynthesis
 */
export function speakText(text: string, onEnd?: () => void, slow = false): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      console.warn('SpeechSynthesis is not supported in this browser.');
      onEnd?.();
      resolve();
      return;
    }

    stopSpeech();

    const utterance = new SpeechSynthesisUtterance(text);
    const chineseVoice = getChineseVoice();
    
    if (chineseVoice) {
      utterance.voice = chineseVoice;
    }
    utterance.lang = 'zh-CN';
    utterance.rate = slow ? 0.65 : 0.8; // Children-friendly slightly slower speech rate
    utterance.pitch = 1.15; // Slightly cute, high-pitched child-friendly tone

    utterance.onend = () => {
      onEnd?.();
      resolve();
    };

    utterance.onerror = (e) => {
      console.error('Speech synthesis error:', e);
      onEnd?.();
      resolve();
    };

    currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
    
    // A bug in some browsers halts SpeechSynthesis if we don't trigger the voice list loading
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  });
}

/**
 * Speaks a single pinyin letter and its matching tutorial word
 */
export function speakPinyinTutorial(pinyin: string, keyword: string, doneCallback?: () => void) {
  // Let's speak: "拼音 [keyword] [keyword], [example word]"
  // This helps the child grasp the sound of the initial/final!
  const textToRead = `${keyword}, 拼音 ${keyword}, ${pinyin}`;
  speakText(textToRead, doneCallback, true);
}

/**
 * Speaks a word only
 */
export function speakWordOnly(word: string, doneCallback?: () => void) {
  speakText(word, doneCallback, false);
}
export function speakDemoSentence(pinyin: string, keyword: string, word: string, doneCallback?: () => void) {
  const text = `${pinyin}, ${keyword}! ${word} 的 ${pinyin}`;
  speakText(text, doneCallback, true);
}
