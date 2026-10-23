/* =====================================================================
 *  ДАННЫЕ ПОРТФОЛИО САБИНЫ
 * ===================================================================== */

/* ---------- ТИПЫ (их трогать не нужно) ---------- */
export type PortfolioCase = {
  id: string
  title: string
  cover: string
  subtitle: string
  description: string
  images: string[]
}

export type PortfolioFolder = {
  id: string
  name: string
  cases: PortfolioCase[]
}

export type DesktopPhoto = {
  id: string
  name: string
  src: string
  description: string
}

/* =====================================================================
 *  1. ОБО МНЕ (окно «Системные настройки»)
 * ===================================================================== */
export const profile = {
  /** Имя и фамилия */
  name: 'Сабина Мукосей',
  /** Строчка прямо под именем (сделали её информативной, чтобы разгрузить таблицу ниже) */
  role: 'Graphic Designer · 5+ лет опыта',
  /** Аватарка (положи свою фотку в папку public/portfolio и напиши тут её имя) */
  avatar: '/portfolio/sabina.jpeg',
  /** Строка «О себе» (теперь компактная и аккуратно смотрится в плашке) */
  about:
    'За спиной 4 года фриланса и опыт полного ведения визуала компании: от карточек товаров до упаковки, макетов ежедневников и гравировок на флешки.',
  /** Строка «Стек и программы» */
  stack: 'Figma, Illustrator, Photoshop, InDesign, AI tools',
  /** Строка «Статус» */
  status: 'Свободна для проектов',
  /** Ссылка на Telegram */
  telegramUrl: 'https://t.me/hlashj',
  /** Текст на синей кнопке */
  telegramButton: 'Написать в Telegram',
}

/* =====================================================================
 *  2. ИКОНКИ
 *  Если захочешь заменить любую иконку на свою — просто закинь PNG-файл
 *  в папку public/portfolio (например, my-folder.png) и напиши тут:
 *  folder: '/portfolio/my-folder.png',
 * ===================================================================== */
export const icons = {
  folder: '/portfolio/folder.png',
  finder: '/portfolio/finder.png',
  safari: '/portfolio/safari.png',
  settings: '/portfolio/settings.png',
  telegram: '/portfolio/telegram.png',
  trash: '/portfolio/trash.png',
}

/* =====================================================================
 *  3. ОБОИ РАБОЧЕГО СТОЛА
 * ===================================================================== */
export const wallpaper =
  'https://raw.githubusercontent.com/Sabinunap/portfolio-/953d5ead5affe2657dcfb68546f13d453324d168/vv.JPG'

/* =====================================================================
 *  4. ПАПКИ И КЕЙСЫ НА РАБОЧЕМ СТОЛЕ
 * ===================================================================== */
export const folders: PortfolioFolder[] = [
  // ==================== ПАПКА 1: УПАКОВКА ====================
  {
    id: 'packaging',
    name: 'Упаковка',
    cases: [
      {
        id: 'zerno-coffee',
        title: 'Зерно — кофе.pdf',
        cover: '/portfolio/pack-coffee.png',
        subtitle: 'Обжарочная «Зерно» · 2025',
        description:
          'Задача: перезапустить упаковку локальной обжарочной так, чтобы пачка выделялась на полке рядом с крупными брендами. Сделала модульную систему цветов по странам происхождения, крупную типографику и экономичную печать в 2 цвета.',
        images: [
          '/portfolio/pack-coffee.png',
          '/portfolio/desk-moodboard.png',
          '/portfolio/pack-tea.png',
        ],
      },
      {
        id: 'lilac-cosmetics',
        title: 'Lilac — косметика.pdf',
        cover: '/portfolio/pack-cosmetics.png',
        subtitle: 'Lilac Beauty · 2024',
        description:
          'Задача: создать премиальную, но доступную по себестоимости упаковку для линейки уходовой косметики. Матовое стекло, тиснение логотипа и единая сетка для 12 SKU.',
        images: ['/portfolio/pack-cosmetics.png', '/portfolio/pack-tea.png'],
      },

      // ✂️ --- НАЧАЛО КЕЙСА (Скопируй отсюда до ножниц ниже, чтобы добавить новый кейс в папку) ---
      {
        id: 'botanica-tea', // Придумай любое английское слово без пробелов
        title: 'Botanica — чай.pdf', // Название файла в папке
        cover: '/portfolio/pack-tea.png', // Картинка-обложка из папки public/portfolio
        subtitle: 'Botanica Tea · 2024', // Подзаголовок
        description:
          'Задача: подарочная коробка для новогодней коллекции чая. Ботанические иллюстрации вручную, золотое фольгирование и раскладка-трансформер внутри.',
        images: [
          '/portfolio/pack-tea.png', // Слайды внутри кейса (через запятую в кавычках)
          '/portfolio/pack-coffee.png',
        ],
      },
      // ✂️ --- КОНЕЦ КЕЙСА (Вставляй скопированный кейс прямо под этой строчкой!) ---
    ],
  },

  // ==================== ПАПКА 2: AI ПРОЕКТЫ ====================
  {
    id: 'ai',
    name: 'AI',
    cases: [
      {
        id: 'ai-photoset',
        title: 'Ai-фотосессии',
        cover: '/portfolio/ai-1.JPEG',
        subtitle: 'Фотореализм и работа с внешностью',
        description:
          'Серия генераций со мной и другими людьми. Полное сохранение черт лица, детальная проработка света и текстуры кожи.',
        images: [
          '/portfolio/ai-1.JPEG', // 👈 Все фотки, которые листаются внутри кейса:
          '/portfolio/ai-2.jpeg',
          '/portfolio/ai-3.JPEG',
          '/portfolio/ai-4.JPEG',
          '/portfolio/ai-5.JPEG',
          '/portfolio/ai-6.JPEG',
          '/portfolio/ai-7.JPEG',
          '/portfolio/ai-8.JPEG',
          '/portfolio/ai-9.jpeg',
          '/portfolio/ai-10.JPG',
          '/portfolio/ai-11.JPG',
          '/portfolio/ai-12.JPG',
          '/portfolio/ai-13.JPG',
          '/portfolio/ai-14.jpg',
          '/portfolio/ai-15.JPG',
          '/portfolio/ai-16.JPG',
          '/portfolio/ai-17.JPG',
          '/portfolio/ai-18.JPG',
          '/portfolio/ai-19.JPG',
          '/portfolio/ai-20.jpg',
        ],
      },
    ],
  },

  // ✂️ ====== НАЧАЛО ПАПКИ (Скопируй отсюда до ножниц ниже, чтобы создать НОВУЮ ПАПКУ на столе!) ======
  {
    id: 'posters', // Уникальное английское название для новой папки (например: 'polygraphy' или 'cards')
    name: 'Постеры и Мерч', // Как папка подписана на рабочем столе Мака
    cases: [
      {
        id: 'grid-fest',
        title: 'Grid Fest — постер.pdf',
        cover: '/portfolio/poster-typo.png',
        subtitle: 'Музыкальный фестиваль · 2024',
        description:
          'Задача: серия афиш в швейцарском стиле для городского фестиваля. Строгая модульная сетка, два цвета и типографика, которая читается с 20 метров.',
        images: ['/portfolio/poster-typo.png', '/portfolio/merch.png'],
      },
      {
        id: 'merch-drop',
        title: 'Мерч-дроп.pdf',
        cover: '/portfolio/merch.png',
        subtitle: 'Мерч для IT-конференции · 2025',
        description:
          'Задача: мерч, который хочется носить и после конференции. Худи, шопперы, кепки и стикерпаки с единой графической системой.',
        images: ['/portfolio/merch.png', '/portfolio/poster-typo.png'],
      },
    ],
  },
  // ✂️ ====== КОНЕЦ ПАПКИ (Вставляй новую папку прямо под этой строчкой!) ======
]

/* =====================================================================
 *  5. КОРЗИНА (шуточные снесённые проекты и непринятые концепты)
 * ===================================================================== */
export const trash: PortfolioCase[] = [
  {
    id: 'logo-v47',
    title: 'логотип_v47_ФИНАЛ.ai',
    cover: '/portfolio/trash-logo.png',
    subtitle: 'Непринятый концепт',
    description:
      'Клиент попросил «сделать сочнее и добавить радугу». Мы сделали. Потом мы удалили. Иногда лучший дизайн — тот, что остался в корзине.',
    images: ['/portfolio/trash-logo.png'],
  },
  {
    id: 'pravki-old',
    title: 'правки_от_клиента_23.jpg',
    cover: '/portfolio/desk-pravki.png',
    subtitle: 'Снесённый проект',
    description: '«Логотип побольше, а воздуха поменьше». Проект ушёл в корзину вместе с этими правками.',
    images: ['/portfolio/desk-pravki.png'],
  },
]

/* =====================================================================
 *  6. «ЗАБЫТЫЕ» ФОТКИ НА РАБОЧЕМ СТОЛЕ
 * ===================================================================== */
export const desktopPhotos: DesktopPhoto[] = [
  {
    id: 'pravki',
    name: 'правки_финал_точно2.jpg',
    src: '/portfolio/desk-pravki.png',
    description: 'Финальные правки. Точно финальные. Ну почти.',
  },
  {
    id: 'moodboard',
    name: 'мудборд_кофе.png',
    src: '/portfolio/desk-moodboard.png',
    description: 'Референсы для упаковки кофейни «Зерно»: тёплые оттенки, керамика, латте-арт.',
  },
]

/* =====================================================================
 *  7. SAFARI
 * ===================================================================== */
export const safari = {
  defaultQuery: 'размер а4 в мм',
  wikiTitle: 'Википедия — Графический дизайн',
  wikiUrl: 'https://ru.m.wikipedia.org/wiki/Графический_дизайн',
}
