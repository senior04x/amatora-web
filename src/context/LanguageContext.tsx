import React, { createContext, useContext, useState } from 'react';

export type Language = 'uz' | 'ru' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const translations = {
  uz: {
    // Navigation
    'nav.home': 'Bosh Sahifa',
    'nav.apps': 'Ilovalar',
    'nav.features': 'Xususiyatlar',
    'nav.about': 'Haqida',
    'nav.security': 'Xavfsizlik',
    'nav.apply': 'Ro\'yxatdan O\'tish',

    // Home Page
    'home.scroll': 'Scroll',
    'home.badge': 'Imkoniyatlar',
    'home.title': 'Platforma Tizim Modullari',
    'home.card1.badge': 'AMATORA App',
    'home.card1.title': 'Turnir Jadvali va Statistika',
    'home.card1.desc': 'O\'yinchilar va ishqibozlar uchun real-vaqt rejimida yangilanuvchi ligalar statistikasi.',
    'home.card1.spec1': 'Real-vaqt ochkolari',
    'home.card1.spec2': 'To\'purarlar va kartochkalar reytingi',
    'home.card2.badge': 'AMATORA Admin',
    'home.card2.title': 'PNG Grafika Eksport',
    'home.card2.desc': 'Turnir jadvallari va match natijalarini 1080x1080 rasmlarga 1 soniyada eksport qiling.',
    'home.card2.spec1': 'Avtomatik brending va rasmlar',
    'home.card2.spec2': 'Homiylar logotiplari eksporti',
    'home.card3.badge': 'Ekotizim',
    'home.card3.title': 'Arizalar va Boshqaruv',
    'home.card3.desc': 'O\'yinchilar ma\'lumotlari hamda jamoalar arizalarini bir bosishda tasdiqlang.',
    'home.card3.spec1': 'O\'yinchilarni verifikatsiya qilish',
    'home.card3.spec2': 'Transfer oynalari boshqaruvi',

    // Apps Page
    'apps.badge': 'Rasmiy Dasturlar',
    'apps.title': 'Barcha Qurilmalar Uchun Ilovalar',
    'apps.desc': 'Stadion tablolarini boshqarish, OBS jonli translyatsiyalari, match nazorati hamda turnir statistikasi uchun rasmiy AMATORA ilovalari.',
    
    'apps.app.badge': 'iOS & Android',
    'apps.app.title': 'AMATORA App',
    'apps.app.subtitle': 'Ishqibozlar va O\'yinchilar Ilovasi',
    'apps.app.desc': 'Turnir jadvallari, match natijalari, to\'purarlar reytingi hamda jonli statistikalarni real vaqt rejimida kuzatish uchun maxsus mobil ilova.',
    'apps.app.btn': 'AMATORA Ilovasini Olish',
    'apps.app.sub': 'Qurilmaga qarab avtomatik App Store yoki Google Play',

    'apps.admin.badge': 'iOS & Android',
    'apps.admin.title': 'AMATORA Admin',
    'apps.admin.subtitle': 'Tashkilotchilar va Hakamlar Paneli',
    'apps.admin.desc': 'Turnirlar, o\'yinchilar ro\'yxati, match taymerlari, hakamlik protokollari hamda jamoalar arizalarini bevosita mobil telefondan boshqaring.',
    'apps.admin.btn': 'Admin Ilovasini Olish',
    'apps.admin.sub': 'Qurilmaga qarab avtomatik App Store yoki Google Play',

    'apps.score.badge': 'Windows • v2.0.0',
    'apps.score.title': 'AMATORA Scoreboard',
    'apps.score.subtitle': 'Stadion LED va HDMI Monitor Tablosi',
    'apps.score.desc': 'Stadion LED ekranlari, HDMI monitorlar va jonli efir tablolari uchun maxsus Native Desktop ilovasi. 0ms drift-free aniq taymer, avtomatik gol animatsiyalari va internet uzilganda ham mustaqil ishlash tizimi.',
    'apps.score.btn': 'Scoreboard Yuklab Olish (.zip)',
    'apps.score.sub': 'Windows 10 / 11 (64-bit) • 1.8 MB',

    'apps.obs.badge': 'OBS Studio • v2.0.0',
    'apps.obs.title': 'AMATORA OBS Controller',
    'apps.obs.subtitle': 'OBS Replay va Efir Avtomatizatsiyasi',
    'apps.obs.desc': 'OBS Studio bilan WebSocket orqali ulanib, takroriy lavhalar (Replay buffer), Stinger o\'tish animatsiyalari, kamera almashishlari hamda translyatsiya grafikasini to\'liq avtomatik boshqaradi.',
    'apps.obs.btn': 'OBS Controller Yuklab Olish (.zip)',
    'apps.obs.sub': 'Windows 10 / 11 (64-bit) • 2.1 MB',

    'apps.guide.title': 'O\'rnatish Qo\'llanmasi',
    'apps.guide.step1.title': 'ZIP Arxivni Yuklang',
    'apps.guide.step1.desc': 'Kerakli dastur (Scoreboard yoki OBS Controller) ZIP arxivini kompyuteringizga yuklab oling.',
    'apps.guide.step2.title': 'Arxivni Ochib O\'rnatish',
    'apps.guide.step2.desc': 'ZIP arxivni oching va ichidagi Setup.exe faylini ishga tushirib Install tugmasini bosing.',
    'apps.guide.step3.title': 'Ishga Tushiring',
    'apps.guide.step3.desc': 'Ish stolida paydo bo\'lgan rasmiy AMATORA yorlig\'i orqali dasturni ishga tushiring.',

    // Features Page
    'features.badge': 'Platforma Imkoniyatlari Katalogi',
    'features.title': 'Turnirlarni Boshqarishning Har Bir Tizim Moduli',
    'features.desc': 'AMATORA platformasida har bir funksiya tezkor va aniq ishlash uchun modulli arxitektura asosida tayyorlangan.',
    'features.tab.all': 'Barcha Modullar',
    'features.tab.tournaments': 'Turnirlar va O\'yinchilar',
    'features.tab.matches': 'Match Boshqaruvi',
    'features.tab.graphics': 'Grafika Eksport',

    'features.f1.title': 'Avtomatlashtirilgan Liga va Tur Boshqaruvi',
    'features.f1.desc': 'Har bir liga uchun tur o\'yinlarini taqsimlash, o\'yin kunlari hamda stadionlarni belgilash moduli.',
    'features.f1.s1': 'Guruh bosqichi va pley-off tizimi',
    'features.f1.s2': 'Klublar statistikasi',
    'features.f1.s3': 'Ochkolarni hisoblash mantig\'i',

    'features.f2.title': 'Real-Vaqt Live Match Taymeri',
    'features.f2.desc': 'Match hakamlari uchun taymer, taymlarni almashtirish, daqiqa va uzaytirilgan daqiqalarni kiritish.',
    'features.f2.s1': '1-Taym / 2-Taym taymerlari',
    'features.f2.s2': 'Sariq/Qizil kartochkalar',
    'features.f2.s3': 'Gol mualliflari hamda assistlar',

    'features.f3.title': '1080×1080 PNG Grafik Eksporti',
    'features.f3.desc': 'Turnir jadvali, to\'purarlar hamda o\'yin natijalarini ijtimoiy tarmoqlar uchun 1080×1080 o\'lchamdagi tayyor rasmlarga eksport qilish.',
    'features.f3.s1': 'Futbol shablonlari',
    'features.f3.s2': 'Homiylar logotiplari',
    'features.f3.s3': 'Bir zumda yuklab olish',

    'features.f4.title': 'O\'yinchilar va Arizalar Verifikatsiyasi',
    'features.f4.desc': 'O\'yinchilar ma\'lumotlari, fotosuratlari hamda jamoaga biriktirish arizalarini ko\'rib chiqish va tasdiqlash.',
    'features.f4.s1': 'Fotosurat qirqish va ko\'rish',
    'features.f4.s2': 'Transfer oynalari',
    'features.f4.s3': 'Takroriy o\'yinchilarni aniqlash',

    'features.f5.title': 'Homiylar Boshqaruvi va Liga Shabloni',
    'features.f5.desc': 'Tashkilotning bosh homiysi va ikkinchi darajali homiylarini har bir liga grafikasiga integratsiya qilish.',
    'features.f5.s1': 'Bosh Homiy oltin belgisi',
    'features.f5.s2': 'Homiylar strip paneli',
    'features.f5.s3': 'Liga bo\'yicha yoqish/o\'chirish',

    'features.f6.title': 'PDF Hisobotlar va Protokollar',
    'features.f6.desc': 'Barcha o\'yinlar natijalari hamda to\'purarlar jadvalini rasmiy chop etish uchun PDF hujjatlarga o\'tkazish.',
    'features.f6.s1': 'Rasmiy pechat bloki',
    'features.f6.s2': 'Chop etish formati',
    'features.f6.s3': 'Avtomatlashtirilgan hisobotlar',

    // About Page
    'about.badge': 'Ekotizim Haqida',
    'about.title': 'AMATORA Futbol Boshqaruv Platformasi',
    'about.desc': 'Havaskor futbol ligalari va turnirlarini raqamlashtirish, boshqarish va avtomatlashtirish uchun yaratilgan platforma.',
    'about.mission.title': 'Bizning Maqsadimiz',
    'about.mission.desc': 'O\'zbekistondagi havaskor futbol ligalari va mahalla turnirlarini zamonaviy raqamli vositalar bilan ta\'minlash. Turnirlarni tashkil etish, jamoalar va o\'yinchilarni boshqarish, natijalarni yuritish hamda qog\'ozbozlik va murakkab hisob-kitoblarni kamaytirish.',
    'about.infra.title': 'Platforma Infratuzilmasi',
    'about.infra.desc': 'AMATORA zamonaviy veb va mobil texnologiyalar hamda Supabase PostgreSQL ma\'lumotlar bazasi asosida ishlab chiqilgan bo\'lib, barqaror va tezkor ishlashni ta\'minlaydi.',
    'about.stack.title': 'Platforma Texnologiyalari',
    'about.stack.sub': 'Asosiy texnologik stek',

    // Security Page
    'security.badge': 'Tizim Xavfsizligi va Maxfiylik',
    'security.title': 'Xavfsizlik Standartlari va Ma\'lumotlar Himoyasi',
    'security.desc': 'AMATORA platformasida foydalanuvchilar, jamoalar va turnir tashkilotchilarining ma\'lumotlari zamonaviy xavfsizlik standartlari hamda qat\'iy ruxsat nazorati orqali himoyalanadi.',
    'security.p1.title': 'Rolli Kirish Nazorati (RBAC)',
    'security.p1.desc': 'Ma\'lumotlar bazasi Row-Level Security (RLS) va rolli ruxsat tizimi bilan himoyalangan. Tashkilotchilar va adminlar faqat o\'zlariga tegishli liga hamda o\'yin ma\'lumotlarini boshqara oladilar.',
    'security.p2.title': 'Shifrlangan Aloqa (HTTPS)',
    'security.p2.desc': 'Platforma bilan mijoz dasturlari (Veb, Mobil, Desktop) o\'rtasidagi barcha tarmoq so\'rovlari va API ulanishlari zamonaviy HTTPS shifrlangan protokollari orqali xavfsiz uzatiladi.',
    'security.p3.title': 'Ma\'lumotlar Maxfiyligi',
    'security.p3.desc': 'Foydalanuvchilar va jamoa a\'zolarining ma\'lumotlari faqat musobaqalarni o\'tkazish va rasmiy ro\'yxatga olish maqsadlarida foydalaniladi hamda uchinchi tomonlarga sotilmaydi.',
    'security.tech.title': 'Platforma Xavfsizlik Konfiguratsiyasi',
    'security.check1': 'Foydalanuvchi ma\'lumotlari tijoriy reklama tarmoqlariga berilmaydi',
    'security.check2': 'Xavfsiz kesh va avtomatik zaxiralash tizimi',
    'security.privacy': 'Maxfiylik Siyosati (Privacy Policy)',
    'security.contact': 'Xavfsizlik bo\'yicha aloqa: +998 93 378 68 86',

    // Footer
    'footer.desc': 'Havaskor futbol ligalarini raqamlashtirish va avtomatlashtirilgan professional boshqaruv platformasi.',
    'footer.platform': 'Platforma',
    'footer.security_col': 'Tizim va Xavfsizlik',
    'footer.rights': '© 2026 AMATORA (amatora.uz). Barcha huquqlar himoyalangan.',
    'footer.secure_box_title': 'Xavfsiz Infratuzilma',
    'footer.secure_box_text': 'AMATORA ma\'lumotlarni uzatish jarayonida HTTPS/TLS shifrlangan himoyasidan foydalanadi.',
  },

  ru: {
    // Navigation
    'nav.home': 'Главная',
    'nav.apps': 'Приложения',
    'nav.features': 'Возможности',
    'nav.about': 'О платформе',
    'nav.security': 'Безопасность',
    'nav.apply': 'Регистрация',

    // Home Page
    'home.scroll': 'Вниз',
    'home.badge': 'Возможности',
    'home.title': 'Системные Модули Платформы',
    'home.card1.badge': 'AMATORA App',
    'home.card1.title': 'Турнирные Таблицы и Статистика',
    'home.card1.desc': 'Статистика лиг, обновляемая в режиме реального времени для игроков и болельщиков.',
    'home.card1.spec1': 'Очки в реальном времени',
    'home.card1.spec2': 'Рейтинг бомбардиров и карточек',
    'home.card2.badge': 'AMATORA Admin',
    'home.card2.title': 'Экспорт PNG Графики',
    'home.card2.desc': 'Экспортируйте турнирные таблицы и результаты матчей в изображения 1080x1080 за 1 секунду.',
    'home.card2.spec1': 'Автоматический брендинг и постеры',
    'home.card2.spec2': 'Экспорт логотипов спонсоров',
    'home.card3.badge': 'Экосистема',
    'home.card3.title': 'Заявки и Управление',
    'home.card3.desc': 'Подтверждайте данные игроков и трансферные заявки команд в один клик.',
    'home.card3.spec1': 'Верификация игроков',
    'home.card3.spec2': 'Управление трансферными окнами',

    // Apps Page
    'apps.badge': 'Официальные Программы',
    'apps.title': 'Приложения Для Всех Устройств',
    'apps.desc': 'Официальные приложения AMATORA для управления табло стадиона, прямых трансляций OBS, контроля матчей и турнирной статистики.',
    
    'apps.app.badge': 'iOS & Android',
    'apps.app.title': 'AMATORA App',
    'apps.app.subtitle': 'Приложение для Игроков и Болельщиков',
    'apps.app.desc': 'Специальное мобильное приложение для отслеживания турнирных таблиц, результатов матчей, рейтинга бомбардиров и статистики в реальном времени.',
    'apps.app.btn': 'Скачать AMATORA App',
    'apps.app.sub': 'Автоматический переход в App Store или Google Play',

    'apps.admin.badge': 'iOS & Android',
    'apps.admin.title': 'AMATORA Admin',
    'apps.admin.subtitle': 'Панель Организаторов и Судей',
    'apps.admin.desc': 'Управляйте турнирами, списками игроков, таймерами матчей, судейскими протоколами и заявками команд прямо с мобильного телефона.',
    'apps.admin.btn': 'Скачать Admin App',
    'apps.admin.sub': 'Автоматический переход в App Store или Google Play',

    'apps.score.badge': 'Windows • v2.0.0',
    'apps.score.title': 'AMATORA Scoreboard',
    'apps.score.subtitle': 'Табло для LED Экранов и HDMI Мониторов',
    'apps.score.desc': 'Нативное Windows-приложение для LED экранов стадиона и трансляций. Точный таймер без задержек (0ms), авто-анимации голов и автономная работа без интернета.',
    'apps.score.btn': 'Скачать Scoreboard (.zip)',
    'apps.score.sub': 'Windows 10 / 11 (64-bit) • 1.8 MB',

    'apps.obs.badge': 'OBS Studio • v2.0.0',
    'apps.obs.title': 'AMATORA OBS Controller',
    'apps.obs.subtitle': 'Автоматизация Replay и Эфира OBS',
    'apps.obs.desc': 'Подключается к OBS Studio по WebSocket и полностью автоматически управляет буфером повторов (Replay), стингерами, сменой камер и графикой трансляции.',
    'apps.obs.btn': 'Скачать OBS Controller (.zip)',
    'apps.obs.sub': 'Windows 10 / 11 (64-bit) • 2.1 MB',

    'apps.guide.title': 'Инструкция по Установке',
    'apps.guide.step1.title': 'Скачайте ZIP Архив',
    'apps.guide.step1.desc': 'Скачайте ZIP-архив нужной программы (Scoreboard или OBS Controller) на ваш компьютер.',
    'apps.guide.step2.title': 'Распакуйте и Установите',
    'apps.guide.step2.desc': 'Откройте ZIP-архив, запустите файл Setup.exe и нажмите кнопку "Install".',
    'apps.guide.step3.title': 'Запустите Программу',
    'apps.guide.step3.desc': 'Запустите программу через официальный ярлык AMATORA, появившийся на рабочем столе.',

    // Features Page
    'features.badge': 'Каталог Возможностей Платформы',
    'features.title': 'Системные Модули Управления Турнирами',
    'features.desc': 'Каждая функция платформы AMATORA построена на модульной архитектуре для быстрой и точной работы.',
    'features.tab.all': 'Все Модули',
    'features.tab.tournaments': 'Турниры и Игроки',
    'features.tab.matches': 'Управление Матчами',
    'features.tab.graphics': 'Экспорт Графики',

    'features.f1.title': 'Автоматизированное Управление Лигами и Турами',
    'features.f1.desc': 'Модуль распределения матчей по турам, назначения игровых дней и стадионов для каждой лиги.',
    'features.f1.s1': 'Групповой этап и система плей-офф',
    'features.f1.s2': 'Статистика клубов',
    'features.f1.s3': 'Логика подсчета турнирных очков',

    'features.f2.title': 'Таймер Матча Live в Реальном Времени',
    'features.f2.desc': 'Таймер для судей матча, переключение таймов, фиксация минут и добавленного времени.',
    'features.f2.s1': 'Таймеры 1-го и 2-го таймов',
    'features.f2.s2': 'Желтые и красные карточки',
    'features.f2.s3': 'Авторы голов и ассистенты',

    'features.f3.title': 'Экспорт PNG Графики 1080×1080',
    'features.f3.desc': 'Экспорт турнирной таблицы, бомбардиров и результатов матчей в готовые изображения 1080×1080 для соцсетей.',
    'features.f3.s1': 'Футбольные шаблоны',
    'features.f3.s2': 'Логотипы спонсоров',
    'features.f3.s3': 'Мгновенное скачивание',

    'features.f4.title': 'Верификация Игроков и Заявок',
    'features.f4.desc': 'Просмотр и подтверждение данных игроков, фотографий и заявок на привязку к команде.',
    'features.f4.s1': 'Кадрирование и просмотр фото',
    'features.f4.s2': 'Трансферные окна',
    'features.f4.s3': 'Обнаружение дубликатов игроков',

    'features.f5.title': 'Управление Спонсорами и Шаблонами Лиг',
    'features.f5.desc': 'Интеграция генерального и второстепенных спонсоров организации в графику каждой лиги.',
    'features.f5.s1': 'Золотой знак генерального спонсора',
    'features.f5.s2': 'Панель спонсорской плашки',
    'features.f5.s3': 'Включение/отключение по лиге',

    'features.f6.title': 'PDF Отчеты и Протоколы',
    'features.f6.desc': 'Экспорт результатов всех матчей и таблицы бомбардиров в официальные PDF-документы для печати.',
    'features.f6.s1': 'Блок официальной печати',
    'features.f6.s2': 'Формат для печати',
    'features.f6.s3': 'Автоматизированные отчеты',

    // About Page
    'about.badge': 'Об Экосистеме',
    'about.title': 'Платформа Управления Футболом AMATORA',
    'about.desc': 'Платформа, созданная для цифровизации, управления и автоматизации любительских футбольных лиг и турниров.',
    'about.mission.title': 'Наша Цель',
    'about.mission.desc': 'Обеспечение любительских футбольных лиг и турниров современными цифровыми инструментами. Упрощение организации турниров, управления командами и игроками, ведения результатов и сокращение бумажной работы.',
    'about.infra.title': 'Инфраструктура Платформы',
    'about.infra.desc': 'AMATORA разработана на основе современных веб- и мобильных технологий, а также базы данных Supabase PostgreSQL, что гарантирует стабильную и быструю работу.',
    'about.stack.title': 'Технологии Платформы',
    'about.stack.sub': 'Основной технологический стек',

    // Security Page
    'security.badge': 'Безопасность Системы и Конфиденциальность',
    'security.title': 'Стандарты Безопасности и Защита Данных',
    'security.desc': 'Данные пользователей, команд и организаторов турниров на платформе AMATORA защищены современными стандартами безопасности и строгим контролем доступа.',
    'security.p1.title': 'Ролевой Контроль Доступа (RBAC)',
    'security.p1.desc': 'База данных защищена политиками Row-Level Security (RLS) и ролевой системой доступа. Организаторы и администраторы имеют доступ только к данным своих лиг и матчей.',
    'security.p2.title': 'Шифрованное Соединение (HTTPS)',
    'security.p2.desc': 'Все сетевые запросы и API-соединения между платформой и клиентскими программами (Web, Mobile, Desktop) безопасно передаются по современным протоколам шифрования HTTPS.',
    'security.p3.title': 'Конфиденциальность Данных',
    'security.p3.desc': 'Данные пользователей и участников команд используются исключительно в целях проведения соревнований и официальной регистрации, и не передаются третьим лицам.',
    'security.tech.title': 'Конфигурация Безопасности Платформы',
    'security.check1': 'Данные пользователей не передаются в коммерческие рекламные сети',
    'security.check2': 'Безопасное кэширование и система автоматического резервного копирования',
    'security.privacy': 'Политика Конфиденциальности (Privacy Policy)',
    'security.contact': 'Контакт по безопасности: +998 93 378 68 86',

    // Footer
    'footer.desc': 'Платформа для цифровизации и профессионального автоматизированного управления любительскими футбольными лигами.',
    'footer.platform': 'Платформа',
    'footer.security_col': 'Система и Безопасность',
    'footer.rights': '© 2026 AMATORA (amatora.uz). Все права защищены.',
    'footer.secure_box_title': 'Безопасная Инфраструктура',
    'footer.secure_box_text': 'AMATORA использует шифрование HTTPS/TLS в процессе передачи всех данных.',
  },

  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.apps': 'Apps',
    'nav.features': 'Features',
    'nav.about': 'About',
    'nav.security': 'Security',
    'nav.apply': 'Register',

    // Home Page
    'home.scroll': 'Scroll',
    'home.badge': 'Capabilities',
    'home.title': 'Platform System Modules',
    'home.card1.badge': 'AMATORA App',
    'home.card1.title': 'Standings & Live Statistics',
    'home.card1.desc': 'Real-time updated league statistics tailored for players and fans.',
    'home.card1.spec1': 'Real-time league points',
    'home.card1.spec2': 'Top scorers and cards leaderboard',
    'home.card2.badge': 'AMATORA Admin',
    'home.card2.title': 'PNG Graphics Export',
    'home.card2.desc': 'Export tournament standings and match scoreboards into 1080x1080 social graphics in 1 second.',
    'home.card2.spec1': 'Automated branding & posters',
    'home.card2.spec2': 'Sponsor logo integration',
    'home.card3.badge': 'Ecosystem',
    'home.card3.title': 'Applications & Management',
    'home.card3.desc': 'Review and verify player registration and transfer requests with a single click.',
    'home.card3.spec1': 'Player verification system',
    'home.card3.spec2': 'Transfer window management',

    // Apps Page
    'apps.badge': 'Official Software',
    'apps.title': 'Applications For All Devices',
    'apps.desc': 'Official AMATORA apps for stadium scoreboard control, OBS live broadcast automation, match administration, and tournament analytics.',
    
    'apps.app.badge': 'iOS & Android',
    'apps.app.title': 'AMATORA App',
    'apps.app.subtitle': 'App for Players & Fans',
    'apps.app.desc': 'Dedicated mobile app to track tournament standings, match results, top scorer leaderboards, and live game statistics in real time.',
    'apps.app.btn': 'Get AMATORA App',
    'apps.app.sub': 'Auto-redirect to App Store or Google Play based on device',

    'apps.admin.badge': 'iOS & Android',
    'apps.admin.title': 'AMATORA Admin',
    'apps.admin.subtitle': 'Organizers & Referees Panel',
    'apps.admin.desc': 'Manage tournaments, player rosters, match timers, referee match sheets, and team submissions directly from your mobile device.',
    'apps.admin.btn': 'Get Admin App',
    'apps.admin.sub': 'Auto-redirect to App Store or Google Play based on device',

    'apps.score.badge': 'Windows • v2.0.0',
    'apps.score.title': 'AMATORA Scoreboard',
    'apps.score.subtitle': 'Stadium LED & HDMI Scoreboard Display',
    'apps.score.desc': 'Native Windows desktop app built for stadium LED screens and HDMI displays. 0ms drift-free precise timer, automatic goal animations, and full offline resilience.',
    'apps.score.btn': 'Download Scoreboard (.zip)',
    'apps.score.sub': 'Windows 10 / 11 (64-bit) • 1.8 MB',

    'apps.obs.badge': 'OBS Studio • v2.0.0',
    'apps.obs.title': 'AMATORA OBS Controller',
    'apps.obs.subtitle': 'OBS Replay & Broadcast Automation',
    'apps.obs.desc': 'Connects to OBS Studio via WebSocket to seamlessly automate replay buffers, stinger transitions, camera switching, and live broadcast overlays.',
    'apps.obs.btn': 'Download OBS Controller (.zip)',
    'apps.obs.sub': 'Windows 10 / 11 (64-bit) • 2.1 MB',

    'apps.guide.title': 'Installation Guide',
    'apps.guide.step1.title': 'Download ZIP Archive',
    'apps.guide.step1.desc': 'Download the software ZIP archive (Scoreboard or OBS Controller) to your computer.',
    'apps.guide.step2.title': 'Extract & Install',
    'apps.guide.step2.desc': 'Extract the ZIP archive, run the Setup.exe installer, and click "Install".',
    'apps.guide.step3.title': 'Launch Application',
    'apps.guide.step3.desc': 'Launch the application from the official AMATORA desktop shortcut.',

    // Features Page
    'features.badge': 'Platform Capabilities Catalog',
    'features.title': 'Tournament Management System Modules',
    'features.desc': 'Every feature within the AMATORA ecosystem is engineered on a modular architecture for high performance and precision.',
    'features.tab.all': 'All Modules',
    'features.tab.tournaments': 'Tournaments & Players',
    'features.tab.matches': 'Match Administration',
    'features.tab.graphics': 'Graphics Export',

    'features.f1.title': 'Automated League & Matchday Management',
    'features.f1.desc': 'Module for fixtures scheduling, matchday assignments, and stadium allocation for every league.',
    'features.f1.s1': 'Group stage and playoff knockout systems',
    'features.f1.s2': 'Club performance statistics',
    'features.f1.s3': 'Automated table points engine',

    'features.f2.title': 'Real-Time Live Match Timer',
    'features.f2.desc': 'Intuitive control panel for referees: timer controls, half-time management, added time, and live events.',
    'features.f2.s1': '1st Half / 2nd Half timers',
    'features.f2.s2': 'Yellow & Red disciplinary cards',
    'features.f2.s3': 'Goal scorers and assist tracking',

    'features.f3.title': '1080×1080 PNG Graphics Export',
    'features.f3.desc': 'Export standings, top scorers, and match results into ready-to-post 1080×1080 images for social media.',
    'features.f3.s1': 'Clean football graphics templates',
    'features.f3.s2': 'Sponsor logo branding',
    'features.f3.s3': 'Instant 1-click download',

    'features.f4.title': 'Player & Registration Verification',
    'features.f4.desc': 'Review and verify player registration details, photos, and team allocation submissions.',
    'features.f4.s1': 'Photo cropper and viewer',
    'features.f4.s2': 'Transfer window management',
    'features.f4.s3': 'Duplicate player detection',

    'features.f5.title': 'Sponsor Management & League Branding',
    'features.f5.desc': 'Integrate title sponsors and secondary partners across all matchday graphics.',
    'features.f5.s1': 'Gold title sponsor badge',
    'features.f5.s2': 'Sponsor banner strips',
    'features.f5.s3': 'Per-league toggle controls',

    'features.f6.title': 'PDF Reports & Match Sheets',
    'features.f6.desc': 'Export all match fixtures, team sheets, and scoring rankings into printable official PDF documents.',
    'features.f6.s1': 'Official stamp block',
    'features.f6.s2': 'Print-ready format',
    'features.f6.s3': 'Automated reporting suite',

    // About Page
    'about.badge': 'About Ecosystem',
    'about.title': 'AMATORA Football Management Platform',
    'about.desc': 'A comprehensive platform designed to digitize, manage, and automate amateur football leagues and tournaments.',
    'about.mission.title': 'Our Mission',
    'about.mission.desc': 'Empowering grassroots football leagues and community tournaments with modern digital tools. Streamlining tournament organization, squad management, result tracking, and eliminating paperwork.',
    'about.infra.title': 'Platform Infrastructure',
    'about.infra.desc': 'AMATORA is built upon modern web and mobile frameworks and Supabase PostgreSQL database, ensuring fast and reliable operations.',
    'about.stack.title': 'Platform Technologies',
    'about.stack.sub': 'Core technology stack',

    // Security Page
    'security.badge': 'System Security & Privacy',
    'security.title': 'Security Standards & Data Protection',
    'security.desc': 'User, team, and tournament organizer data on AMATORA is protected by modern security protocols and rigorous access control.',
    'security.p1.title': 'Role-Based Access Control (RBAC)',
    'security.p1.desc': 'The database is protected with Row-Level Security (RLS) and role-based policies. Organizers and admins only access their respective leagues and fixtures.',
    'security.p2.title': 'Encrypted Traffic (HTTPS)',
    'security.p2.desc': 'All network requests and API communication between the platform and clients (Web, Mobile, Desktop) are securely encrypted via modern HTTPS protocols.',
    'security.p3.title': 'Data Privacy',
    'security.p3.desc': 'User and squad data is strictly used for tournament operations and official registration, and is never sold to third parties.',
    'security.tech.title': 'Platform Security Configuration',
    'security.check1': 'User data is never shared with commercial advertising networks',
    'security.check2': 'Secure caching and automated backup systems',
    'security.privacy': 'Privacy Policy',
    'security.contact': 'Security contact: +998 93 378 68 86',

    // Footer
    'footer.desc': 'Platform for the digitization and automated professional management of amateur football leagues.',
    'footer.platform': 'Platform',
    'footer.security_col': 'System & Security',
    'footer.rights': '© 2026 AMATORA (amatora.uz). All rights reserved.',
    'footer.secure_box_title': 'Secure Infrastructure',
    'footer.secure_box_text': 'AMATORA utilizes HTTPS/TLS encryption for all data in transit.',
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'uz',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('amatora_lang');
    if (saved === 'uz' || saved === 'ru' || saved === 'en') {
      return saved;
    }
    // Auto-detect from browser/device language on first visit
    const browserLang = (navigator.language || '').toLowerCase();
    if (browserLang.startsWith('ru') || browserLang.startsWith('be') || browserLang.startsWith('uk') || browserLang.startsWith('kk')) {
      return 'ru';
    }
    if (browserLang.startsWith('en')) {
      return 'en';
    }
    return 'uz';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('amatora_lang', lang);
  };

  const t = (key: string): string => {
    const langDict = translations[language] as Record<string, string>;
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    // Fallback to uz
    const fallbackDict = translations.uz as Record<string, string>;
    return fallbackDict[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
