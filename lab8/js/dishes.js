const DISHES = [
  {
    id: 1,
    category: 'soup',
    count: '350 г',
    image: 'images/soups/gaspacho.jpg',
    keyword: 'gaspacho',
    kind: 'veg',
    name: 'Гаспачо',
    price: 195
  },
  {
    id: 2,
    category: 'soup',
    count: '330 г',
    image: 'images/soups/mushroom-soup.jpg',
    keyword: 'mushroom-soup',
    kind: 'veg',
    name: 'Грибной суп-пюре',
    price: 185
  },
  {
    id: 3,
    category: 'soup',
    count: '330 г',
    image: 'images/soups/norwegian-soup.jpg',
    keyword: 'norwegian-soup',
    kind: 'fish',
    name: 'Норвежский суп',
    price: 270
  },
  {
    id: 4,
    category: 'soup',
    count: '425 г',
    image: 'images/soups/ramen.jpg',
    keyword: 'ramen',
    kind: 'meat',
    name: 'Рамен',
    price: 375
  },
  {
    id: 5,
    category: 'soup',
    count: '500 г',
    image: 'images/soups/tom-yam.jpg',
    keyword: 'tom-yam',
    kind: 'fish',
    name: 'Том ям с креветками',
    price: 650
  },
  {
    id: 6,
    category: 'soup',
    count: '350 г',
    image: 'images/soups/chicken-soup.jpg',
    keyword: 'chicken-soup',
    kind: 'meat',
    name: 'Куриный суп',
    price: 330
  },
  {
    id: 7,
    category: 'main-course',
    count: '250 г',
    image: 'images/main-courses/fried-potato.jpg',
    keyword: 'fried-potato',
    kind: 'veg',
    name: 'Жареная картошка с грибами',
    price: 150
  },
  {
    id: 8,
    category: 'main-course',
    count: '310 г',
    image: 'images/main-courses/lasagna.jpg',
    keyword: 'lasagna',
    kind: 'meat',
    name: 'Лазанья',
    price: 385
  },
  {
    id: 9,
    category: 'main-course',
    count: '280 г',
    image: 'images/main-courses/chicken-cutlets.jpg',
    keyword: 'chicken-cutlets',
    kind: 'meat',
    name: 'Котлеты из курицы с картофельным пюре',
    price: 225
  },
  {
    id: 10,
    category: 'main-course',
    count: '270 г',
    image: 'images/main-courses/fish-cutlet.jpg',
    keyword: 'fish-cutlet',
    kind: 'fish',
    name: 'Рыбная котлета с рисом и спаржей',
    price: 320
  },
  {
    id: 11,
    category: 'main-course',
    count: '470 г',
    image: 'images/main-courses/pizza.jpg',
    keyword: 'pizza',
    kind: 'veg',
    name: 'Пицца Маргарита',
    price: 450
  },
  {
    id: 12,
    category: 'main-course',
    count: '280 г',
    image: 'images/main-courses/shrimp-pasta.jpg',
    keyword: 'shrimp-pasta',
    kind: 'fish',
    name: 'Паста с креветками',
    price: 340
  },
  {
    id: 13,
    category: 'salad',
    count: '250 г',
    image: 'images/salads/korean-salad.jpg',
    keyword: 'korean-salad',
    kind: 'veg',
    name: 'Корейский салат с овощами и яйцом',
    price: 330
  },
  {
    id: 14,
    category: 'salad',
    count: '220 г',
    image: 'images/salads/caesar-salad.jpg',
    keyword: 'caesar-salad',
    kind: 'meat',
    name: 'Цезарь с цыпленком',
    price: 370
  },
  {
    id: 15,
    category: 'salad',
    count: '235 г',
    image: 'images/salads/caprese.jpg',
    keyword: 'caprese',
    kind: 'veg',
    name: 'Капрезе с моцареллой',
    price: 350
  },
  {
    id: 16,
    category: 'salad',
    count: '250 г',
    image: 'images/salads/tuna-salad.jpg',
    keyword: 'tuna-salad',
    kind: 'fish',
    name: 'Салат с тунцом',
    price: 480
  },
  {
    id: 17,
    category: 'salad',
    count: '235 г',
    image: 'images/salads/fries-caesar.jpg',
    keyword: 'fries-caesar',
    kind: 'veg',
    name: 'Картофель фри с соусом Цезарь',
    price: 280
  },
  {
    id: 18,
    category: 'salad',
    count: '235 г',
    image: 'images/salads/fries-ketchup.jpg',
    keyword: 'fries-ketchup',
    kind: 'veg',
    name: 'Картофель фри с кетчупом',
    price: 260
  },
  {
    id: 19,
    category: 'drink',
    count: '300 мл',
    image: 'images/drinks/orange-juice.jpg',
    keyword: 'orange-juice',
    kind: 'cold',
    name: 'Апельсиновый сок',
    price: 120
  },
  {
    id: 20,
    category: 'drink',
    count: '300 мл',
    image: 'images/drinks/apple-juice.jpg',
    keyword: 'apple-juice',
    kind: 'cold',
    name: 'Яблочный сок',
    price: 90
  },
  {
    id: 21,
    category: 'drink',
    count: '300 мл',
    image: 'images/drinks/carrot-juice.jpg',
    keyword: 'carrot-juice',
    kind: 'cold',
    name: 'Морковный сок',
    price: 110
  },
  {
    id: 22,
    category: 'drink',
    count: '300 мл',
    image: 'images/drinks/cappuccino.jpg',
    keyword: 'cappuccino',
    kind: 'hot',
    name: 'Капучино',
    price: 180
  },
  {
    id: 23,
    category: 'drink',
    count: '300 мл',
    image: 'images/drinks/green-tea.jpg',
    keyword: 'green-tea',
    kind: 'hot',
    name: 'Зеленый чай',
    price: 100
  },
  {
    id: 24,
    category: 'drink',
    count: '300 мл',
    image: 'images/drinks/black-tea.jpg',
    keyword: 'black-tea',
    kind: 'hot',
    name: 'Черный чай',
    price: 90
  },
  {
    id: 25,
    category: 'dessert',
    count: '300 гр',
    image: 'images/desserts/baklava.jpg',
    keyword: 'baklava',
    kind: 'medium',
    name: 'Пахлава',
    price: 220
  },
  {
    id: 26,
    category: 'dessert',
    count: '125 гр',
    image: 'images/desserts/cheesecake.jpg',
    keyword: 'cheesecake',
    kind: 'small',
    name: 'Чизкейк',
    price: 240
  },
  {
    id: 27,
    category: 'dessert',
    count: '125 гр',
    image: 'images/desserts/chocolate-cheesecake.jpg',
    keyword: 'chocolate-cheesecake',
    kind: 'small',
    name: 'Шоколадный чизкейк',
    price: 260
  },
  {
    id: 28,
    category: 'dessert',
    count: '140 гр',
    image: 'images/desserts/chocolate-cake.jpg',
    keyword: 'chocolate-cake',
    kind: 'small',
    name: 'Шоколадный торт',
    price: 270
  },
  {
    id: 29,
    category: 'dessert',
    count: '350 гр',
    image: 'images/desserts/donuts-3.jpg',
    keyword: 'donuts-3',
    kind: 'medium',
    name: 'Пончики (3 штуки)',
    price: 410
  },
  {
    id: 30,
    category: 'dessert',
    count: '700 гр',
    image: 'images/desserts/donuts-6.jpg',
    keyword: 'donuts-6',
    kind: 'large',
    name: 'Пончики (6 штук)',
    price: 650
  }
];
