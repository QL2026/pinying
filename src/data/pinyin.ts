import { PinyinGroup, ChallengeItem } from '../types';

export const INITIALS_GROUPS: PinyinGroup[] = [
  {
    id: 'shengmu-1',
    name: '双唇音与唇齿音 (b p m f)',
    items: [
      {
        pinyin: 'b',
        speechKey: '玻',
        examples: [
          { word: '爸爸', pinyin: 'bàba', emoji: '👨' },
          { word: '杯子', pinyin: 'bēizi', emoji: '🥛' },
        ],
      },
      {
        pinyin: 'p',
        speechKey: '坡',
        examples: [
          { word: '苹果', pinyin: 'píngguǒ', emoji: '🍎' },
          { word: '泡泡', pinyin: 'pàopao', emoji: '🫧' },
        ],
      },
      {
        pinyin: 'm',
        speechKey: '摸',
        examples: [
          { word: '猫咪', pinyin: 'māomī', emoji: '🐱' },
          { word: '面包', pinyin: 'miànbāo', emoji: '🍞' },
        ],
      },
      {
        pinyin: 'f',
        speechKey: '佛',
        examples: [
          { word: '飞机', pinyin: 'fēijī', emoji: '✈️' },
          { word: '风筝', pinyin: 'fēngzhēng', emoji: '🪁' },
        ],
      },
    ],
  },
  {
    id: 'shengmu-2',
    name: '舌尖中音 (d t n l)',
    items: [
      {
        pinyin: 'd',
        speechKey: '得',
        examples: [
          { word: '蛋糕', pinyin: 'dàngāo', emoji: '🎂' },
          { word: '电脑', pinyin: 'diànnǎo', emoji: '💻' },
        ],
      },
      {
        pinyin: 't',
        speechKey: '特',
        examples: [
          { word: '兔子', pinyin: 'tùzi', emoji: '🐰' },
          { word: '太阳', pinyin: 'tàiyáng', emoji: '☀️' },
        ],
      },
      {
        pinyin: 'n',
        speechKey: '讷',
        examples: [
          { word: '牛奶', pinyin: 'niúnǎi', emoji: '🥛' },
          { word: '鸟儿', pinyin: 'niǎo\'er', emoji: '🐦' },
        ],
      },
      {
        pinyin: 'l',
        speechKey: '勒',
        examples: [
          { word: '梨子', pinyin: 'lízi', emoji: '🍐' },
          { word: '铃铛', pinyin: 'língdāng', emoji: '🔔' },
        ],
      },
    ],
  },
  {
    id: 'shengmu-3',
    name: '舌根音 (g k h)',
    items: [
      {
        pinyin: 'g',
        speechKey: '哥',
        examples: [
          { word: '公鸡', pinyin: 'gōngjī', emoji: '🐓' },
          { word: '西瓜', pinyin: 'xīguā', emoji: '🍉' },
        ],
      },
      {
        pinyin: 'k',
        speechKey: '科',
        examples: [
          { word: '恐龙', pinyin: 'kǒnglóng', emoji: '🦖' },
          { word: '裤子', pinyin: 'kùzi', emoji: '👖' },
        ],
      },
      {
        pinyin: 'h',
        speechKey: '喝',
        examples: [
          { word: '河马', pinyin: 'hémǎ', emoji: '🦛' },
          { word: '花朵', pinyin: 'huāduǒ', emoji: '🌸' },
        ],
      },
    ],
  },
  {
    id: 'shengmu-4',
    name: '舌面音 (j q x)',
    items: [
      {
        pinyin: 'j',
        speechKey: '鸡',
        examples: [
          { word: '小鸡', pinyin: 'xiǎojī', emoji: '🐥' },
          { word: '橘子', pinyin: 'júzi', emoji: '🍊' },
        ],
      },
      {
        pinyin: 'q',
        speechKey: '七',
        examples: [
          { word: '气球', pinyin: 'qìqiú', emoji: '🎈' },
          { word: '裙子', pinyin: 'qúnzi', emoji: '👗' },
        ],
      },
      {
        pinyin: 'x',
        speechKey: '西',
        examples: [
          { word: '西瓜', pinyin: 'xīguā', emoji: '🍉' },
          { word: '香蕉', pinyin: 'xiāngjiāo', emoji: '🍌' },
        ],
      },
    ],
  },
  {
    id: 'shengmu-5',
    name: '翘舌音 (zh ch sh r)',
    items: [
      {
        pinyin: 'zh',
        speechKey: '知',
        examples: [
          { word: '蜘蛛', pinyin: 'zhīzhū', emoji: '🕷️' },
          { word: '竹子', pinyin: 'zhúzi', emoji: '🎋' },
        ],
      },
      {
        pinyin: 'ch',
        speechKey: '吃',
        examples: [
          { word: '汽车', pinyin: 'qìchē', emoji: '🚗' },
          { word: '城堡', pinyin: 'chéngbǎo', emoji: '🏰' },
        ],
      },
      {
        pinyin: 'sh',
        speechKey: '狮',
        examples: [
          { word: '狮子', pinyin: 'shīzi', emoji: '🦁' },
          { word: '树叶', pinyin: 'shùyè', emoji: '🍃' },
        ],
      },
      {
        pinyin: 'r',
        speechKey: '日',
        examples: [
          { word: '日历', pinyin: 'rìlì', emoji: '📅' },
          { word: '热水', pinyin: 'rèshuǐ', emoji: '♨️' },
        ],
      },
    ],
  },
  {
    id: 'shengmu-6',
    name: '平舌音 (z c s)',
    items: [
      {
        pinyin: 'z',
        speechKey: '资',
        examples: [
          { word: '字母', pinyin: 'zìmǔ', emoji: '🔤' },
          { word: '自行车', pinyin: 'zìxíngchē', emoji: '🚲' },
        ],
      },
      {
        pinyin: 'c',
        speechKey: '雌',
        examples: [
          { word: '草莓', pinyin: 'cǎoméi', emoji: '🍓' },
          { word: '磁铁', pinyin: 'cítiě', emoji: '🧲' },
        ],
      },
      {
        pinyin: 's',
        speechKey: '思',
        examples: [
          { word: '森林', pinyin: 'sēnlín', emoji: '🌲' },
          { word: '雨伞', pinyin: 'yǔsǎn', emoji: '🌂' },
        ],
      },
    ],
  },
];

export const FINALS_GROUPS: PinyinGroup[] = [
  {
    id: 'yunmu-1',
    name: '单韵母 (a o e i u ü)',
    items: [
      {
        pinyin: 'a',
        speechKey: '啊',
        examples: [
          { word: '鸭子', pinyin: 'yāzi', emoji: '🦆' },
          { word: '卡车', pinyin: 'kǎchē', emoji: '🚚' },
        ],
      },
      {
        pinyin: 'o',
        speechKey: '噢',
        examples: [
          { word: '山窝', pinyin: 'shānwō', emoji: '🪹' },
          { word: '菠萝', pinyin: 'bōluó', emoji: '🍍' },
        ],
      },
      {
        pinyin: 'e',
        speechKey: '额',
        examples: [
          { word: '白鹅', pinyin: 'bái\'é', emoji: '🦢' },
          { word: '小车', pinyin: 'xiǎochē', emoji: '🚗' },
        ],
      },
      {
        pinyin: 'i',
        speechKey: '衣',
        examples: [
          { word: '衣服', pinyin: 'yīfú', emoji: '👚' },
          { word: '铅笔', pinyin: 'qiānbǐ', emoji: '✏️' },
        ],
      },
      {
        pinyin: 'u',
        speechKey: '乌',
        examples: [
          { word: '鹦鹉', pinyin: 'yīngwǔ', emoji: '🦜' },
          { word: '大树', pinyin: 'dàshù', emoji: '🌳' },
        ],
      },
      {
        pinyin: 'ü',
        speechKey: '迂',
        examples: [
          { word: '金鱼', pinyin: 'jīnyú', emoji: '🐟' },
          { word: '雨伞', pinyin: 'yǔsǎn', emoji: '🌂' },
        ],
      },
    ],
  },
  {
    id: 'yunmu-2',
    name: '复韵母 (ai ei ui ao ou iu ie üe er)',
    items: [
      {
        pinyin: 'ai',
        speechKey: '哀',
        examples: [
          { word: '白菜', pinyin: 'báicài', emoji: '🥬' },
          { word: '爱心', pinyin: 'àixīn', emoji: '❤️' },
        ],
      },
      {
        pinyin: 'ei',
        speechKey: '诶',
        examples: [
          { word: '贝壳', pinyin: 'bèiké', emoji: '🐚' },
          { word: '雷雨', pinyin: 'léiyǔ', emoji: '⛈️' },
        ],
      },
      {
        pinyin: 'ui',
        speechKey: '威',
        examples: [
          { word: '海龟', pinyin: 'hǎiguī', emoji: '🐢' },
          { word: '吹风', pinyin: 'chuīfēng', emoji: '🌬️' },
        ],
      },
      {
        pinyin: 'ao',
        speechKey: '熬',
        examples: [
          { word: '猫咪', pinyin: 'māomī', emoji: '🐱' },
          { word: '面包', pinyin: 'miànbāo', emoji: '🍞' },
        ],
      },
      {
        pinyin: 'ou',
        speechKey: '欧',
        examples: [
          { word: '猴子', pinyin: 'hóuzi', emoji: '🐒' },
          { word: '小狗', pinyin: 'xiǎogǒu', emoji: '🐕' },
        ],
      },
      {
        pinyin: 'iu',
        speechKey: '优',
        examples: [
          { word: '气球', pinyin: 'qìqiú', emoji: '🎈' },
          { word: '柳树', pinyin: 'liǔshù', emoji: '🌳' },
        ],
      },
      {
        pinyin: 'ie',
        speechKey: '椰',
        examples: [
          { word: '椰子', pinyin: 'yēzi', emoji: '🥥' },
          { word: '蝴蝶', pinyin: 'húdié', emoji: '🦋' },
        ],
      },
      {
        pinyin: 'üe',
        speechKey: '约',
        examples: [
          { word: '月亮', pinyin: 'yuèliàng', emoji: '🌙' },
          { word: '雪人', pinyin: 'xuěrén', emoji: '⛄' },
        ],
      },
      {
        pinyin: 'er',
        speechKey: '儿',
        examples: [
          { word: '耳朵', pinyin: 'ěrduo', emoji: '👂' },
          { word: '儿子', pinyin: 'érzi', emoji: '👦' },
        ],
      },
    ],
  },
];

export const CHALLENGES: ChallengeItem[] = [
  // b / p
  {
    id: 'ch-bp-1',
    pair: 'b / p',
    word: '爸爸',
    pinyin: 'bàba',
    emoji: '👨',
    audioText: '爸爸',
    options: ['b', 'p'],
    answer: 'b',
  },
  {
    id: 'ch-bp-2',
    pair: 'b / p',
    word: '泡泡',
    pinyin: 'pàopao',
    emoji: '🫧',
    audioText: '泡泡',
    options: ['b', 'p'],
    answer: 'p',
  },
  {
    id: 'ch-bp-3',
    pair: 'b / p',
    word: '苹果',
    pinyin: 'píngguǒ',
    emoji: '🍎',
    audioText: '苹果',
    options: ['b', 'p'],
    answer: 'p',
  },
  {
    id: 'ch-bp-4',
    pair: 'b / p',
    word: '杯子',
    pinyin: 'bēizi',
    emoji: '🥛',
    audioText: '杯子',
    options: ['b', 'p'],
    answer: 'b',
  },

  // d / t
  {
    id: 'ch-dt-1',
    pair: 'd / t',
    word: '蛋糕',
    pinyin: 'dàngāo',
    emoji: '🎂',
    audioText: '蛋糕',
    options: ['d', 't'],
    answer: 'd',
  },
  {
    id: 'ch-dt-2',
    pair: 'd / t',
    word: '太阳',
    pinyin: 'tàiyáng',
    emoji: '☀️',
    audioText: '太阳',
    options: ['d', 't'],
    answer: 't',
  },
  {
    id: 'ch-dt-3',
    pair: 'd / t',
    word: '大象',
    pinyin: 'dàxiàng',
    emoji: '🐘',
    audioText: '大象',
    options: ['d', 't'],
    answer: 'd',
  },
  {
    id: 'ch-dt-4',
    pair: 'd / t',
    word: '兔子',
    pinyin: 'tùzi',
    emoji: '🐰',
    audioText: '兔子',
    options: ['d', 't'],
    answer: 't',
  },

  // n / l
  {
    id: 'ch-nl-1',
    pair: 'n / l',
    word: '牛奶',
    pinyin: 'niúnǎi',
    emoji: '🥛',
    audioText: '牛奶',
    options: ['n', 'l'],
    answer: 'n',
  },
  {
    id: 'ch-nl-2',
    pair: 'n / l',
    word: '梨子',
    pinyin: 'lízi',
    emoji: '🍐',
    audioText: '梨子',
    options: ['n', 'l'],
    answer: 'l',
  },
  {
    id: 'ch-nl-3',
    pair: 'n / l',
    word: '鸟儿',
    pinyin: 'niǎo\'er',
    emoji: '🐦',
    audioText: '鸟儿',
    options: ['n', 'l'],
    answer: 'n',
  },
  {
    id: 'ch-nl-4',
    pair: 'n / l',
    word: '铃铛',
    pinyin: 'língdāng',
    emoji: '🔔',
    audioText: '铃铛',
    options: ['n', 'l'],
    answer: 'l',
  },

  // z / zh
  {
    id: 'ch-zzh-1',
    pair: 'z / zh',
    word: '字母',
    pinyin: 'zìmǔ',
    emoji: '🔤',
    audioText: '字母',
    options: ['z', 'zh'],
    answer: 'z',
  },
  {
    id: 'ch-zzh-2',
    pair: 'z / zh',
    word: '蜘蛛',
    pinyin: 'zhīzhū',
    emoji: '🕷️',
    audioText: '蜘蛛',
    options: ['z', 'zh'],
    answer: 'zh',
  },
  {
    id: 'ch-zzh-3',
    pair: 'z / zh',
    word: '自行车',
    pinyin: 'zìxíngchē',
    emoji: '🚲',
    audioText: '自行车',
    options: ['z', 'zh'],
    answer: 'z',
  },
  {
    id: 'ch-zzh-4',
    pair: 'z / zh',
    word: '竹子',
    pinyin: 'zhúzi',
    emoji: '🎋',
    audioText: '竹子',
    options: ['z', 'zh'],
    answer: 'zh',
  },

  // c / ch
  {
    id: 'ch-cch-1',
    pair: 'c / ch',
    word: '草莓',
    pinyin: 'cǎoméi',
    emoji: '🍓',
    audioText: '草莓',
    options: ['c', 'ch'],
    answer: 'c',
  },
  {
    id: 'ch-cch-2',
    pair: 'c / ch',
    word: '汽车',
    pinyin: 'qìchē',
    emoji: '🚗',
    audioText: '汽车',
    options: ['c', 'ch'],
    answer: 'ch',
  },
  {
    id: 'ch-cch-3',
    pair: 'c / ch',
    word: '磁铁',
    pinyin: 'cítiě',
    emoji: '🧲',
    audioText: '磁铁',
    options: ['c', 'ch'],
    answer: 'c',
  },
  {
    id: 'ch-cch-4',
    pair: 'c / ch',
    word: '城堡',
    pinyin: 'chéngbǎo',
    emoji: '🏰',
    audioText: '城堡',
    options: ['c', 'ch'],
    answer: 'ch',
  },

  // s / sh
  {
    id: 'ch-ssh-1',
    pair: 's / sh',
    word: '雨伞',
    pinyin: 'yǔsǎn',
    emoji: '🌂',
    audioText: '雨伞',
    options: ['s', 'sh'],
    answer: 's',
  },
  {
    id: 'ch-ssh-2',
    pair: 's / sh',
    word: '狮子',
    pinyin: 'shīzi',
    emoji: '🦁',
    audioText: '狮子',
    options: ['s', 'sh'],
    answer: 'sh',
  },
  {
    id: 'ch-ssh-3',
    pair: 's / sh',
    word: '森林',
    pinyin: 'sēnlín',
    emoji: '🌲',
    audioText: '森林',
    options: ['s', 'sh'],
    answer: 's',
  },
  {
    id: 'ch-ssh-4',
    pair: 's / sh',
    word: '树叶',
    pinyin: 'shùyè',
    emoji: '🍃',
    audioText: '树叶',
    options: ['s', 'sh'],
    answer: 'sh',
  },

  // in / ing
  {
    id: 'ch-eining-1',
    pair: 'in / ing',
    word: '写信',
    pinyin: 'xiěxìn',
    emoji: '✉️',
    audioText: '拼音 信号的信',
    options: ['in', 'ing'],
    answer: 'in',
  },
  {
    id: 'ch-eining-2',
    pair: 'in / ing',
    word: '星星',
    pinyin: 'xīngxing',
    emoji: '⭐',
    audioText: '星星',
    options: ['in', 'ing'],
    answer: 'ing',
  },
  {
    id: 'ch-eining-3',
    pair: 'in / ing',
    word: '铃铛',
    pinyin: 'língdāng',
    emoji: '🔔',
    audioText: '铃铛的铃',
    options: ['in', 'ing'],
    answer: 'ing',
  },
  {
    id: 'ch-eining-4',
    pair: 'in / ing',
    word: '森林',
    pinyin: 'sēnlín',
    emoji: '🌲',
    audioText: '森林的林',
    options: ['in', 'ing'],
    answer: 'in',
  },

  // en / eng
  {
    id: 'ch-eneng-1',
    pair: 'en / eng',
    word: '森林',
    pinyin: 'sēnlín',
    emoji: '🌲',
    audioText: '森林的森',
    options: ['en', 'eng'],
    answer: 'en',
  },
  {
    id: 'ch-eneng-2',
    pair: 'en / eng',
    word: '风筝',
    pinyin: 'fēngzhēng',
    emoji: '🪁',
    audioText: '风筝的风',
    options: ['en', 'eng'],
    answer: 'eng',
  },
  {
    id: 'ch-eneng-3',
    pair: 'en / eng',
    word: '敲门',
    pinyin: 'qiāomén',
    emoji: '🚪',
    audioText: '敲门的门',
    options: ['en', 'eng'],
    answer: 'en',
  },
  {
    id: 'ch-eneng-4',
    pair: 'en / eng',
    word: '台灯',
    pinyin: 'táidēng',
    emoji: '💡',
    audioText: '台灯的灯',
    options: ['en', 'eng'],
    answer: 'eng',
  },
];
