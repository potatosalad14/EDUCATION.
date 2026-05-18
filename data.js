/* ====== Demo data: предметы, уроки, тесты, ученики ====== */

window.SUBJECTS = [
  {
    id: "math",
    name: "Математика",
    emoji: "📐",
    short: "Алгебра, геометрия и анализ",
    color: "#5b63f5",
    bg: "linear-gradient(135deg, #c4cbff, #9aa5ff)",
    lessons: [
      {
        id: "m1",
        title: "Производная функции",
        duration: 12,
        body: [
          { type: "p", text: "Производная — фундаментальное понятие математического анализа, которое описывает скорость изменения функции в каждой точке." },
          { type: "p", text: "Формально, производная функции f(x) в точке x₀ — это предел отношения приращения функции к приращению аргумента, когда приращение аргумента стремится к нулю." },
          { type: "h2", text: "Определение" },
          { type: "formula", text: "f'(x₀) = lim (Δx → 0)  [ f(x₀ + Δx) − f(x₀) ] / Δx" },
          { type: "callout", text: "Производная показывает наклон касательной к графику функции в данной точке." },
          { type: "h2", text: "Основные правила дифференцирования" },
          { type: "ul", items: [
            "Производная константы равна нулю: (C)' = 0",
            "Производная степенной функции: (xⁿ)' = n · xⁿ⁻¹",
            "Производная суммы: (f + g)' = f' + g'",
            "Производная произведения: (f · g)' = f'g + fg'",
            "Производная частного: (f/g)' = (f'g − fg') / g²"
          ]},
          { type: "h2", text: "Геометрический смысл" },
          { type: "p", text: "Если в точке (x₀, f(x₀)) провести касательную к графику функции, то её угловой коэффициент будет равен значению производной в этой точке." }
        ],
        quiz: [
          { type: "single", q: "Чему равна производная функции f(x) = 5?", options: ["0", "5", "5x", "x"], correct: 0 },
          { type: "single", q: "Производная функции f(x) = x³ равна:", options: ["3x²", "x²", "3x", "x³/3"], correct: 0 },
          { type: "multi", q: "Какие правила дифференцирования верны?", options: ["(C)' = 0", "(x)' = 1", "(xⁿ)' = n · xⁿ⁻¹", "(f + g)' = f' · g'"], correct: [0,1,2] },
          { type: "input", q: "Производная функции f(x) = 2x в точке x = 5 равна:", correct: "2" },
          { type: "match", q: "Сопоставьте функции и их производные", pairs: [
            { left: "f(x) = x²", right: "2x" },
            { left: "f(x) = sin(x)", right: "cos(x)" },
            { left: "f(x) = e^x", right: "e^x" },
            { left: "f(x) = ln(x)", right: "1/x" }
          ]}
        ]
      },
      {
        id: "m2",
        title: "Интегралы",
        duration: 15,
        body: [
          { type: "p", text: "Интегрирование — операция, обратная дифференцированию. Интеграл функции — это семейство всех первообразных." },
          { type: "h2", text: "Неопределённый интеграл" },
          { type: "formula", text: "∫ f(x) dx = F(x) + C,   где F'(x) = f(x)" },
          { type: "callout", text: "Константа C добавляется потому, что производная любой константы равна нулю." },
          { type: "h2", text: "Определённый интеграл" },
          { type: "p", text: "Определённый интеграл от a до b — это число, равное площади криволинейной трапеции под графиком функции на отрезке [a; b]." },
          { type: "formula", text: "∫ₐᵇ f(x) dx = F(b) − F(a)" }
        ],
        quiz: [
          { type: "single", q: "Чему равен интеграл ∫ x dx?", options: ["x² + C", "x²/2 + C", "2x + C", "x + C"], correct: 1 },
          { type: "single", q: "∫ cos(x) dx = ?", options: ["sin(x) + C", "−sin(x) + C", "tan(x) + C", "cos(x)/2 + C"], correct: 0 },
          { type: "input", q: "∫₀¹ 2x dx равен:", correct: "1" }
        ]
      },
      {
        id: "m3",
        title: "Логарифмы",
        duration: 10,
        body: [
          { type: "p", text: "Логарифм числа b по основанию a — это показатель степени, в которую нужно возвести a, чтобы получить b." },
          { type: "formula", text: "logₐ(b) = c   ⇔   aᶜ = b" },
          { type: "h2", text: "Свойства логарифмов" },
          { type: "ul", items: [
            "logₐ(xy) = logₐ(x) + logₐ(y)",
            "logₐ(x/y) = logₐ(x) − logₐ(y)",
            "logₐ(xⁿ) = n · logₐ(x)",
            "logₐ(1) = 0",
            "logₐ(a) = 1"
          ]}
        ],
        quiz: [
          { type: "single", q: "log₂(8) равен:", options: ["2", "3", "4", "8"], correct: 1 },
          { type: "input", q: "log₁₀(1000) = ?", correct: "3" }
        ]
      }
    ]
  },
  {
    id: "physics",
    name: "Физика",
    emoji: "⚛️",
    short: "Механика, термодинамика, электричество",
    color: "#ff8b6b",
    bg: "linear-gradient(135deg, #ffd0c0, #ff8b6b)",
    lessons: [
      {
        id: "p1",
        title: "Законы Ньютона",
        duration: 14,
        body: [
          { type: "p", text: "Три закона Ньютона лежат в основе классической механики и описывают связь между движением тела и силами, действующими на него." },
          { type: "h2", text: "Первый закон (закон инерции)" },
          { type: "callout", text: "Тело сохраняет состояние покоя или равномерного прямолинейного движения, пока внешние силы не выведут его из этого состояния." },
          { type: "h2", text: "Второй закон" },
          { type: "formula", text: "F = m · a" },
          { type: "p", text: "Ускорение тела прямо пропорционально равнодействующей сил и обратно пропорционально его массе." },
          { type: "h2", text: "Третий закон" },
          { type: "p", text: "Силы, с которыми два тела действуют друг на друга, равны по модулю и противоположны по направлению." }
        ],
        quiz: [
          { type: "single", q: "Какая величина измеряется в Ньютонах?", options: ["Масса", "Сила", "Скорость", "Энергия"], correct: 1 },
          { type: "input", q: "Чему равна сила, действующая на тело массой 5 кг с ускорением 2 м/с²? (в Ньютонах)", correct: "10" },
          { type: "multi", q: "Что верно относительно первого закона Ньютона?", options: ["Описывает инерцию", "Применим к телам в ИСО", "F = m·a", "Сила реакции опоры"], correct: [0,1] }
        ]
      },
      {
        id: "p2",
        title: "Закон сохранения энергии",
        duration: 11,
        body: [
          { type: "p", text: "Полная механическая энергия замкнутой системы остаётся постоянной, если действуют только консервативные силы." },
          { type: "formula", text: "Eₖ + Eₚ = const" },
          { type: "h2", text: "Кинетическая энергия" },
          { type: "formula", text: "Eₖ = m·v² / 2" },
          { type: "h2", text: "Потенциальная энергия" },
          { type: "formula", text: "Eₚ = m·g·h" }
        ],
        quiz: [
          { type: "single", q: "Кинетическая энергия пропорциональна:", options: ["скорости", "квадрату скорости", "массе в квадрате", "ускорению"], correct: 1 },
          { type: "input", q: "Тело массой 2 кг движется со скоростью 3 м/с. Чему равна Eₖ? (в Дж)", correct: "9" }
        ]
      }
    ]
  },
  {
    id: "cs",
    name: "Информатика",
    emoji: "💻",
    short: "Программирование на Python",
    color: "#7c3aed",
    bg: "linear-gradient(135deg, #d4c2ff, #8b5cf6)",
    lessons: [
      {
        id: "c1",
        title: "Переменные и типы данных",
        duration: 8,
        body: [
          { type: "p", text: "Переменная — это именованное место в памяти, в котором хранится значение. В Python переменные создаются присваиванием:" },
          { type: "code", text: "name = \"Маша\"\nage = 17\npi = 3.14\nis_student = True" },
          { type: "h2", text: "Основные типы" },
          { type: "ul", items: [
            "int — целые числа: 1, 42, -7",
            "float — числа с плавающей точкой: 3.14",
            "str — строки: \"привет\"",
            "bool — логические значения: True / False",
            "list — списки: [1, 2, 3]"
          ]},
          { type: "callout", text: "Python — язык с динамической типизацией. Тип определяется автоматически при присваивании." }
        ],
        quiz: [
          { type: "single", q: "Какой тип данных у значения 3.14?", options: ["int", "float", "str", "bool"], correct: 1 },
          { type: "single", q: "Как создать список в Python?", options: ["{1,2,3}", "(1,2,3)", "[1,2,3]", "<1,2,3>"], correct: 2 },
          { type: "input", q: "Какая функция вернёт длину строки s в Python? (одно слово)", correct: "len" },
          { type: "match", q: "Сопоставьте значение и его тип", pairs: [
            { left: "42", right: "int" },
            { left: "\"hi\"", right: "str" },
            { left: "True", right: "bool" },
            { left: "3.0", right: "float" }
          ]}
        ]
      },
      {
        id: "c2",
        title: "Условия и циклы",
        duration: 12,
        body: [
          { type: "p", text: "Условные операторы позволяют выполнять разные блоки кода в зависимости от значения выражения." },
          { type: "code", text: "if score >= 90:\n    grade = \"A\"\nelif score >= 70:\n    grade = \"B\"\nelse:\n    grade = \"C\"" },
          { type: "h2", text: "Цикл for" },
          { type: "code", text: "for i in range(5):\n    print(i)" },
          { type: "h2", text: "Цикл while" },
          { type: "code", text: "n = 10\nwhile n > 0:\n    n -= 1" }
        ],
        quiz: [
          { type: "single", q: "Сколько раз выполнится цикл for i in range(3)?", options: ["2", "3", "4", "Бесконечно"], correct: 1 },
          { type: "input", q: "Какое ключевое слово завершает цикл досрочно? (англ.)", correct: "break" }
        ]
      }
    ]
  },
  {
    id: "english",
    name: "Английский язык",
    emoji: "🇬🇧",
    short: "Грамматика и лексика",
    color: "#3ddca6",
    bg: "linear-gradient(135deg, #c0f0d8, #3ddca6)",
    lessons: [
      {
        id: "e1",
        title: "Present Simple vs Present Continuous",
        duration: 10,
        body: [
          { type: "p", text: "Present Simple используется для регулярных, повторяющихся или постоянных действий. Present Continuous — для действий, происходящих сейчас, в момент речи." },
          { type: "h2", text: "Present Simple" },
          { type: "ul", items: [
            "I work at school.",
            "She speaks three languages.",
            "We usually go to the park on Sundays."
          ]},
          { type: "h2", text: "Present Continuous" },
          { type: "ul", items: [
            "I am working right now.",
            "She is speaking to her teacher.",
            "We are going to the park (this evening)."
          ]},
          { type: "callout", text: "Маркеры Present Simple: usually, often, every day. Маркеры Continuous: now, at the moment, right now." }
        ],
        quiz: [
          { type: "single", q: "She ___ to school every day.", options: ["go", "goes", "is going", "going"], correct: 1 },
          { type: "single", q: "Look! It ___ outside.", options: ["rains", "is raining", "rain", "raining"], correct: 1 },
          { type: "input", q: "I usually ___ coffee in the morning. (drink/drinks)", correct: "drink" }
        ]
      }
    ]
  },
  {
    id: "history",
    name: "История",
    emoji: "🏛️",
    short: "От древности до наших дней",
    color: "#ffb547",
    bg: "linear-gradient(135deg, #ffe5b4, #ffb547)",
    lessons: [
      {
        id: "h1",
        title: "Древний Рим: становление империи",
        duration: 13,
        body: [
          { type: "p", text: "Древний Рим прошёл путь от небольшого поселения на холмах Лация до огромной империи, охватывавшей Средиземноморье и большую часть Европы." },
          { type: "h2", text: "Ключевые периоды" },
          { type: "ul", items: [
            "Царский период (753–509 до н.э.)",
            "Республика (509–27 до н.э.)",
            "Империя (27 до н.э. – 476 н.э.)"
          ]},
          { type: "callout", text: "Конец Западной Римской империи традиционно датируется 476 годом — низложением Ромула Августула." }
        ],
        quiz: [
          { type: "single", q: "В каком году пал Рим?", options: ["476", "1453", "100", "44"], correct: 0 },
          { type: "single", q: "Кто был первым императором Рима?", options: ["Юлий Цезарь", "Октавиан Август", "Нерон", "Траян"], correct: 1 },
          { type: "input", q: "Как называется период с 509 по 27 до н.э.?", correct: "Республика" }
        ]
      }
    ]
  },
  {
    id: "biology",
    name: "Биология",
    emoji: "🧬",
    short: "Клетка, организм, экосистемы",
    color: "#10b981",
    bg: "linear-gradient(135deg, #b8edd8, #10b981)",
    lessons: [
      {
        id: "b1",
        title: "Строение клетки",
        duration: 11,
        body: [
          { type: "p", text: "Клетка — основная структурная и функциональная единица всех живых организмов. Все клетки имеют общие черты, но эукариотические и прокариотические клетки заметно различаются." },
          { type: "h2", text: "Основные органоиды" },
          { type: "ul", items: [
            "Ядро — хранит генетическую информацию",
            "Митохондрии — \"энергетические станции\" клетки",
            "Рибосомы — синтез белка",
            "Эндоплазматическая сеть — транспорт веществ",
            "Аппарат Гольджи — упаковка и сортировка"
          ]}
        ],
        quiz: [
          { type: "single", q: "Какой органоид называют «энергетической станцией» клетки?", options: ["Ядро", "Рибосома", "Митохондрия", "Лизосома"], correct: 2 },
          { type: "match", q: "Сопоставьте органоид и функцию", pairs: [
            { left: "Ядро", right: "Хранение ДНК" },
            { left: "Рибосома", right: "Синтез белка" },
            { left: "Митохондрия", right: "Производство энергии" }
          ]}
        ]
      }
    ]
  },
  {
    id: "chemistry",
    name: "Химия",
    emoji: "🧪",
    short: "Атомы, реакции, периодическая таблица",
    color: "#ff6fa3",
    bg: "linear-gradient(135deg, #ffd0e0, #ff6fa3)",
    lessons: [
      {
        id: "ch1",
        title: "Периодический закон",
        duration: 10,
        body: [
          { type: "p", text: "Периодический закон Д. И. Менделеева — фундаментальный закон природы, описывающий зависимость свойств химических элементов от заряда их атомных ядер." },
          { type: "callout", text: "Свойства элементов и их соединений находятся в периодической зависимости от величины зарядов ядер их атомов." },
          { type: "h2", text: "Структура таблицы" },
          { type: "ul", items: [
            "Период — горизонтальный ряд",
            "Группа — вертикальный столбец",
            "Атомный номер = заряд ядра"
          ]}
        ],
        quiz: [
          { type: "single", q: "Кто открыл периодический закон?", options: ["Ломоносов", "Менделеев", "Бутлеров", "Лавуазье"], correct: 1 },
          { type: "input", q: "Сколько групп в короткой форме периодической таблицы?", correct: "8" }
        ]
      }
    ]
  }
];

/* === Демо-ученики (для препода) === */
window.STUDENTS = [
  { id: "s1", name: "Анна Иванова",   group: "10-А", avg: 92, completed: 18, total: 22, last: "2 ч назад", trend: "up" },
  { id: "s2", name: "Михаил Петров",  group: "10-А", avg: 78, completed: 14, total: 22, last: "вчера", trend: "up" },
  { id: "s3", name: "Елена Смирнова", group: "10-Б", avg: 85, completed: 16, total: 22, last: "3 ч назад", trend: "flat" },
  { id: "s4", name: "Дмитрий Козлов", group: "10-А", avg: 64, completed: 11, total: 22, last: "5 дн назад", trend: "down" },
  { id: "s5", name: "Ольга Морозова", group: "10-Б", avg: 96, completed: 21, total: 22, last: "1 ч назад", trend: "up" },
  { id: "s6", name: "Артём Соколов",  group: "10-А", avg: 71, completed: 13, total: 22, last: "вчера", trend: "up" },
  { id: "s7", name: "Софья Лебедева", group: "10-Б", avg: 88, completed: 17, total: 22, last: "сегодня", trend: "flat" },
  { id: "s8", name: "Иван Новиков",   group: "10-А", avg: 55, completed: 8,  total: 22, last: "неделю назад", trend: "down" },
  { id: "s9", name: "Кира Волкова",   group: "10-Б", avg: 81, completed: 15, total: 22, last: "2 дн назад", trend: "up" },
  { id: "s10",name: "Тимур Орлов",    group: "10-А", avg: 73, completed: 12, total: 22, last: "вчера", trend: "flat" }
];

window.RECENT_ACTIVITY = [
  { who: "Ольга Морозова", action: "прошла тест", subject: "Математика", topic: "Производная функции", score: 100, ago: "1 ч" },
  { who: "Анна Иванова",   action: "прошла тест", subject: "Физика", topic: "Законы Ньютона", score: 92, ago: "2 ч" },
  { who: "Елена Смирнова", action: "изучила теорию", subject: "Биология", topic: "Строение клетки", score: null, ago: "3 ч" },
  { who: "Артём Соколов",  action: "прошёл тест", subject: "Информатика", topic: "Переменные и типы", score: 67, ago: "5 ч" },
  { who: "Софья Лебедева", action: "прошла тест", subject: "История", topic: "Древний Рим", score: 88, ago: "сегодня" }
];
