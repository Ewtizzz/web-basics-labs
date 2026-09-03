const CART_KEY = 'food-construct-cart';

const CATEGORY_ORDER = ['soup', 'main-course', 'salad', 'drink', 'dessert'];

const categories = {
  'soup': { title: 'Суп', field: 'soup_id', empty: 'Не выбран' },
  'main-course': { title: 'Главное блюдо', field: 'main_course_id', empty: 'Не выбрано' },
  'salad': { title: 'Салат/стартер', field: 'salad_id', empty: 'Не выбран' },
  'drink': { title: 'Напиток', field: 'drink_id', empty: 'Не выбран' },
  'dessert': { title: 'Десерт', field: 'dessert_id', empty: 'Не выбран' }
};

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
}

function saveCart(ids) {
  localStorage.setItem(CART_KEY, JSON.stringify(ids));
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
}

function buildSelection(dishes, ids) {
  const selection = {};

  CATEGORY_ORDER.forEach(function (category) {
    selection[category] = null;
  });

  ids.forEach(function (id) {
    const dish = dishes.find(function (item) {
      return item.id === id;
    });
    if (dish) {
      selection[dish.category] = dish;
    }
  });

  return selection;
}

function selectionToIds(selection) {
  return CATEGORY_ORDER
    .map(function (category) { return selection[category]; })
    .filter(function (dish) { return dish !== null; })
    .map(function (dish) { return dish.id; });
}

function calculateTotal(selection) {
  return CATEGORY_ORDER.reduce(function (sum, category) {
    return selection[category] ? sum + selection[category].price : sum;
  }, 0);
}

function createDishCard(dish, buttonText) {
  const card = document.createElement('div');
  card.className = 'dish';
  card.dataset.dish = dish.keyword;

  const image = document.createElement('img');
  image.className = 'dish__image';
  image.src = dish.image;
  image.alt = dish.name;

  const price = document.createElement('p');
  price.className = 'dish__price';
  price.textContent = dish.price + '₽';

  const name = document.createElement('p');
  name.className = 'dish__name';
  name.textContent = dish.name;

  const count = document.createElement('p');
  count.className = 'dish__weight';
  count.textContent = dish.count;

  const button = document.createElement('button');
  button.className = 'dish__button';
  button.type = 'button';
  button.textContent = buttonText;

  card.append(image, price, name, count, button);
  return card;
}

function getOrderError(selection) {
  const soup = selection['soup'] !== null;
  const main = selection['main-course'] !== null;
  const salad = selection['salad'] !== null;
  const drink = selection['drink'] !== null;
  const dessert = selection['dessert'] !== null;

  if (!soup && !main && !salad && !drink && !dessert) {
    return 'Ничего не выбрано. Выберите блюда для заказа';
  }
  if (!soup && !main && !salad) {
    return 'Выберите главное блюдо';
  }
  if (soup && !main && !salad) {
    return 'Выберите главное блюдо/салат/стартер';
  }
  if (salad && !soup && !main) {
    return 'Выберите суп или главное блюдо';
  }
  if (!drink) {
    return 'Выберите напиток';
  }
  return null;
}

function showNotification(text) {
  const notification = document.createElement('div');
  notification.className = 'notification';

  const message = document.createElement('p');
  message.className = 'notification__text';
  message.textContent = text;

  const button = document.createElement('button');
  button.className = 'notification__button';
  button.type = 'button';
  button.textContent = 'Окей 👌';
  button.addEventListener('click', function () {
    notification.remove();
  });

  notification.append(message, button);
  document.body.append(notification);
}
