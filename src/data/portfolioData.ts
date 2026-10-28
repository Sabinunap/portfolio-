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
  '/portfolio/oboi.JPG'

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
        images: [
          '/portfolio/pack-cosmetics.png', 
          '/portfolio/pack-tea.png'
        ],
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
        title: 'Ai-фотосессии.pdf',
        cover: '/portfolio/ai-1.JPEG',
        subtitle: 'Фотореализм и работа с внешностью',
        description:
          'Серия генераций со мной и другими людьми. Полное сохранение черт лица, детальная проработка света и текстуры кожи.',
        images: [
          '/portfolio/ai-1.JPEG',
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
      {
        id: 'cloth',
        title: 'Генерация одежды.pdf',
        cover: '/portfolio/shmot2.JPG',
        subtitle: 'Сохранение деталей',
        description:
          'Тестовое задание по созданию fashion-контента с помощью ИИ. Генерация модели и перенос одежды с исходных фотографий с сохранением внешности модели, фасона и деталей изделия. Исходные материалы не прикреплены, чтобы избежать возможного нарушения прав на их использование.',
        images: [
          '/portfolio/shmot1.JPG',
          '/portfolio/shmot2.JPG',
          '/portfolio/shmot3.JPG',
          '/portfolio/shmot4.JPG',
        ],
      },
    ],
  },

  // ✂️ ====== НАЧАЛО ПАПКИ (Скопируй отсюда до ножниц ниже, чтобы создать НОВУЮ ПАПКУ на столе!) ======
  {
    id: 'posters', // Уникальное английское название для новой папки (например: 'polygraphy' или 'cards')
    name: 'Постеры и открыточки', // Как папка подписана на рабочем столе Мака
    cases: [
      {
        id: 'otkrytki',
        title: 'Открытки.pdf',
        cover: '/portfolio/otkryt-12.jpeg',
        subtitle: 'Открытки на новый год/день рождения',
        description:
          'Подборка открыток 2023–2026.',
        images: [
          '/portfolio/otkryt-1.jpeg',
          '/portfolio/otkryt-2.jpeg',
          '/portfolio/otkryt-3.jpg',
          '/portfolio/otkryt-4.jpg',
          '/portfolio/otkryt-5.jpg',
          '/portfolio/otkryt-6.jpeg',
          '/portfolio/otkryt-7.jpg',
          '/portfolio/otkryt-8.jpeg',
          '/portfolio/otkryt-9.jpg',
          '/portfolio/otkryt-11.jpeg',
          '/portfolio/otkryt-12.jpeg',
          '/portfolio/otkryt-13.jpg',
          '/portfolio/otkryt-14.jpg',
        ],
      },
      {
        id: 'posters',
        title: 'Постеры.pdf',
        cover: '/portfolio/poster-5.JPG',
        subtitle: 'Постеры на разные темы',
        description:
          'Подборка постеров 2023–2026.',
        images: [
          '/portfolio/poster-1.JPG', 
          '/portfolio/poster-2.JPG',
          '/portfolio/poster-3.JPG', 
          '/portfolio/poster-4.JPG',
          '/portfolio/poster-5.JPG', 
          '/portfolio/poster-6.jpg',
          '/portfolio/poster-7.jpg', 
          '/portfolio/poster-8.JPG',
          '/portfolio/poster-9.jpg', 
          '/portfolio/poster-10.JPG',
          '/portfolio/poster-11.JPG', 
          '/portfolio/poster-12.JPG',
          '/portfolio/poster-13.JPG', 
          '/portfolio/poster-14.jpg',
          '/portfolio/poster-15.JPG',
          '/portfolio/poster-16.jpg',
        ],
      },
    ],
  },
  
  // ✂️ ====== ПАПКА ИНФОГРАФИКА ======
  {
    id: 'infographics', // Уникальное английское название для новой папки (например: 'polygraphy' или 'cards')
    name: 'Инфографика', // Как папка подписана на рабочем столе Мака
    cases: [
      {
        id: 'infografika',
        title: 'Карточки.pdf',
        cover: '/portfolio/wb50.JPG',
        subtitle: 'Инфографика WB/Ozon',
        description:
          'Подборка карточек для маркетплейсов. Работы местами идут вразнобой, так как какие-то серии со временем потерялись, плюс докинула сюда пару работ с тестовых заданий и пробные зарисовки.',
        images: [
          '/portfolio/wb1.JPG',
          '/portfolio/wb2.JPG',
          '/portfolio/wb3.JPG',
          '/portfolio/wb4.JPG',
          '/portfolio/wb6.JPG',
          '/portfolio/wb7.JPG',
          '/portfolio/wb8.JPG',
          '/portfolio/wb9.JPG',
          '/portfolio/wb10.JPG',
          '/portfolio/wb11.JPG',
          '/portfolio/wb12.JPG',
          '/portfolio/wb13.JPG',
          '/portfolio/wb14.JPG',
          '/portfolio/wb15.JPG',
          '/portfolio/wb16.JPG',
          '/portfolio/wb17.JPG',
          '/portfolio/wb18.JPG',
          '/portfolio/wb19.JPG',
          '/portfolio/wb20.JPG',
          '/portfolio/wb21.JPG',
          '/portfolio/wb22.JPG',
          '/portfolio/wb23.JPG',
          '/portfolio/wb24.JPG',
          '/portfolio/wb25.JPG',
          '/portfolio/wb26.JPG',
          '/portfolio/wb27.JPG',
          '/portfolio/wb28.JPG',
          '/portfolio/wb29.JPG',
          '/portfolio/wb30.JPG',
          '/portfolio/wb31.JPG',
          '/portfolio/wb32.JPG',
          '/portfolio/wb33.JPG',
          '/portfolio/wb34.JPG',
          '/portfolio/wb35.JPG',
          '/portfolio/wb36.JPG',
          '/portfolio/wb37.JPG',
          '/portfolio/wb38.JPG',
          '/portfolio/wb39.JPG',
          '/portfolio/wb40.JPG',
          '/portfolio/wb41.JPG',
          '/portfolio/wb42.JPG',
          '/portfolio/wb43.JPG',
          '/portfolio/wb44.JPG',
          '/portfolio/wb45.JPG',
          '/portfolio/wb46.JPG',
          '/portfolio/wb47.jpg',
          '/portfolio/wb48.jpeg',
          '/portfolio/wb49.JPG',
          '/portfolio/wb50.JPG',
        ],
      },
    ],
  },
]

/* =====================================================================
 *  5. КОРЗИНА (шуточные снесённые проекты и непринятые концепты)
 * ===================================================================== */
export const trash: PortfolioCase[] = [
  {
    id: 'hren',
    title: 'бредятина.pdf',
    cover: '/portfolio/ITSA1.jpg',
    subtitle: 'Дурнина',
    description:
      'Дурачилась просто.',
    images: [
      '/portfolio/ITSA1.jpg',
      '/portfolio/ITSA2.jpg',
      '/portfolio/ITSA3.jpg',
      '/portfolio/ITSA4.jpg',
      '/portfolio/ITSA5.jpg',
      '/portfolio/ITSA6.jpg',
    ],
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
    id: 'devchonki',
    name: 'тусня.jpg',
    src: '/portfolio/IMG_3803.JPG',
    description: 'Эх хорошо девчонки с дршкой поздравили',
  },
  {
    id: 'screenshot',
    name: 'Снимок экрана 2026-0...16.14.22',
    src: '/portfolio/IMG_4219.JPG',
    description: 'Так выглядело мое рабочее пространство в процессе дизайна упаковки.',
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
