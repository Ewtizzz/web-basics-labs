const dishes = [
  {
    keyword: 'gaspacho',
    name: 'Гаспачо',
    price: 195,
    category: 'soup',
    count: '350 г',
    kind: 'veg',
    image: 'soups/gaspacho'
  },
  {
    keyword: 'mushroom-soup',
    name: 'Грибной суп-пюре',
    price: 185,
    category: 'soup',
    count: '330 г',
    kind: 'veg',
    image: 'soups/mushroom-soup'
  },
  {
    keyword: 'norwegian-soup',
    name: 'Норвежский суп',
    price: 270,
    category: 'soup',
    count: '330 г',
    kind: 'fish',
    image: 'soups/norwegian-soup'
  },
  {
    keyword: 'ramen',
    name: 'Рамен',
    price: 375,
    category: 'soup',
    count: '425 г',
    kind: 'meat',
    image: 'soups/ramen'
  },
  {
    keyword: 'tom-yam',
    name: 'Том ям с креветками',
    price: 650,
    category: 'soup',
    count: '500 г',
    kind: 'fish',
    image: 'soups/tom-yam'
  },
  {
    keyword: 'chicken-soup',
    name: 'Куриный суп',
    price: 330,
    category: 'soup',
    count: '350 г',
    kind: 'meat',
    image: 'soups/chicken-soup'
  },
  {
    keyword: 'fried-potato',
    name: 'Жареная картошка с грибами',
    price: 150,
    category: 'main-course',
    count: '250 г',
    kind: 'veg',
    image: 'main-courses/fried-potato'
  },
  {
    keyword: 'lasagna',
    name: 'Лазанья',
    price: 385,
    category: 'main-course',
    count: '310 г',
    kind: 'meat',
    image: 'main-courses/lasagna'
  },
  {
    keyword: 'chicken-cutlets',
    name: 'Котлеты из курицы с картофельным пюре',
    price: 225,
    category: 'main-course',
    count: '280 г',
    kind: 'meat',
    image: 'main-courses/chicken-cutlets'
  },
  {
    keyword: 'fish-cutlet',
    name: 'Рыбная котлета с рисом и спаржей',
    price: 320,
    category: 'main-course',
    count: '270 г',
    kind: 'fish',
    image: 'main-courses/fish-cutlet'
  },
  {
    keyword: 'pizza',
    name: 'Пицца Маргарита',
    price: 450,
    category: 'main-course',
    count: '470 г',
    kind: 'veg',
    image: 'main-courses/pizza'
  },
  {
    keyword: 'shrimp-pasta',
    name: 'Паста с креветками',
    price: 340,
    category: 'main-course',
    count: '280 г',
    kind: 'fish',
    image: 'main-courses/shrimp-pasta'
  },
  {
    keyword: 'korean-salad',
    name: 'Корейский салат с овощами и яйцом',
    price: 330,
    category: 'salad',
    count: '250 г',
    kind: 'veg',
    image: 'salads/korean-salad'
  },
  {
    keyword: 'caesar-salad',
    name: 'Цезарь с цыпленком',
    price: 370,
    category: 'salad',
    count: '220 г',
    kind: 'meat',
    image: 'salads/caesar-salad'
  },
  {
    keyword: 'caprese',
    name: 'Капрезе с моцареллой',
    price: 350,
    category: 'salad',
    count: '235 г',
    kind: 'veg',
    image: 'salads/caprese'
  },
  {
    keyword: 'tuna-salad',
    name: 'Салат с тунцом',
    price: 480,
    category: 'salad',
    count: '250 г',
    kind: 'fish',
    image: 'salads/tuna-salad'
  },
  {
    keyword: 'fries-caesar',
    name: 'Картофель фри с соусом Цезарь',
    price: 280,
    category: 'salad',
    count: '235 г',
    kind: 'veg',
    image: 'salads/fries-caesar'
  },
  {
    keyword: 'fries-ketchup',
    name: 'Картофель фри с кетчупом',
    price: 260,
    category: 'salad',
    count: '235 г',
    kind: 'veg',
    image: 'salads/fries-ketchup'
  },
  {
    keyword: 'orange-juice',
    name: 'Апельсиновый сок',
    price: 120,
    category: 'drink',
    count: '300 мл',
    kind: 'cold',
    image: 'drinks/orange-juice'
  },
  {
    keyword: 'apple-juice',
    name: 'Яблочный сок',
    price: 90,
    category: 'drink',
    count: '300 мл',
    kind: 'cold',
    image: 'drinks/apple-juice'
  },
  {
    keyword: 'carrot-juice',
    name: 'Морковный сок',
    price: 110,
    category: 'drink',
    count: '300 мл',
    kind: 'cold',
    image: 'drinks/carrot-juice'
  },
  {
    keyword: 'cappuccino',
    name: 'Капучино',
    price: 180,
    category: 'drink',
    count: '300 мл',
    kind: 'hot',
    image: 'drinks/cappuccino'
  },
  {
    keyword: 'green-tea',
    name: 'Зеленый чай',
    price: 100,
    category: 'drink',
    count: '300 мл',
    kind: 'hot',
    image: 'drinks/green-tea'
  },
  {
    keyword: 'black-tea',
    name: 'Черный чай',
    price: 90,
    category: 'drink',
    count: '300 мл',
    kind: 'hot',
    image: 'drinks/black-tea'
  },
  {
    keyword: 'baklava',
    name: 'Пахлава',
    price: 220,
    category: 'dessert',
    count: '300 гр',
    kind: 'medium',
    image: 'desserts/baklava'
  },
  {
    keyword: 'cheesecake',
    name: 'Чизкейк',
    price: 240,
    category: 'dessert',
    count: '125 гр',
    kind: 'small',
    image: 'desserts/cheesecake'
  },
  {
    keyword: 'chocolate-cheesecake',
    name: 'Шоколадный чизкейк',
    price: 260,
    category: 'dessert',
    count: '125 гр',
    kind: 'small',
    image: 'desserts/chocolate-cheesecake'
  },
  {
    keyword: 'chocolate-cake',
    name: 'Шоколадный торт',
    price: 270,
    category: 'dessert',
    count: '140 гр',
    kind: 'small',
    image: 'desserts/chocolate-cake'
  },
  {
    keyword: 'donuts-3',
    name: 'Пончики (3 штуки)',
    price: 410,
    category: 'dessert',
    count: '350 гр',
    kind: 'medium',
    image: 'desserts/donuts-3'
  },
  {
    keyword: 'donuts-6',
    name: 'Пончики (6 штук)',
    price: 650,
    category: 'dessert',
    count: '700 гр',
    kind: 'large',
    image: 'desserts/donuts-6'
  }
];
