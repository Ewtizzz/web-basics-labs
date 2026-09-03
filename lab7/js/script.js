let dishes = [];

const categories = {
  'soup': { title: 'Суп', empty: 'Блюдо не выбрано' },
  'main-course': { title: 'Главное блюдо', empty: 'Блюдо не выбрано' },
  'salad': { title: 'Салат/стартер', empty: 'Блюдо не выбрано' },
  'drink': { title: 'Напиток', empty: 'Напиток не выбран' },
  'dessert': { title: 'Десерт', empty: 'Блюдо не выбрано' }
};

const selection = {
  'soup': null,
  'main-course': null,
  'salad': null,
  'drink': null,
  'dessert': null
};

const activeFilters = {
  'soup': null,
  'main-course': null,
  'salad': null,
  'drink': null,
  'dessert': null
};

function createDish(dish) {
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
  button.textContent = 'Добавить';

  card.append(image, price, name, count, button);
  return card;
}

function renderCategory(category) {
  const container = document.querySelector('.dishes[data-category="' + category + '"]');
  const kind = activeFilters[category];

  const list = dishes
    .filter(function (dish) {
      return dish.category === category && (kind === null || dish.kind === kind);
    })
    .sort(function (a, b) {
      return a.name.localeCompare(b.name, 'ru');
    });

  container.innerHTML = '';
  list.forEach(function (dish) {
    container.append(createDish(dish));
  });
}

function renderDishes() {
  Object.keys(categories).forEach(renderCategory);
}

function getTotal() {
  return Object.keys(selection).reduce(function (sum, category) {
    return selection[category] ? sum + selection[category].price : sum;
  }, 0);
}

function renderOrder() {
  const chosen = Object.keys(selection).some(function (category) {
    return selection[category] !== null;
  });

  document.querySelector('.order-summary__empty').style.display = chosen ? 'none' : 'block';
  document.querySelector('.order-summary__total').style.display = chosen ? 'block' : 'none';

  document.querySelectorAll('.order-summary__row').forEach(function (row) {
    const category = row.dataset.category;
    const dish = selection[category];

    row.style.display = chosen ? 'block' : 'none';
    row.querySelector('.order-summary__value').textContent = dish
      ? dish.name + ' ' + dish.price + '₽'
      : categories[category].empty;
  });

  document.querySelector('.order-summary__total-value').textContent = getTotal() + '₽';
}

function selectDish(keyword) {
  const dish = dishes.find(function (item) {
    return item.keyword === keyword;
  });

  selection[dish.category] = dish;
  renderOrder();
}

function applyFilter(category, button) {
  const kind = button.dataset.kind;
  const isActive = button.classList.contains('active');

  button.closest('.filters').querySelectorAll('.filters__button').forEach(function (item) {
    item.classList.remove('active');
  });

  if (isActive) {
    activeFilters[category] = null;
  } else {
    activeFilters[category] = kind;
    button.classList.add('active');
  }

  renderCategory(category);
}

document.querySelectorAll('.menu').forEach(function (section) {
  const category = section.querySelector('.dishes').dataset.category;

  section.querySelector('.filters').addEventListener('click', function (event) {
    const button = event.target.closest('.filters__button');
    if (button) {
      applyFilter(category, button);
    }
  });

  section.querySelector('.dishes').addEventListener('click', function (event) {
    const card = event.target.closest('.dish');
    if (card) {
      selectDish(card.dataset.dish);
    }
  });
});

function getOrderError() {
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

document.querySelector('.order-form').addEventListener('submit', function (event) {
  const error = getOrderError();
  if (error) {
    event.preventDefault();
    showNotification(error);
  }
});

document.addEventListener('DOMContentLoaded', async function () {
  try {
    dishes = await loadDishes();
  } catch (error) {
    showNotification('Не удалось загрузить меню. ' + error.message);
    return;
  }

  renderDishes();
  renderOrder();
});
