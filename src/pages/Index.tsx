import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";

const IMAGES = {
  borsch: "https://cdn.poehali.dev/projects/cf6339a2-2ba4-4bf9-9345-a625f73f11ae/files/bcf2c890-91f1-43f7-bafd-c46e104dac65.jpg",
  pasta: "https://cdn.poehali.dev/projects/cf6339a2-2ba4-4bf9-9345-a625f73f11ae/files/6a406ce6-f38f-4aed-99c4-5b7d96dc3875.jpg",
  fruit: "https://cdn.poehali.dev/projects/cf6339a2-2ba4-4bf9-9345-a625f73f11ae/files/f656ffda-21c7-41c9-ac98-f9802dbd3d28.jpg",
};

type Role = "child" | "parent" | "teacher";
type Section = "catalog" | "order" | "history" | "nutrition" | "reminders" | "profile" | "support";

const dishes = [
  {
    id: 1,
    name: "Борщ со сметаной",
    category: "Первое",
    price: 65,
    calories: 210,
    proteins: 8,
    fats: 9,
    carbs: 22,
    img: IMAGES.borsch,
    tags: ["горячее", "суп"],
    description: "Наваристый домашний борщ с говядиной, свёклой и ложкой сметаны",
    available: true,
  },
  {
    id: 2,
    name: "Паста с котлетой",
    category: "Второе",
    price: 95,
    calories: 420,
    proteins: 28,
    fats: 14,
    carbs: 48,
    img: IMAGES.pasta,
    tags: ["горячее", "мясо"],
    description: "Макароны с нежной куриной котлетой и свежим овощным салатом",
    available: true,
  },
  {
    id: 3,
    name: "Фруктовый салат",
    category: "Десерт",
    price: 55,
    calories: 145,
    proteins: 2,
    fats: 1,
    carbs: 32,
    img: IMAGES.fruit,
    tags: ["десерт", "фрукты"],
    description: "Яблоки, бананы, клубника и апельсины с йогуртовой заправкой",
    available: true,
  },
  {
    id: 4,
    name: "Омлет с сыром",
    category: "Завтрак",
    price: 75,
    calories: 290,
    proteins: 18,
    fats: 20,
    carbs: 8,
    img: IMAGES.borsch,
    tags: ["завтрак", "яйца"],
    description: "Пышный омлет из двух яиц с тёртым сыром и зеленью",
    available: false,
  },
  {
    id: 5,
    name: "Гречка с курицей",
    category: "Второе",
    price: 85,
    calories: 380,
    proteins: 32,
    fats: 10,
    carbs: 40,
    img: IMAGES.pasta,
    tags: ["горячее", "мясо"],
    description: "Рассыпчатая гречка с тушёной курицей и соусом",
    available: true,
  },
  {
    id: 6,
    name: "Компот из сухофруктов",
    category: "Напиток",
    price: 25,
    calories: 80,
    proteins: 0,
    fats: 0,
    carbs: 20,
    img: IMAGES.fruit,
    tags: ["напиток"],
    description: "Домашний компот из чернослива, кураги и изюма",
    available: true,
  },
];

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт"];
const fullWeekDays = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница"];

const historyData = [
  { date: "15 апр", items: ["Борщ со сметаной", "Компот"], total: 90, status: "paid" },
  { date: "14 апр", items: ["Паста с котлетой", "Фруктовый салат"], total: 150, status: "paid" },
  { date: "13 апр", items: ["Гречка с курицей", "Компот"], total: 110, status: "paid" },
  { date: "12 апр", items: ["Омлет с сыром", "Борщ"], total: 140, status: "paid" },
  { date: "11 апр", items: ["Паста с котлетой"], total: 95, status: "paid" },
];

const categoryColors: Record<string, string> = {
  "Первое": "bg-blue-100 text-blue-700",
  "Второе": "bg-orange-100 text-orange-700",
  "Десерт": "bg-pink-100 text-pink-700",
  "Завтрак": "bg-yellow-100 text-yellow-700",
  "Напиток": "bg-green-100 text-green-700",
};

const roleConfig = {
  child: { label: "Ученик", icon: "GraduationCap", color: "from-orange-400 to-pink-500" },
  parent: { label: "Родитель", icon: "Heart", color: "from-green-400 to-teal-500" },
  teacher: { label: "Учитель", icon: "BookOpen", color: "from-purple-400 to-indigo-500" },
};

const navItems: { id: Section; label: string; icon: string }[] = [
  { id: "catalog", label: "Меню", icon: "UtensilsCrossed" },
  { id: "order", label: "Заказ", icon: "ShoppingCart" },
  { id: "history", label: "История", icon: "ClipboardList" },
  { id: "nutrition", label: "Питание", icon: "Apple" },
  { id: "reminders", label: "Уведомления", icon: "Bell" },
  { id: "profile", label: "Профиль", icon: "User" },
  { id: "support", label: "Поддержка", icon: "MessageCircle" },
];

export default function Index() {
  const [role, setRole] = useState<Role | null>(null);
  const [section, setSection] = useState<Section>("catalog");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [selectedDay, setSelectedDay] = useState(0);
  const [weekOrder, setWeekOrder] = useState<Record<number, number[]>>({});
  const [activeCategory, setActiveCategory] = useState("Все");
  const [expandedDish, setExpandedDish] = useState<number | null>(null);
  const [reminderToggles, setReminderToggles] = useState({ morning: true, newDish: true, lowBalance: false });
  const [notificationCount] = useState(2);

  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const dish = dishes.find((d) => d.id === Number(id));
    return sum + (dish?.price || 0) * qty;
  }, 0);

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const addToCart = (id: number) => setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const removeFromCart = (id: number) =>
    setCart((prev) => {
      const next = { ...prev };
      if (next[id] > 1) next[id]--;
      else delete next[id];
      return next;
    });

  const toggleWeekDish = (day: number, dishId: number) => {
    setWeekOrder((prev) => {
      const dayItems = prev[day] || [];
      if (dayItems.includes(dishId)) {
        return { ...prev, [day]: dayItems.filter((d) => d !== dishId) };
      } else {
        return { ...prev, [day]: [...dayItems, dishId] };
      }
    });
  };

  const categories = ["Все", ...Array.from(new Set(dishes.map((d) => d.category)))];
  const filteredDishes =
    activeCategory === "Все" ? dishes : dishes.filter((d) => d.category === activeCategory);

  // Role selection screen
  if (!role) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-50 to-pink-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-[-60px] left-[-60px] w-64 h-64 bg-orange-300 blob animate-float" />
        <div className="absolute bottom-[-40px] right-[-40px] w-72 h-72 bg-pink-300 blob animate-float delay-300" />
        <div className="absolute top-1/2 left-[-80px] w-48 h-48 bg-yellow-300 blob animate-float delay-500" />

        <div className="relative z-10 text-center mb-10 animate-fade-up">
          <div className="text-7xl mb-4 animate-float inline-block">🍽️</div>
          <h1 className="text-5xl font-nunito font-black text-orange-600 mb-2">ШколоЕда</h1>
          <p className="text-lg text-orange-400 font-rubik font-medium">Вкусно, полезно, весело!</p>
        </div>

        <div className="relative z-10 w-full max-w-sm space-y-4">
          <p className="text-center text-gray-600 font-rubik font-semibold text-lg mb-6 animate-fade-up delay-100">
            Кто ты сегодня?
          </p>
          {(["child", "parent", "teacher"] as Role[]).map((r, i) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`w-full py-5 px-6 rounded-3xl bg-gradient-to-r ${roleConfig[r].color} text-white font-nunito font-black text-xl shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-4 animate-fade-up`}
              style={{ animationDelay: `${(i + 2) * 0.1}s` }}
            >
              <span className="text-3xl">
                {r === "child" ? "🎒" : r === "parent" ? "👨‍👩‍👧" : "📚"}
              </span>
              {roleConfig[r].label}
            </button>
          ))}
        </div>

        <p className="relative z-10 mt-10 text-sm text-orange-300 font-rubik animate-fade-up delay-500">
          Школьная столовая • {new Date().getFullYear()}
        </p>
      </div>
    );
  }

  const roleColor = roleConfig[role].color;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 flex flex-col max-w-md mx-auto relative">
      {/* Header */}
      <header className={`bg-gradient-to-r ${roleColor} text-white px-5 pt-10 pb-6 rounded-b-3xl shadow-lg`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/70 text-sm font-rubik">Привет!</p>
            <h2 className="text-2xl font-nunito font-black">
              {role === "child" ? "Алёша Петров 🎒" : role === "parent" ? "Мария Петрова 👋" : "Ирина Сергеевна 📚"}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSection("reminders")}
              className="relative bg-white/20 rounded-2xl p-2.5"
            >
              <Icon name="Bell" size={22} />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-gray-900 text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>
            <button onClick={() => setRole(null)} className="bg-white/20 rounded-2xl p-2.5">
              <Icon name="LogOut" size={22} />
            </button>
          </div>
        </div>

        {/* Balance */}
        <div className="mt-4 bg-white/20 rounded-2xl px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-white/70 text-xs font-rubik">Баланс</p>
            <p className="text-2xl font-nunito font-black">850 ₽</p>
          </div>
          <button className="bg-white text-orange-500 font-nunito font-black text-sm px-4 py-2 rounded-xl hover:scale-105 transition-transform">
            Пополнить
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto pb-24 px-4 pt-5">
        {/* CATALOG */}
        {section === "catalog" && (
          <div className="animate-fade-up">
            <h3 className="text-2xl font-nunito font-black text-gray-800 mb-4">Меню на сегодня</h3>

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-4 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 px-4 py-2 rounded-2xl font-rubik font-semibold text-sm transition-all ${
                    activeCategory === cat
                      ? "bg-orange-500 text-white shadow-md scale-105"
                      : "bg-white text-gray-500 border border-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Dishes */}
            <div className="space-y-4">
              {filteredDishes.map((dish, i) => (
                <div
                  key={dish.id}
                  className={`bg-white rounded-3xl shadow-sm overflow-hidden card-hover animate-fade-up`}
                  style={{ animationDelay: `${i * 0.07}s` }}
                >
                  <div className="flex gap-3 p-4">
                    <img
                      src={dish.img}
                      alt={dish.name}
                      className="w-24 h-24 rounded-2xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className={`text-xs font-rubik font-semibold px-2 py-0.5 rounded-full ${categoryColors[dish.category] || "bg-gray-100 text-gray-600"}`}>
                            {dish.category}
                          </span>
                          <h4 className="font-nunito font-bold text-gray-800 mt-1 leading-tight">{dish.name}</h4>
                        </div>
                        {!dish.available && (
                          <Badge variant="secondary" className="text-xs flex-shrink-0">Нет</Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 font-rubik mt-1 line-clamp-2">{dish.description}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Icon name="Flame" size={12} className="text-orange-400" />
                        <span className="text-xs text-gray-500 font-rubik">{dish.calories} ккал</span>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <span className="font-nunito font-black text-orange-500 text-lg">{dish.price} ₽</span>
                        {dish.available ? (
                          cart[dish.id] ? (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => removeFromCart(dish.id)}
                                className="w-7 h-7 rounded-full bg-orange-100 text-orange-500 font-black flex items-center justify-center hover:bg-orange-200 transition-colors"
                              >
                                −
                              </button>
                              <span className="font-nunito font-black text-gray-800 w-4 text-center">{cart[dish.id]}</span>
                              <button
                                onClick={() => addToCart(dish.id)}
                                className="w-7 h-7 rounded-full bg-orange-500 text-white font-black flex items-center justify-center hover:bg-orange-600 transition-colors"
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => addToCart(dish.id)}
                              className="bg-orange-500 text-white text-xs font-nunito font-bold px-3 py-1.5 rounded-xl hover:bg-orange-600 hover:scale-105 transition-all active:scale-95"
                            >
                              В корзину
                            </button>
                          )
                        ) : (
                          <span className="text-xs text-gray-400 font-rubik">Недоступно</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Nutrition expand */}
                  <button
                    onClick={() => setExpandedDish(expandedDish === dish.id ? null : dish.id)}
                    className="w-full px-4 pb-3 flex items-center gap-1 text-xs text-gray-400 font-rubik hover:text-orange-400 transition-colors"
                  >
                    <Icon name="ChevronDown" size={14} className={`transition-transform ${expandedDish === dish.id ? "rotate-180" : ""}`} />
                    Пищевая ценность
                  </button>
                  {expandedDish === dish.id && (
                    <div className="px-4 pb-4 grid grid-cols-3 gap-2 animate-scale-in">
                      {[
                        { label: "Белки", value: dish.proteins, unit: "г", color: "bg-blue-50 text-blue-600" },
                        { label: "Жиры", value: dish.fats, unit: "г", color: "bg-yellow-50 text-yellow-600" },
                        { label: "Углеводы", value: dish.carbs, unit: "г", color: "bg-green-50 text-green-600" },
                      ].map((n) => (
                        <div key={n.label} className={`${n.color} rounded-2xl p-2 text-center`}>
                          <p className="text-lg font-nunito font-black">{n.value}{n.unit}</p>
                          <p className="text-xs font-rubik">{n.label}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ORDER */}
        {section === "order" && (
          <div className="animate-fade-up">
            <h3 className="text-2xl font-nunito font-black text-gray-800 mb-2">Заказ на неделю</h3>
            <p className="text-sm text-gray-500 font-rubik mb-4">Выбери блюда на каждый день</p>

            {/* Days selector */}
            <div className="flex gap-2 mb-5">
              {weekDays.map((d, i) => (
                <button
                  key={d}
                  onClick={() => setSelectedDay(i)}
                  className={`flex-1 py-3 rounded-2xl font-nunito font-bold text-sm transition-all ${
                    selectedDay === i
                      ? "bg-orange-500 text-white shadow-md scale-105"
                      : "bg-white text-gray-500 border border-gray-200"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            <h4 className="font-nunito font-bold text-gray-700 mb-3">{fullWeekDays[selectedDay]}</h4>

            <div className="space-y-3">
              {dishes.filter((d) => d.available).map((dish) => {
                const selected = (weekOrder[selectedDay] || []).includes(dish.id);
                return (
                  <button
                    key={dish.id}
                    onClick={() => toggleWeekDish(selectedDay, dish.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-2xl border-2 transition-all text-left ${
                      selected
                        ? "border-orange-400 bg-orange-50"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <img src={dish.img} alt={dish.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-nunito font-bold text-gray-800 text-sm">{dish.name}</p>
                      <p className="text-xs text-gray-500 font-rubik">{dish.calories} ккал · {dish.price} ₽</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${selected ? "bg-orange-500" : "border-2 border-gray-300"}`}>
                      {selected && <Icon name="Check" size={14} className="text-white" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Week summary */}
            {Object.keys(weekOrder).length > 0 && (
              <div className="mt-5 bg-orange-50 rounded-3xl p-4 border border-orange-100">
                <h4 className="font-nunito font-bold text-orange-700 mb-2">Итого за неделю</h4>
                {weekDays.map((d, i) => {
                  const dayDishes = (weekOrder[i] || []).map((id) => dishes.find((d) => d.id === id)!).filter(Boolean);
                  const dayTotal = dayDishes.reduce((s, d) => s + d.price, 0);
                  if (!dayDishes.length) return null;
                  return (
                    <div key={d} className="flex justify-between text-sm font-rubik py-1 border-b border-orange-100 last:border-0">
                      <span className="text-gray-600">{d}: {dayDishes.map((d) => d.name).join(", ")}</span>
                      <span className="font-semibold text-orange-600 flex-shrink-0 ml-2">{dayTotal} ₽</span>
                    </div>
                  );
                })}
                <button className="mt-3 w-full bg-orange-500 text-white font-nunito font-bold py-3 rounded-2xl hover:bg-orange-600 hover:scale-105 transition-all active:scale-95">
                  Оформить заказ
                </button>
              </div>
            )}

            {/* Cart from catalog */}
            {cartCount > 0 && (
              <div className="mt-4 bg-white rounded-3xl shadow-sm p-4 border border-gray-100">
                <h4 className="font-nunito font-bold text-gray-800 mb-3">Корзина на сегодня</h4>
                {Object.entries(cart).map(([id, qty]) => {
                  const dish = dishes.find((d) => d.id === Number(id));
                  if (!dish) return null;
                  return (
                    <div key={id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <span className="font-rubik text-sm text-gray-700">{dish.name} × {qty}</span>
                      <span className="font-nunito font-bold text-orange-500">{dish.price * qty} ₽</span>
                    </div>
                  );
                })}
                <div className="flex justify-between mt-3 pt-2 border-t border-gray-100">
                  <span className="font-nunito font-bold text-gray-800">Итого</span>
                  <span className="font-nunito font-black text-orange-500 text-lg">{cartTotal} ₽</span>
                </div>
                <button className="mt-3 w-full bg-green-500 text-white font-nunito font-bold py-3 rounded-2xl hover:bg-green-600 hover:scale-105 transition-all active:scale-95">
                  Оплатить {cartTotal} ₽
                </button>
              </div>
            )}
          </div>
        )}

        {/* HISTORY */}
        {section === "history" && (
          <div className="animate-fade-up">
            <h3 className="text-2xl font-nunito font-black text-gray-800 mb-2">История заказов</h3>
            <div className="bg-gradient-to-r from-green-400 to-teal-500 rounded-3xl p-4 mb-5 text-white">
              <p className="text-white/70 text-sm font-rubik">Потрачено в апреле</p>
              <p className="text-3xl font-nunito font-black">585 ₽</p>
              <div className="flex items-center gap-1 mt-1">
                <Icon name="TrendingDown" size={16} className="text-white/70" />
                <span className="text-white/70 text-sm font-rubik">−12% к прошлому месяцу</span>
              </div>
            </div>

            <div className="space-y-3">
              {historyData.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-3xl shadow-sm p-4 flex items-center justify-between card-hover animate-fade-up"
                  style={{ animationDelay: `${i * 0.07}s` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Icon name="UtensilsCrossed" size={20} className="text-orange-500" />
                    </div>
                    <div>
                      <p className="font-nunito font-bold text-gray-800 text-sm">{item.date}</p>
                      <p className="text-xs text-gray-500 font-rubik">{item.items.join(", ")}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-nunito font-black text-orange-500">{item.total} ₽</p>
                    <span className="text-xs text-green-500 font-rubik">✓ Оплачено</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NUTRITION */}
        {section === "nutrition" && (
          <div className="animate-fade-up">
            <h3 className="text-2xl font-nunito font-black text-gray-800 mb-2">Питание и калории</h3>
            <p className="text-sm text-gray-500 font-rubik mb-4">Статистика за сегодня</p>

            {/* Daily goal */}
            <div className="bg-white rounded-3xl shadow-sm p-5 mb-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-nunito font-bold text-gray-800">Калории за день</h4>
                <span className="font-nunito font-black text-orange-500">630 / 1800 ккал</span>
              </div>
              <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-400 to-pink-500 rounded-full transition-all"
                  style={{ width: "35%" }}
                />
              </div>
              <p className="text-xs text-gray-400 font-rubik mt-2">35% дневной нормы</p>
            </div>

            {/* Macros */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: "Белки", val: 38, max: 90, unit: "г", color: "from-blue-400 to-blue-500", bg: "bg-blue-50", text: "text-blue-600" },
                { label: "Жиры", val: 24, max: 70, unit: "г", color: "from-yellow-400 to-orange-400", bg: "bg-yellow-50", text: "text-yellow-600" },
                { label: "Углеводы", val: 90, max: 250, unit: "г", color: "from-green-400 to-teal-400", bg: "bg-green-50", text: "text-green-600" },
              ].map((m) => (
                <div key={m.label} className={`${m.bg} rounded-3xl p-4 text-center`}>
                  <div className="w-12 h-12 rounded-full bg-white mx-auto mb-2 flex items-center justify-center shadow-sm">
                    <span className={`font-nunito font-black text-sm ${m.text}`}>{Math.round((m.val / m.max) * 100)}%</span>
                  </div>
                  <p className={`text-lg font-nunito font-black ${m.text}`}>{m.val}{m.unit}</p>
                  <p className="text-xs text-gray-500 font-rubik">{m.label}</p>
                </div>
              ))}
            </div>

            {/* Today's eaten */}
            <div className="bg-white rounded-3xl shadow-sm p-4">
              <h4 className="font-nunito font-bold text-gray-800 mb-3">Съедено сегодня</h4>
              {[
                { name: "Борщ со сметаной", cal: 210, time: "12:30", emoji: "🍲" },
                { name: "Компот из сухофруктов", cal: 80, time: "12:35", emoji: "🥤" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
                  <span className="text-2xl">{item.emoji}</span>
                  <div className="flex-1">
                    <p className="font-rubik font-semibold text-gray-800 text-sm">{item.name}</p>
                    <p className="text-xs text-gray-400 font-rubik">{item.time}</p>
                  </div>
                  <span className="text-sm font-nunito font-bold text-orange-500">{item.cal} ккал</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* REMINDERS */}
        {section === "reminders" && (
          <div className="animate-fade-up">
            <h3 className="text-2xl font-nunito font-black text-gray-800 mb-2">Уведомления</h3>

            {/* New notifications */}
            <div className="space-y-3 mb-5">
              {[
                { icon: "🍕", title: "Новое блюдо!", text: "Пицца Маргарита — завтра в меню", time: "5 мин назад", new: true },
                { icon: "💰", title: "Баланс пополнен", text: "На счёт зачислено 500 ₽", time: "2 часа назад", new: true },
                { icon: "🛒", title: "Заказ принят", text: "Борщ + Компот на 15 апр", time: "Вчера", new: false },
              ].map((n, i) => (
                <div
                  key={i}
                  className={`bg-white rounded-3xl shadow-sm p-4 flex items-start gap-3 animate-fade-up ${n.new ? "border-l-4 border-orange-400" : ""}`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <span className="text-2xl">{n.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-nunito font-bold text-gray-800 text-sm">{n.title}</p>
                      {n.new && <span className="w-2 h-2 bg-orange-400 rounded-full" />}
                    </div>
                    <p className="text-xs text-gray-500 font-rubik">{n.text}</p>
                    <p className="text-xs text-gray-400 font-rubik mt-1">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Settings */}
            <h4 className="font-nunito font-bold text-gray-700 mb-3">Настройки уведомлений</h4>
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
              {[
                { key: "morning" as const, icon: "☀️", label: "Напоминание утром", desc: "В 8:00 — не забудь заказать обед" },
                { key: "newDish" as const, icon: "✨", label: "Новые блюда", desc: "Когда появится что-то вкусненькое" },
                { key: "lowBalance" as const, icon: "💳", label: "Низкий баланс", desc: "Когда меньше 200 ₽ на счёте" },
              ].map((item, i) => (
                <div key={item.key} className={`flex items-center gap-3 p-4 ${i < 2 ? "border-b border-gray-50" : ""}`}>
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex-1">
                    <p className="font-rubik font-semibold text-gray-800 text-sm">{item.label}</p>
                    <p className="text-xs text-gray-400 font-rubik">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => setReminderToggles((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
                    className={`relative w-12 h-6 rounded-full transition-all flex-shrink-0 ${reminderToggles[item.key] ? "bg-orange-500" : "bg-gray-200"}`}
                  >
                    <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${reminderToggles[item.key] ? "left-6" : "left-0.5"}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROFILE */}
        {section === "profile" && (
          <div className="animate-fade-up">
            <h3 className="text-2xl font-nunito font-black text-gray-800 mb-4">Личный кабинет</h3>

            {/* Avatar */}
            <div className="bg-white rounded-3xl shadow-sm p-5 mb-4 text-center">
              <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${roleColor} flex items-center justify-center text-4xl mb-3 shadow-lg`}>
                {role === "child" ? "🎒" : role === "parent" ? "👨‍👩‍👧" : "📚"}
              </div>
              <h4 className="font-nunito font-black text-xl text-gray-800">
                {role === "child" ? "Алёша Петров" : role === "parent" ? "Мария Петрова" : "Ирина Сергеевна"}
              </h4>
              <p className="text-sm text-gray-500 font-rubik">{roleConfig[role].label} · 4«Б» класс</p>
              <button className="mt-3 text-sm text-orange-500 font-rubik font-semibold">Редактировать профиль</button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { icon: "🍽️", label: "Заказов в месяц", value: "22" },
                { icon: "💰", label: "Потрачено", value: "585 ₽" },
                { icon: "🔥", label: "Калорий/день", value: "~1650" },
                { icon: "⭐", label: "Любимое блюдо", value: "Борщ" },
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-3xl shadow-sm p-4">
                  <span className="text-2xl">{s.icon}</span>
                  <p className="font-nunito font-black text-gray-800 text-lg mt-1">{s.value}</p>
                  <p className="text-xs text-gray-500 font-rubik">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Menu */}
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
              {[
                { icon: "CreditCard", label: "Способы оплаты" },
                { icon: "Users", label: "Привязанные ученики" },
                { icon: "Shield", label: "Аллергены и диета" },
                { icon: "Settings", label: "Настройки" },
              ].map((item, i) => (
                <button key={i} className={`w-full flex items-center gap-3 px-5 py-4 hover:bg-orange-50 transition-colors text-left ${i < 3 ? "border-b border-gray-50" : ""}`}>
                  <div className="w-9 h-9 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Icon name={item.icon} fallback="Settings" size={18} className="text-orange-500" />
                  </div>
                  <span className="font-rubik font-medium text-gray-700 flex-1">{item.label}</span>
                  <Icon name="ChevronRight" size={18} className="text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SUPPORT */}
        {section === "support" && (
          <div className="animate-fade-up">
            <h3 className="text-2xl font-nunito font-black text-gray-800 mb-2">Служба поддержки</h3>
            <p className="text-sm text-gray-500 font-rubik mb-4">Мы всегда рады помочь!</p>

            {/* Contact cards */}
            <div className="space-y-3 mb-5">
              {[
                { icon: "📞", label: "Позвонить", desc: "+7 (495) 123-45-67", color: "bg-green-50 border-green-200" },
                { icon: "💬", label: "Написать в чат", desc: "Ответим за 5 минут", color: "bg-blue-50 border-blue-200" },
                { icon: "📧", label: "Email", desc: "help@skoloeda.ru", color: "bg-purple-50 border-purple-200" },
              ].map((c, i) => (
                <button key={i} className={`w-full flex items-center gap-4 p-4 rounded-3xl border ${c.color} text-left hover:scale-[1.02] transition-transform`}>
                  <span className="text-3xl">{c.icon}</span>
                  <div>
                    <p className="font-nunito font-bold text-gray-800">{c.label}</p>
                    <p className="text-sm text-gray-500 font-rubik">{c.desc}</p>
                  </div>
                  <Icon name="ChevronRight" size={18} className="text-gray-400 ml-auto" />
                </button>
              ))}
            </div>

            {/* FAQ */}
            <h4 className="font-nunito font-bold text-gray-700 mb-3">Частые вопросы</h4>
            <div className="space-y-2">
              {[
                { q: "Как пополнить баланс?", a: "Через приложение банка или на кассе столовой" },
                { q: "До скольки можно заказать на завтра?", a: "Заказы принимаются до 20:00 накануне" },
                { q: "Можно ли вернуть деньги за отменённый заказ?", a: "Да, средства возвращаются на баланс автоматически" },
              ].map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 shadow-sm">
                  <p className="font-rubik font-semibold text-gray-800 text-sm">{faq.q}</p>
                  <p className="text-xs text-gray-500 font-rubik mt-1">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Floating cart button */}
      {cartCount > 0 && section === "catalog" && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-20 animate-bounce-in">
          <button
            onClick={() => setSection("order")}
            className="bg-orange-500 text-white font-nunito font-black px-6 py-3.5 rounded-3xl shadow-xl flex items-center gap-3 hover:bg-orange-600 hover:scale-105 transition-all active:scale-95"
          >
            <Icon name="ShoppingCart" size={20} />
            <span>Корзина · {cartTotal} ₽</span>
            <span className="bg-white text-orange-500 w-6 h-6 rounded-full flex items-center justify-center text-sm">{cartCount}</span>
          </button>
        </div>
      )}

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 shadow-lg px-2 py-2 z-10">
        <div className="flex items-center justify-around">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className={`flex flex-col items-center gap-0.5 px-1.5 py-1.5 rounded-2xl transition-all ${
                section === item.id
                  ? "bg-orange-50 text-orange-500"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Icon
                name={item.icon}
                fallback="Circle"
                size={20}
                className={section === item.id ? "text-orange-500" : "text-gray-400"}
              />
              <span className={`text-[9px] font-rubik font-semibold leading-none ${section === item.id ? "text-orange-500" : "text-gray-400"}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}