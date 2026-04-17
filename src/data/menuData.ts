export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
  category: string;
  image: string;
  tags: string[];
  available: boolean;
}

export interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'ready' | 'delivered' | 'cancelled';
}

export const categories = [
  { id: 'all', label: 'Всё меню', emoji: '🍽️' },
  { id: 'breakfast', label: 'Завтрак', emoji: '🥞' },
  { id: 'soup', label: 'Супы', emoji: '🍲' },
  { id: 'main', label: 'Горячее', emoji: '🍗' },
  { id: 'salad', label: 'Салаты', emoji: '🥗' },
  { id: 'dessert', label: 'Десерты', emoji: '🍰' },
  { id: 'drink', label: 'Напитки', emoji: '🥤' },
];

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Каша овсяная с ягодами',
    description: 'Нежная овсяная каша с малиной и черникой, мёдом',
    price: 85,
    calories: 320,
    proteins: 8,
    fats: 6,
    carbs: 58,
    category: 'breakfast',
    image: '',
    tags: ['Полезно', 'Без глютена'],
    available: true,
  },
  {
    id: 2,
    name: 'Блинчики со сметаной',
    description: 'Тонкие блинчики со сметаной и вареньем',
    price: 110,
    calories: 420,
    proteins: 10,
    fats: 18,
    carbs: 55,
    category: 'breakfast',
    image: '',
    tags: ['Любимое'],
    available: true,
  },
  {
    id: 3,
    name: 'Борщ украинский',
    description: 'Наваристый борщ со свёклой, капустой и сметаной',
    price: 120,
    calories: 280,
    proteins: 12,
    fats: 10,
    carbs: 32,
    category: 'soup',
    image: '',
    tags: ['Горячее', 'Сытно'],
    available: true,
  },
  {
    id: 4,
    name: 'Куриный суп с лапшой',
    description: 'Лёгкий куриный бульон с домашней лапшой и зеленью',
    price: 105,
    calories: 220,
    proteins: 15,
    fats: 6,
    carbs: 25,
    category: 'soup',
    image: '',
    tags: ['Лёгкое', 'Горячее'],
    available: true,
  },
  {
    id: 5,
    name: 'Котлета по-домашнему',
    description: 'Сочная котлета из говядины с картофельным пюре',
    price: 165,
    calories: 540,
    proteins: 28,
    fats: 24,
    carbs: 45,
    category: 'main',
    image: '',
    tags: ['Сытно', 'Хит'],
    available: true,
  },
  {
    id: 6,
    name: 'Рыба запечённая с овощами',
    description: 'Филе трески запечённое с брокколи и морковью',
    price: 175,
    calories: 380,
    proteins: 32,
    fats: 12,
    carbs: 28,
    category: 'main',
    image: '',
    tags: ['Полезно', 'Рыба'],
    available: true,
  },
  {
    id: 7,
    name: 'Греческий салат',
    description: 'Свежие томаты, огурцы, оливки, брынза',
    price: 95,
    calories: 180,
    proteins: 6,
    fats: 12,
    carbs: 14,
    category: 'salad',
    image: '',
    tags: ['Свежее', 'Полезно'],
    available: true,
  },
  {
    id: 8,
    name: 'Витаминный салат',
    description: 'Капуста, морковь, яблоко с лимонной заправкой',
    price: 75,
    calories: 120,
    proteins: 3,
    fats: 4,
    carbs: 22,
    category: 'salad',
    image: '',
    tags: ['Полезно', 'Витамины'],
    available: true,
  },
  {
    id: 9,
    name: 'Яблочный пирог',
    description: 'Домашний пирог с корицей и яблочной начинкой',
    price: 80,
    calories: 360,
    proteins: 5,
    fats: 14,
    carbs: 54,
    category: 'dessert',
    image: '',
    tags: ['Сладкое', 'Любимое'],
    available: true,
  },
  {
    id: 10,
    name: 'Творожная запеканка',
    description: 'Нежная запеканка с изюмом и сметаной',
    price: 90,
    calories: 290,
    proteins: 14,
    fats: 10,
    carbs: 38,
    category: 'dessert',
    image: '',
    tags: ['Полезно', 'Сладкое'],
    available: true,
  },
  {
    id: 11,
    name: 'Компот из сухофруктов',
    description: 'Натуральный компот из яблок, слив и груш',
    price: 45,
    calories: 85,
    proteins: 0,
    fats: 0,
    carbs: 20,
    category: 'drink',
    image: '',
    tags: ['Натуральное'],
    available: true,
  },
  {
    id: 12,
    name: 'Какао с молоком',
    description: 'Горячее какао на натуральном молоке',
    price: 55,
    calories: 140,
    proteins: 5,
    fats: 5,
    carbs: 18,
    category: 'drink',
    image: '',
    tags: ['Горячее', 'Любимое'],
    available: true,
  },
];

export const orderHistory: Order[] = [
  {
    id: 'ORD-001',
    date: '2026-04-17',
    items: [
      { menuItem: menuItems[0], quantity: 1 },
      { menuItem: menuItems[2], quantity: 1 },
      { menuItem: menuItems[10], quantity: 1 },
    ],
    total: 250,
    status: 'delivered',
  },
  {
    id: 'ORD-002',
    date: '2026-04-16',
    items: [
      { menuItem: menuItems[1], quantity: 1 },
      { menuItem: menuItems[4], quantity: 1 },
      { menuItem: menuItems[8], quantity: 1 },
    ],
    total: 355,
    status: 'delivered',
  },
  {
    id: 'ORD-003',
    date: '2026-04-15',
    items: [
      { menuItem: menuItems[3], quantity: 1 },
      { menuItem: menuItems[5], quantity: 1 },
      { menuItem: menuItems[11], quantity: 1 },
    ],
    total: 335,
    status: 'delivered',
  },
];
