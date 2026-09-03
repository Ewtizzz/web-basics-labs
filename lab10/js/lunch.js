let dishes = [];
let selection = {};

const activeFilters = {
  'soup': null,
  'main-course': null,
  'salad': null,
  'drink': null,
  'dessert': null
};

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
    const card = createDishCard(dish, 'Добавить');
    if (selection[dish.category] && selection[dish.category].id === dish.id) {
      card.classList.add('dish--selected');
    }
    container.append(card);
  });
}

function renderDishes() {
  CATEGORY_ORDER.forEach(renderCategory);
}

function updatePanel() {
  const panel = document.querySelector('.go-to-order');
  const link = panel.querySelector('.go-to-order__link');
  const chosen = CATEGORY_ORDER.some(function (category) {
    return selection[category] !== null;
  });

  panel.style.display = chosen ? 'flex' : 'none';
  panel.querySelector('.go-to-order__total').textContent = 'Стоимость заказа: ' + calculateTotal(selection) + '₽';
  link.classList.toggle('go-to-order__link--disabled', getOrderError(selection) !== null);
}

function selectDish(keyword) {
  const dish = dishes.find(function (item) {
    return item.keyword === keyword;
  });

  selection[dish.category] = dish;
  saveCart(selectionToIds(selection));
  renderCategory(dish.category);
  updatePanel();
}

function applyFilter(category, button) {
  const isActive = button.classList.contains('active');

  button.closest('.filters').querySelectorAll('.filters__button').forEach(function (item) {
    item.classList.remove('active');
  });

  if (isActive) {
    activeFilters[category] = null;
  } else {
    activeFilters[category] = button.dataset.kind;
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

document.querySelector('.go-to-order__link').addEventListener('click', function (event) {
  const error = getOrderError(selection);
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

  selection = buildSelection(dishes, getCart());
  renderDishes();
  updatePanel();
});
