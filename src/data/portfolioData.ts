/* =====================================================================
 *  ДАННЫЕ ПОРТФОЛИО
 *  ---------------------------------------------------------------------
 *  Здесь хранится ВЕСЬ контент сайта: имя, описание, иконки, папки на
 *  рабочем столе, фотки на рабочем столе и кейсы внутри папок.
 *
 *  Как менять картинки:
 *   • Положи свою картинку в папку /public/portfolio/ (например my-case.jpg)
 *     и укажи путь "/portfolio/my-case.jpg".
 *   • Или просто вставь прямую ссылку на картинку из интернета
 *     ("https://...jpg").
 * ===================================================================== */

/* ---------- ТИПЫ (их трогать не нужно) ---------- */

/** Один кейс (проект) внутри папки */
export type PortfolioCase = {
  /** Уникальный id латиницей, без пробелов */
  id: string
  /** Название файла, которое видно в Finder */
  title: string
  /** Обложка (превью) кейса в сетке Finder */
  cover: string
  /** Короткая подпись под заголовком в окне «Просмотр» (клиент, год) */
  subtitle: string
  /** Описание задачи — абзац текста в окне «Просмотр» */
  description: string
  /** Картинки презентации (листаются вертикально, как на Behance) */
  images: string[]
}

/** Папка на рабочем столе и в боковом меню Finder */
export type PortfolioFolder = {
  id: string
  /** Название папки */
  name: string
  /** Кейсы внутри папки */
  cases: PortfolioCase[]
}

/** «Забытая» фотка-скриншот на рабочем столе */
export type DesktopPhoto = {
  id: string
  /** Имя файла под превью */
  name: string
  /** Сама картинка */
  src: string
  /** Текст, который покажется в окне «Просмотр» */
  description: string
}

/* =====================================================================
 *  1. ОБО МНЕ (окно «Системные настройки»)
 * ===================================================================== */
export const profile = {
  /** Имя и фамилия */
  name: 'Сабина Мукосей',
  /** Роль под именем */
  role: 'Graphic Designer',
  /** Аватарка (круглая) */
  avatar: '/portfolio/avatar.png',
  /** Строка «О себе» */
  about:
    '5+ лет в дизайне. Программы выучила сама, плюс 4 года отучилась на «Издательском деле» (понимаю верстку и печать). 4 года работала на фрилансе, позже вела весь визуал компании: от карточек товаров до упаковки, макетов ежедневников и гравировки на флешки. Слежу за развитием ИИ, практикуюсь и использую его для ускорения работы.',
  /** Строка «Стек и программы» */
  stack: 'Figma, Illustrator, Photoshop, InDesign, AI tools',
  /** Строка «Статус» */
  status: 'Свободна для проектов',
  /** Ссылка на Telegram (кнопка в настройках и иконка в Доке) */
  telegramUrl: 'https://t.me/hlashj',
  /** Текст на синей кнопке */
  telegramButton: 'Написать в Telegram',
}

/* =====================================================================
 *  2. ИКОНКИ (оригинальные иконки macOS — лучше не менять)
 * ===================================================================== */
export const icons = {
  folder: 'https://img.icons8.com/color/240/mac-folder.png',
  finder: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Finder_Icon_macOS_Big_Sur.png',
  safari: 'https://img.icons8.com/color/240/safari--v1.png',
  settings: 'https://img.icons8.com/fluency/240/settings.png',
  telegram: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg',
  trash: 'https://img.icons8.com/fluency/240/full-trash.png',
}

/* =====================================================================
 *  3. ОБОИ РАБОЧЕГО СТОЛА
 * ===================================================================== */
export const wallpaper =
  'https://raw.githubusercontent.com/Sabinunap/portfolio-/953d5ead5affe2657dcfb68546f13d453324d168/vv.JPG'

/* =====================================================================
 *  4. ПАПКИ И КЕЙСЫ
 *  Порядок папок здесь = порядок на рабочем столе и в Finder.
 * ===================================================================== */
export const folders: PortfolioFolder[] = [
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
        images: ['/portfolio/pack-coffee.png', '/portfolio/desk-moodboard.png', '/portfolio/pack-tea.png'],
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
      {
        id: 'botanica-tea',
        title: 'Botanica — чай.pdf',
        cover: '/portfolio/pack-tea.png',
        subtitle: 'Botanica Tea · 2024',
        description:
          'Задача: подарочная коробка для новогодней коллекции чая. Ботанические иллюстрации вручную, золотое фольгирование и раскладка-трансформер внутри.',
        images: ['/portfolio/pack-tea.png', '/portfolio/pack-coffee.png'],
      },
    ],
  },
  {
    id: 'ai',
    name: 'AI проекты',
    cases: [
      {
        id: 'chrome-orange',
        title: 'Chrome Orange — кампания.png',
        cover: '/portfolio/ai-campaign.png',
        subtitle: 'Рекламная кампания сока · 2025',
        description:
          'Задача: за неделю собрать серию сюрреалистичных визуалов для наружной рекламы без дорогой съёмки. Генерация в Midjourney, доработка и композитинг в Photoshop, апскейл для билбордов 6×3 м.',
        images: ['/portfolio/ai-campaign.png', '/portfolio/ai-character.png'],
      },
      {
        id: 'fox-mascot',
        title: 'Лис — маскот бренда.png',
        cover: '/portfolio/ai-character.png',
        subtitle: 'Маскот для edtech-сервиса · 2025',
        description:
          'Задача: придумать дружелюбного персонажа для детской платформы. Концепты через Stable Diffusion, финальная 3D-модель в Blender и гайд по позам и эмоциям.',
        images: ['/portfolio/ai-character.png', '/portfolio/ai-campaign.png'],
      },
    ],
  },
  {
    id: 'posters',
    name: 'Постеры и Мерч',
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
]

/* =====================================================================
 *  5. КОРЗИНА (шуточные снесённые проекты и непринятые концепты)
 *  Открывается при клике на Корзину в Доке или в Finder.
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
 *  Отображаются как превью в белой рамке. Двойной клик — откроется «Просмотр».
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
 *  7. SAFARI (поисковый запрос по умолчанию и вторая вкладка)
 * ===================================================================== */
export const safari = {
  /** Запрос в адресной строке при открытии */
  defaultQuery: 'размер а4 в мм',
  /** Вторая вкладка */
  wikiTitle: 'Википедия — Графический дизайн',
  wikiUrl: 'https://ru.m.wikipedia.org/wiki/Графический_дизайн',
}
