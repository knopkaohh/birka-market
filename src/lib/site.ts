export const company = {
  name: "Бирка Маркет",
  slogan: "Ваш бренд - наша забота!",
  phone: "+7 495 003-88-81",
  phoneHref: "tel:+74950038881",
  email: "prod@birka-market.ru",
  telegram: "https://t.me/birka_market_ru",
  whatsapp: "https://wa.me/79163549287",
  max: "https://max.ru/",
  vk: "https://vk.com/birka_market",
  address: "Москва, Строительный проезд, дом 2, стр. 1, офис № 1",
  hours: "Пн–Пт, 09:00–18:00",
  replyIn: "10 минут",
  pickupHours: "Самовывоз: Пн–Пт, 10:00–18:00",
  since: 2017,
  brands: "19 250",
  labels: "180 млн+",
  kinds: "28+",
  map: {
    lat: 55.83802,
    lng: 37.436238,
    zoom: 16,
    title: "Birka Market",
    description: "Производство бирок и упаковки для одежды",
    widget: "https://yandex.ru/map-widget/v1/?ll=37.436238%2C55.83802&z=16&pt=37.436238,55.83802,pm2rdm&l=map",
    route: "https://yandex.ru/maps/?pt=37.436238,55.83802&z=16&l=map",
    sprav: "https://yandex.ru/sprav/widget/rating-badge/242141870878?type=award",
  },
  howToGet:
    "Метро Сходненская, 2-й выход, трамвай 6 до остановки «Западный мост». Дальше 2 минуты пешком: коричневые ворота, направо во двор, отдельный подъём с железной дверью. Позвоните в звонок слева.",
  legal: "ИП Федотов Антон Вадимович",
  inn: "771412910075",
  ogrnip: "323774600620762",
};

export const navLinks = [
  { href: "/katalog", label: "Продукция" },
  { href: "/o-kompanii", label: "О Компании" },
  { href: "/novosti", label: "Новости" },
  { href: "/dostavka", label: "Доставка" },
  { href: "/oplata", label: "Оплата" },
  { href: "/kontakty", label: "Контакты" },
  { href: "/faq", label: "FAQ" },
] as const;

export const tickerItems = [
  { label: "ЖАККАРД", href: "/jacquard" },
  { label: "КАРТОН", href: "/birki-karton" },
  { label: "СИЛИКОН", href: "/silikon" },
  { label: "САТИН", href: "/satin" },
  { label: "НЕЙЛОН", href: "/neylon" },
  { label: "ХЛОПОК", href: "/cotton" },
  { label: "ZIP-LOCK ПАКЕТЫ", href: "/zip-pack" },
  { label: "ВЫШИВКА", href: "/embroideryprint" },
  { label: "ПРИНТЫ", href: "/embroideryprint" },
  { label: "БИРКОДЕРЖАТЕЛИ", href: "/fasteners" },
  { label: "КРАФТОВЫЕ ПАКЕТЫ", href: "/kraft" },
  { label: "ПВХ-ПАТЧИ", href: "/rubber" },
  { label: "ФЛЕКСТРАН", href: "/flextran" },
  { label: "БАННЕРЫ", href: "/banner" },
  { label: "КОРПОРАТИВНЫЙ МЕРЧ", href: "/merchi" },
  { label: "ДЖИБИТСЫ", href: "/jibbitz" },
  { label: "БУМАЖНЫЕ ПАКЕТЫ", href: "/paper" },
  { label: "ПОЛИГРАФИЯ", href: "/printing" },
  { label: "ФЛАГИ", href: "/flags" },
  { label: "СТИКЕРЫ", href: "/stickerpack" },
  { label: "КОРОБКИ", href: "/cardboardbox" },
  { label: "ЖУРНАЛЫ", href: "/magazine" },
  { label: "DTF-ПЕЧАТЬ", href: "/directtofilm" },
  { label: "РАЗРАБОТКА САЙТОВ", href: "/razrabotka-saytov" },
  { label: "ЛЕНДИНГ", href: "/lending" },
  { label: "ИНТЕРНЕТ-МАГАЗИН", href: "/internet-magazin" },
] as const;

export type Product = {
  slug: string;
  name: string;
  shortName: string;
  category: string;
  type: string;
  summary: string;
  description: string;
  image: string;
  sample: boolean;
  minQty: number;
  leadTime: string;
  features: string[];
};

export const categories = [
  {
    slug: "vshivnye-birki",
    name: "Вшивные бирки",
    intro: "Жаккард, сатин, силикон, хлопок, нейлон и светоотражающие материалы. Тираж от 100 штук, макет бесплатно.",
    image: "/images/products/jacquard.jpg",
  },
  {
    slug: "navesnye-birki",
    name: "Навесные бирки",
    intro: "Картон, калька и промышленный пластик для внешней маркировки одежды, подарков и коммуникаций.",
    image: "/images/products/birki-karton.jpg",
  },
  {
    slug: "upakovka",
    name: "Упаковка",
    intro: "ZIP Lock, крафт, бумажные и ПВД-пакеты, картонные коробки — комплект, который работает на бренд.",
    image: "/images/products/kraft.jpg",
  },
  {
    slug: "furnitura",
    name: "Фурнитура",
    intro: "Биркодержатели, пуллеры, джибитсы и жаккардовая резинка для завершения изделия.",
    image: "/images/products/pull.jpg",
  },
  {
    slug: "nanesenie",
    name: "Нанесение и патчи",
    intro: "DTF, FlexTran, вышивка, шелкография и ПВХ-патчи. От идеи до готового нанесения.",
    image: "/images/products/flextran.jpg",
  },
  {
    slug: "merch",
    name: "Мерч",
    intro: "Корпоративный мерч и стикерпаки под ключ: макет, производство, упаковка.",
    image: "/images/products/merchi.jpg",
  },
  {
    slug: "poligrafiya",
    name: "Полиграфия",
    intro: "Визитки, наклейки, флаеры, буклеты, журналы, флаги и баннеры для бизнеса.",
    image: "/images/products/printing.jpg",
  },
  {
    slug: "sayty",
    name: "Разработка сайтов",
    intro: "Лендинги, интернет-магазины и корпоративные сайты. Структура бесплатно, считаем после задачи.",
    image: "/images/products/razrabotka-saytov.jpg",
  },
] as const;

export const products: Product[] = [
  {
    slug: "jacquard",
    name: "Жаккардовые бирки",
    shortName: "Жаккард",
    category: "vshivnye-birki",
    type: "Премиальный брендинг",
    summary: "Тканый логотип с выразительной фактурой. Для горловины, одежды и аксессуаров.",
    description:
      "Жаккардовые бирки изготавливаются на ткацких станках и сохраняют чёткость рисунка после стирок. Подходят для премиальной и повседневной одежды, где логотип должен выглядеть статусно.",
    image: "/images/products/jacquard.jpg",
    sample: false,
    minQty: 100,
    leadTime: "4–6 рабочих дней",
    features: ["Тканый логотип", "Тираж от 100 шт.", "Макет бесплатно", "Высокая износостойкость"],
  },
  {
    slug: "satin",
    name: "Сатиновые бирки",
    shortName: "Сатин",
    category: "vshivnye-birki",
    type: "Мягкость и комфорт",
    summary: "Гладкая лента для составников, размерников, ухода и деликатной одежды.",
    description:
      "Сатиновые этикетки мягко контактируют с кожей и подходят для детской, нижней и повседневной одежды. Можно заказать образец перед запуском тиража.",
    image: "/images/products/satin.jpg",
    sample: true,
    minQty: 200,
    leadTime: "2–3 рабочих дня",
    features: ["Мягкая лента", "Доступен образец", "Состав, размер, уход", "Читаемая печать"],
  },
  {
    slug: "silikon",
    name: "Силиконовые бирки",
    shortName: "Силикон",
    category: "vshivnye-birki",
    type: "Стойкий акцент",
    summary: "Гибкие влагостойкие бирки для спорта, обуви, сумок и верхней одежды.",
    description:
      "Силиконовые бирки держат форму, не боятся влаги и остаются заметными на изделии. Подходят там, где нужна долговечность и тактильный акцент.",
    image: "/images/products/silikon.jpg",
    sample: true,
    minQty: 200,
    leadTime: "2–3 рабочих дня",
    features: ["Влагостойкость", "Доступен образец", "Гибкий материал", "Спорт, обувь, сумки"],
  },
  {
    slug: "cotton",
    name: "Хлопковые бирки",
    shortName: "Хлопок",
    category: "vshivnye-birki",
    type: "Натуральная фактура",
    summary: "Тактильное решение для локальных, экологичных и ремесленных брендов.",
    description:
      "Хлопковые бирки дают матовую натуральную поверхность и спокойный визуальный тон. Их выбирают бренды, которым важна фактура и ощущение материала.",
    image: "/images/products/cotton.jpg",
    sample: false,
    minQty: 1000,
    leadTime: "6–8 рабочих дней",
    features: ["Натуральная ткань", "Тираж от 1 000 шт.", "Эко-коллекции", "Матовая фактура"],
  },
  {
    slug: "neylon",
    name: "Нейлоновые бирки",
    shortName: "Нейлон",
    category: "vshivnye-birki",
    type: "Практичная маркировка",
    summary: "Тонкий и прочный материал для составников и технической информации.",
    description:
      "Нейлон используют для размерников, составников и служебной маркировки. Материал тонкий, прочный и удобный в массовом пошиве.",
    image: "/images/products/neylon.jpg",
    sample: true,
    minQty: 200,
    leadTime: "2–3 рабочих дня",
    features: ["Прочный и лёгкий", "Доступен образец", "Техническая маркировка", "Стабильный повтор"],
  },
  {
    slug: "reflective",
    name: "Светоотражающие бирки",
    shortName: "Светоотражающие",
    category: "vshivnye-birki",
    type: "Видимость и безопасность",
    summary: "Для спортивной, рабочей и детской одежды, где важно отражение света.",
    description:
      "Световозвращающие бирки отражают направленный свет и делают человека заметнее в темноте. Их ставят на спортивную, рабочую и детскую одежду.",
    image: "/images/products/reflective.jpg",
    sample: false,
    minQty: 100,
    leadTime: "4–6 рабочих дней",
    features: ["Отражение света", "Спорт и спец одежда", "Макет бесплатно", "Заметность в темноте"],
  },
  {
    slug: "birki-karton",
    name: "Картонные навесные бирки",
    shortName: "Картон",
    category: "navesnye-birki",
    type: "Внешнее оформление",
    summary: "Навесные ярлыки для бренда, цены, размера и дополнительной информации о товаре.",
    description:
      "Картонные бирки работают снаружи изделия: несут логотип, описание, размер и правила ухода. Форму, плотность и крепление подбираем под задачу.",
    image: "/images/products/birki-karton.jpg",
    sample: false,
    minQty: 1000,
    leadTime: "2–4 рабочих дня",
    features: ["Тираж от 1 000 шт.", "Любая форма", "Печать логотипа", "Для одежды и подарков"],
  },
  {
    slug: "tracing",
    name: "Бирки из кальки",
    shortName: "Калька",
    category: "navesnye-birki",
    type: "Премиальный ярлык",
    summary: "Полупрозрачные навесные ярлыки для одежды, текстиля, подарков и парфюмерии.",
    description:
      "Калька даёт лёгкость и воздух в оформлении. Такие бирки выбирают, когда нужна деликатная подача и премиальное первое впечатление.",
    image: "/images/products/tracing.jpg",
    sample: false,
    minQty: 500,
    leadTime: "4–6 рабочих дней",
    features: ["Полупрозрачный слой", "Премиальная подача", "Печать логотипа", "Одежда и подарки"],
  },
  {
    slug: "plastic",
    name: "Пластиковые бирки",
    shortName: "Пластик",
    category: "navesnye-birki",
    type: "Промышленная маркировка",
    summary: "Бирки для кабелей, трубопроводов, энергетики, строительства и ЖКХ.",
    description:
      "Пластиковые бирки рассчитаны на улицу и инженерию: их крепят на кабели, провода и коммуникации. Материал устойчив к влаге и механической нагрузке.",
    image: "/images/products/plastic.jpg",
    sample: false,
    minQty: 100,
    leadTime: "5–7 рабочих дней",
    features: ["Для улицы и ЖКХ", "Читаемая маркировка", "Прочный пластик", "Крепление на кабель"],
  },
  {
    slug: "zip-pack",
    name: "ZIP Lock пакеты",
    shortName: "ZIP Lock",
    category: "upakovka",
    type: "Индивидуальная упаковка",
    summary: "Пакеты с замком для готового изделия, комплектов и повторного использования.",
    description:
      "ZIP Lock защищает изделие, сохраняет товарный вид и удобен покупателю. Печатаем логотип и подбираем размер под ваш ассортимент.",
    image: "/images/products/zip-pack.jpg",
    sample: false,
    minQty: 500,
    leadTime: "5–7 рабочих дней",
    features: ["Тираж от 500 шт.", "Замок ZIP", "Печать логотипа", "Для одежды и аксессуаров"],
  },
  {
    slug: "kraft",
    name: "Крафтовые пакеты",
    shortName: "Крафт",
    category: "upakovka",
    type: "Экологичная подача",
    summary: "Плотная бумажная упаковка для магазинов, шоурумов, подарков и еды навынос.",
    description:
      "Крафт выглядит естественно и подчёркивает характер бренда. Пакеты собираем с логотипом и нужной плотностью бумаги.",
    image: "/images/products/kraft.jpg",
    sample: false,
    minQty: 100,
    leadTime: "5–8 рабочих дней",
    features: ["Натуральная бумага", "Печать логотипа", "Магазины и шоурумы", "Прочная сборка"],
  },
  {
    slug: "paper",
    name: "Бумажные пакеты",
    shortName: "Бумажные пакеты",
    category: "upakovka",
    type: "Фирменная упаковка",
    summary: "Пакеты, которые не просто доносят покупку, а держат уровень бренда.",
    description:
      "Плотная бумага, аккуратная сборка и логотип работают на доверие ещё до того, как клиент откроет изделие. Подходит бутикам, косметике и fashion-рознице.",
    image: "/images/products/paper.jpg",
    sample: false,
    minQty: 100,
    leadTime: "5–8 рабочих дней",
    features: ["Плотная бумага", "Качественная сборка", "Логотип бренда", "Для розницы"],
  },
  {
    slug: "ldpebag",
    name: "ПВД-пакеты с вырубной ручкой",
    shortName: "ПВД-пакеты",
    category: "upakovka",
    type: "Практичная упаковка",
    summary: "Самый востребованный формат пластиковой упаковки с вырубной ручкой.",
    description:
      "Пакеты высокого давления выдерживают нагрузку, быстро производятся и хорошо смотрятся с логотипом. Используются в рознице, доставке и на мероприятиях.",
    image: "/images/products/ldpebag.jpg",
    sample: false,
    minQty: 500,
    leadTime: "5–7 рабочих дней",
    features: ["Вырубная ручка", "Печать логотипа", "Для розницы", "Большие тиражи"],
  },
  {
    slug: "cardboardbox",
    name: "Картонные коробки",
    shortName: "Коробки",
    category: "upakovka",
    type: "Защита и подача",
    summary: "Коробка с логотипом — лицо бренда, защита товара и часть распаковки.",
    description:
      "Делаем коробки под размер изделия: от простых тиражей до подарочной конструкции. Печатаем логотип и собираем упаковку, которую не стыдно показать клиенту.",
    image: "/images/products/cardboardbox.jpg",
    sample: false,
    minQty: 100,
    leadTime: "7–12 рабочих дней",
    features: ["Индивидуальный размер", "Печать логотипа", "Защита товара", "Подарочная подача"],
  },
  {
    slug: "fasteners",
    name: "Биркодержатели",
    shortName: "Биркодержатели",
    category: "furnitura",
    type: "Крепление ярлыка",
    summary: "Фиксаторы для навесных бирок, ценников и ярлыков на одежде, обуви и сумках.",
    description:
      "Биркодержатели нужны, чтобы навесная бирка сидела ровно и не терялась. Подбираем длину, цвет и тип крепления под ваш ассортимент.",
    image: "/images/products/fasteners.jpg",
    sample: false,
    minQty: 1000,
    leadTime: "3–5 рабочих дней",
    features: ["Быстрая навеска", "Для одежды и обуви", "Разные длины", "Крупные тиражи"],
  },
  {
    slug: "elastic",
    name: "Жаккардовая резинка",
    shortName: "Резинка",
    category: "furnitura",
    type: "Тканый акцент",
    summary: "Прочная лента с рельефным узором, который плетётся на станке, а не печатается.",
    description:
      "Жаккардовая резинка и стропа используются в поясах, внутренней отделке и аксессуарах. Рисунок получается плотным и долговечным.",
    image: "/images/products/elastic.jpg",
    sample: false,
    minQty: 100,
    leadTime: "8–12 рабочих дней",
    features: ["Тканый рисунок", "Высокая прочность", "Для одежды и аксессуаров", "Повтор заказа"],
  },
  {
    slug: "pull",
    name: "Пуллеры для молний",
    shortName: "Пуллеры",
    category: "furnitura",
    type: "Деталь фурнитуры",
    summary: "Подвеска на бегунок молнии, которая делает застёжку удобнее и узнаваемее.",
    description:
      "Пуллер — маленькая, но заметная деталь бренда. Делаем формы под логотип и подбираем материал, который выдержит ежедневное использование.",
    image: "/images/products/pull.jpg",
    sample: false,
    minQty: 100,
    leadTime: "7–10 рабочих дней",
    features: ["Форма под логотип", "Удобный хват", "Для курток и сумок", "Фирменный акцент"],
  },
  {
    slug: "jibbitz",
    name: "Джибитсы",
    shortName: "Джибитсы",
    category: "furnitura",
    type: "Аксессуар для обуви",
    summary: "Фигурки в люверсы кроссовок, Crocs, шлёпанцев и детской обуви.",
    description:
      "Джибитсы превращают обувь в носимый мерч. Разрабатываем форму, цвет и крепление, чтобы персонаж или логотип держались в люверсе.",
    image: "/images/products/jibbitz.jpg",
    sample: false,
    minQty: 100,
    leadTime: "10–15 рабочих дней",
    features: ["Индивидуальная форма", "Для Crocs и кед", "Яркий мерч", "Серийное производство"],
  },
  {
    slug: "rubber",
    name: "ПВХ-патчи",
    shortName: "ПВХ-патчи",
    category: "nanesenie",
    type: "Объёмный акцент",
    summary: "Резиновые и ПВХ-нашивки, которые добавляют бренду плотность и статус.",
    description:
      "Патчи из ПВХ и силикона держат объём, цвет и контур. Их ставят на одежду, сумки, головные уборы и мерч, когда нужна заметная эмблема.",
    image: "/images/products/rubber.jpg",
    sample: false,
    minQty: 100,
    leadTime: "10–14 рабочих дней",
    features: ["Объёмный логотип", "Стойкий цвет", "Для одежды и сумок", "Премиальный вид"],
  },
  {
    slug: "flextran",
    name: "FlexTran",
    shortName: "FlexTran",
    category: "nanesenie",
    type: "3D-нанесение",
    summary: "Объёмный термотрансфер из гибкого ПВХ или силикона на текстиль.",
    description:
      "FlexTran даёт рельефное изображение, которое держится на ткани и выглядит дороже плоской печати. Подходит для логотипов, номеров и декоративных элементов.",
    image: "/images/products/flextran.jpg",
    sample: false,
    minQty: 50,
    leadTime: "7–10 рабочих дней",
    features: ["Объём 3D", "Гибкий слой", "Для текстиля", "Стойкость к носке"],
  },
  {
    slug: "directtofilm",
    name: "DTF-печать",
    shortName: "DTF",
    category: "nanesenie",
    type: "Полноцветный перенос",
    summary: "Бесконтурный термоперенос с высокой детализацией на одежду и аксессуары.",
    description:
      "DTF позволяет переносить сложные изображения без ограничения по цветам. Технология подходит для мерча, тиражей и коллекций с детализированным дизайном.",
    image: "/images/products/directtofilm.jpg",
    sample: false,
    minQty: 10,
    leadTime: "3–6 рабочих дней",
    features: ["Полноцвет", "Высокая детализация", "На текстиль", "Быстрый запуск"],
  },
  {
    slug: "embroideryprint",
    name: "Нанесение на одежду",
    shortName: "Вышивка и печать",
    category: "nanesenie",
    type: "Вышивка, шелкография, DTF",
    summary: "Машинная вышивка, шелкография и DTF — в зависимости от задачи и тиража.",
    description:
      "Для статуса и долговечности выбирают вышивку, для ярких тиражей — шелкографию и DTF. Помогаем выбрать технологию, а не продаём одну на все случаи.",
    image: "/images/products/embroideryprint.jpg",
    sample: false,
    minQty: 10,
    leadTime: "5–10 рабочих дней",
    features: ["Вышивка", "Шелкография", "DTF", "Подбор технологии"],
  },
  {
    slug: "merchi",
    name: "Мерч для бизнеса",
    shortName: "Мерч",
    category: "merch",
    type: "Под ключ",
    summary: "От идеи и макета до готового тиража и упаковки. Один подрядчик на весь цикл.",
    description:
      "Собираем корпоративный мерч в одном контуре: изделие, нанесение, бирки и упаковка. Коммерческое предложение готовим после уточнения тиража и состава комплекта.",
    image: "/images/products/merchi.jpg",
    sample: false,
    minQty: 30,
    leadTime: "КП за 24 часа, производство по согласованию",
    features: ["От 30 шт.", "Полный цикл", "Макет и нанесение", "Упаковка в комплекте"],
  },
  {
    slug: "stickerpack",
    name: "Стикерпаки",
    shortName: "Стикерпаки",
    category: "merch",
    type: "Носимый мерч",
    summary: "Наборы стикеров, которые клиенты клеят на телефоны, ноутбуки и упаковку.",
    description:
      "Разрабатываем дизайн и подбираем материал под задачу: от подарочных наборов до вложений в заказ. Стикерпак работает как напоминание о бренде после покупки.",
    image: "/images/products/stickerpack.jpg",
    sample: false,
    minQty: 50,
    leadTime: "5–8 рабочих дней",
    features: ["Дизайн с нуля", "Наборы и вырубка", "Для мерча и заказов", "Яркая подача"],
  },
  {
    slug: "printing",
    name: "Полиграфия для бизнеса",
    shortName: "Полиграфия",
    category: "poligrafiya",
    type: "Печатные носители",
    summary: "Визитки, наклейки, флаеры, буклеты и журналы — детали, из которых складывается бренд.",
    description:
      "Печатаем деловую полиграфию так, чтобы даже маленькая карточка или наклейка выглядели собранно. Помогаем выбрать бумагу, покрытие и тираж.",
    image: "/images/products/printing.jpg",
    sample: false,
    minQty: 50,
    leadTime: "3–7 рабочих дней",
    features: ["Визитки и листовки", "Наклейки", "Буклеты и журналы", "Подбор бумаги"],
  },
  {
    slug: "businesscard",
    name: "Визитки",
    shortName: "Визитки",
    category: "poligrafiya",
    type: "Первое знакомство",
    summary: "Карточка, которая должна быть не только информативной, но и приятной на ощупь.",
    description:
      "Подбираем плотность, ламинацию и способ печати. Визитка остаётся рабочим инструментом продаж и частью имиджа компании.",
    image: "/images/products/businesscard.jpg",
    sample: false,
    minQty: 100,
    leadTime: "2–4 рабочих дня",
    features: ["Плотная бумага", "Ламинация", "Односторонние и двусторонние", "Быстрый тираж"],
  },
  {
    slug: "sticker",
    name: "Наклейки",
    shortName: "Наклейки",
    category: "poligrafiya",
    type: "Маркировка и реклама",
    summary: "Стикеры для продукции, упаковки, витрин и промо.",
    description:
      "Наклейки держатся на разных поверхностях и быстро считываются. Делаем вырубку, подбираем клей и тираж под задачу.",
    image: "/images/products/sticker.jpg",
    sample: false,
    minQty: 50,
    leadTime: "3–5 рабочих дней",
    features: ["Вырубка", "Для товара и упаковки", "Стойкий клей", "Яркая печать"],
  },
  {
    slug: "leaflet",
    name: "Флаеры и листовки",
    shortName: "Листовки",
    category: "poligrafiya",
    type: "Быстрый промо-носитель",
    summary: "Короткий формат для акций, открытия точек, скидок и мероприятий.",
    description:
      "Листовка производится быстро и подходит для массового информирования. Помогаем с макетом, чтобы оффер читался с первого взгляда.",
    image: "/images/products/leaflet.jpg",
    sample: false,
    minQty: 100,
    leadTime: "2–4 рабочих дня",
    features: ["Быстрый тираж", "Акции и события", "Односторонние и двусторонние", "Доступный формат"],
  },
  {
    slug: "booklet",
    name: "Буклеты",
    shortName: "Буклеты",
    category: "poligrafiya",
    type: "Сложенный лист",
    summary: "Один лист бумаги, сложенный один или несколько раз, без скрепления.",
    description:
      "Буклет удобен, когда нужно рассказать о коллекции, услуге или компании компактно. Производство быстрое, а подача выглядит собраннее листовки.",
    image: "/images/products/booklet.jpg",
    sample: false,
    minQty: 50,
    leadTime: "3–6 рабочих дней",
    features: ["Сфальцованный лист", "Каталог и презентация", "Быстрое производство", "Удобный формат"],
  },
  {
    slug: "magazine",
    name: "Печать журналов",
    shortName: "Журналы",
    category: "poligrafiya",
    type: "Многостраничное издание",
    summary: "Корпоративные и периодические издания в мягкой обложке.",
    description:
      "Собираем журнал как носитель бренда: обложка, внутренняя печать, объём и тираж. Подходит для lookbook, отчёта и корпоративного издания.",
    image: "/images/products/magazine.jpg",
    sample: false,
    minQty: 50,
    leadTime: "7–14 рабочих дней",
    features: ["Мягкая обложка", "Многостраничность", "Lookbook и отчёт", "Собранный тираж"],
  },
  {
    slug: "flags",
    name: "Печать флагов",
    shortName: "Флаги",
    category: "poligrafiya",
    type: "Имидж и мероприятия",
    summary: "Флаги с индивидуальным дизайном для событий, офиса и наружного размещения.",
    description:
      "Флаг работает на узнаваемость на мероприятии и в интерьере. Печатаем индивидуальный макет и подбираем конструкцию под место использования.",
    image: "/images/products/flags.jpg",
    sample: false,
    minQty: 1,
    leadTime: "5–8 рабочих дней",
    features: ["Индивидуальный дизайн", "Мероприятия и офис", "Крупный формат", "Фирменный носитель"],
  },
  {
    slug: "banner",
    name: "Печать баннеров",
    shortName: "Баннеры",
    category: "poligrafiya",
    type: "Широкоформат",
    summary: "Наружная и интерьерная реклама шириной до 320 см.",
    description:
      "Баннеры печатаем для улицы, витрин и внутренних пространств. Подбираем плотность, люверсы и размер под точку размещения.",
    image: "/images/products/banner.jpg",
    sample: false,
    minQty: 1,
    leadTime: "3–6 рабочих дней",
    features: ["До 320 см", "Улица и интерьер", "Люверсы и размер", "Яркая печать"],
  },
  {
    slug: "razrabotka-saytov",
    name: "Разработка сайтов",
    shortName: "Сайты",
    category: "sayty",
    type: "Под ключ",
    summary: "Лендинг, магазин или сайт компании. Структура бесплатно, КП после задачи.",
    description:
      "Сайты для брендов одежды и производств: одна страница под запуск, витрина с корзиной или корпоративный многостраничник. Тексты и карту сайта готовим до визуала.",
    image: "/images/products/razrabotka-saytov.jpg",
    sample: false,
    minQty: 1,
    leadTime: "от 10 рабочих дней",
    features: ["3 формата", "Структура до макета", "КП после задачи", "Адаптив"],
  },
  {
    slug: "lending",
    name: "Лендинг",
    shortName: "Лендинг",
    category: "sayty",
    type: "Одна страница",
    summary: "Запуск коллекции, акция или запись. Одна страница, одна кнопка, форма заявки.",
    description:
      "Одностраничный сайт под конкретный оффер: дроп, акция, запись в шоурум или квиз. Собираем структуру, тексты, макет и публикуем. Обычно 10–15 рабочих дней после согласования блоков.",
    image: "/images/products/lending.jpg",
    sample: false,
    minQty: 1,
    leadTime: "10–15 рабочих дней",
    features: ["Один оффер", "Форма заявки", "10–15 рабочих дней", "Телефон в приоритете"],
  },
  {
    slug: "internet-magazin",
    name: "Интернет-магазин",
    shortName: "Магазин",
    category: "sayty",
    type: "Каталог и оплата",
    summary: "Карточки, корзина, доставка. Свой канал продаж рядом с маркетплейсом.",
    description:
      "Интернет-магазин считаем от числа артикулов и способа оплаты. Можно начать с витрины без кассы и подключить корзину, когда готовы документы и остатки.",
    image: "/images/products/internet-magazin.jpg",
    sample: false,
    minQty: 1,
    leadTime: "5–9 недель",
    features: ["Каталог и карточки", "Корзина по готовности", "Опт и розница", "Админка без программиста"],
  },
  {
    slug: "korporativnyy-sayt",
    name: "Корпоративный сайт",
    shortName: "Корпоративный",
    category: "sayty",
    type: "О компании",
    summary: "О нас, услуги, контакты и реквизиты. Чтобы закупке было куда переслать ссылку.",
    description:
      "Многостраничный сайт компании: производство, услуги, команда, карта и юрблок. Не путаем с магазином — корзину не накручиваем, если счёт выставляет менеджер.",
    image: "/images/products/korporativnyy-sayt.jpg",
    sample: false,
    minQty: 1,
    leadTime: "3–6 недель",
    features: ["Карта сайта до макета", "Услуги как в каталоге", "Контакты и карта", "Реквизиты на виду"],
  },
];

export type TeamMember = {
  name: string;
  role: string;
  email?: string;
  phone?: string;
  photo: string;
};

export const team: TeamMember[] = [
  {
    name: "Антон Федотов",
    role: "Исполнительный директор",
    email: "af@birka-market.ru",
    photo: "/images/team/anton.jpg",
  },
  {
    name: "Роман Хрусталёв",
    role: "Руководитель отдела продаж",
    email: "rh@birka-market.ru",
    phone: "+7 967 061-31-23",
    photo: "/images/team/roman.jpg",
  },
  {
    name: "Кристина Хрусталёва",
    role: "Руководитель отдела маркетинга",
    email: "kh@birka-market.ru",
    photo: "/images/team/kristina.jpg",
  },
  {
    name: "Гинтарас Палтарацкас",
    role: "Менеджер по продажам",
    email: "pg@birka-market.ru",
    phone: "+7 988 758-88-98",
    photo: "/images/team/gintaras.jpg",
  },
  {
    name: "Никита Царьков",
    role: "Руководитель производства",
    email: "nc@birka-market.ru",
    phone: "+7 916 676-27-21",
    photo: "/images/team/nikita.png",
  },
  {
    name: "Нариман Алескеров",
    role: "Менеджер по продажам",
    email: "na@birka-market.ru",
    phone: "+7 985 238-85-05",
    photo: "/images/team/nariman.jpg",
  },
  {
    name: "Максим Шалагинов",
    role: "Менеджер по продажам",
    email: "ms@birka-market.ru",
    phone: "+7 916 503-45-44",
    photo: "/images/team/maxim.png",
  },
  {
    name: "Алёна Аверьянова",
    role: "Производство",
    photo: "/images/team/alena.jpg",
  },
];

export const faqItems = [
  {
    q: "Какой минимальный тираж?",
    a: "Зависит от материала. Жаккард — от 100 штук. Сатин, силикон и нейлон — от 200 штук, ориентир по сумме около 2 500 ₽. Хлопок и картон — от 1 000 штук, ZIP Lock — от 500, мерч — от 30 изделий.",
  },
  {
    q: "Что делать, если нет макета?",
    a: "Пришлите логотип, текст, референс или описание задачи. Дизайнер и технолог бесплатно подготовят макет для печати перед запуском.",
  },
  {
    q: "Для каких бирок можно сделать образец?",
    a: "Образцы изготавливаются для сатиновых, силиконовых и нейлоновых бирок. Жаккард согласовывается отдельно. Для остальных позиций запускаем тираж по макету и примерам работ.",
  },
  {
    q: "Сколько занимает производство?",
    a: "Сатин, силикон и нейлон — обычно 2–3 рабочих дня, жаккард — 4–6, хлопок — 6–8. Срок считается после согласования макета и параметров. Сложные заказы считаем отдельно.",
  },
  {
    q: "Как происходит оплата?",
    a: "Работаем с юридическими и физическими лицами. После заявки менеджер готовит счёт. Доступны расчётный счёт, электронный платёж и сплит. Без НДС.",
  },
  {
    q: "Как доставляете заказ?",
    a: "По Москве — курьерские службы, по России — СДЭК, Почта России и другие перевозчики. Самовывоз со склада в Москве, Строительный проезд, 2с1, с 10:00 до 18:00 по будням.",
  },
];

export const processSteps = [
  ["Заявка", "Вы присылаете логотип, параметры или описываете задачу."],
  ["Подбор и расчёт", "Уточняем материал, размер, тираж и считаем стоимость."],
  ["Макет бесплатно", "Дизайнер готовит макет для печати и согласует его с вами."],
  ["Производство", "Запускаем тираж, проверяем качество и передаём в доставку."],
];

export const portfolio = [
  { image: "/images/work-1.jpg", label: "Картон • навесные бирки", href: "/birki-karton" },
  { image: "/images/work-2.jpg", label: "ПВХ • патчи", href: "/rubber" },
  { image: "/images/work-4.jpg", label: "ZIP Lock • упаковка", href: "/zip-pack" },
  { image: "/images/work-5.jpg", label: "Крафт • пакеты", href: "/kraft" },
];

export const cases = [
  {
    slug: "birki-karton",
    image: "/images/work-1.jpg",
    tag: "Картон",
    title: "Навесные бирки с QR",
    text: "Фигурные ярлыки для внешней маркировки: логотип, QR и контакты на одном носителе.",
  },
  {
    slug: "rubber",
    image: "/images/work-2.jpg",
    tag: "ПВХ-патчи",
    title: "Объёмные патчи на одежду",
    text: "Рельефные ПВХ-нашивки с логотипом. Для курток, рюкзаков и коллекций, где нужен объём.",
  },
  {
    slug: "banner",
    image: "/images/work-3.jpg",
    tag: "Баннеры",
    title: "Тканевый баннер на улицу",
    text: "Печать на ткани под конструкцию: акции, входные группы и сезонные коммуникации.",
  },
  {
    slug: "zip-pack",
    image: "/images/work-4.jpg",
    tag: "ZIP Lock",
    title: "Пакеты с бегунком под бренд",
    text: "ZIP Lock с одноцветной печатью. Тираж от 500 штук, считаем по размеру и плотности.",
  },
  {
    slug: "kraft",
    image: "/images/work-5.jpg",
    tag: "Крафт",
    title: "Крафтовые пакеты для выдачи",
    text: "Плотные пакеты с кручёными ручками под магазин, шоурум и доставку заказа.",
  },
  {
    slug: "elastic",
    image: "/images/work-6.jpg",
    tag: "Жаккардовая резинка",
    title: "Тканая лента с надписью",
    text: "Резинка и жаккардовая тесьма с логотипом для пояса, манжеты и внутренней отделки.",
  },
] as const;

export function getProduct(slug: string) {
  return products.find((item) => item.slug === slug);
}

export function getCategory(slug: string) {
  return categories.find((item) => item.slug === slug);
}

export function productsByCategory(slug: string) {
  return products.filter((item) => item.category === slug);
}

export function matchesProduct(product: Product, query: string) {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return [product.name, product.shortName, product.summary, product.type, product.slug]
    .join(" ")
    .toLowerCase()
    .includes(needle);
}

export function relatedProducts(product: Product, limit = 3) {
  return productsByCategory(product.category)
    .filter((item) => item.slug !== product.slug)
    .slice(0, limit);
}

export const featuredSlugs = [
  "jacquard",
  "satin",
  "birki-karton",
  "zip-pack",
  "merchi",
  "directtofilm",
  "kraft",
  "rubber",
];
