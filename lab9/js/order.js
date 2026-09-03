let dishes = [];
let selection = {};

function renderComposition() {
  const container = document.querySelector('.composition .dishes');
  const empty = document.querySelector('.composition__empty');
  const chosen = CATEGORY_ORDER
    .map(function (category) { return selection[category]; })
    .filter(function (dish) { return dish !== null; });

  container.innerHTML = '';
  chosen.forEach(function (dish) {
    container.append(createDishCard(dish, 'Удалить'));
  });

  empty.style.display = chosen.length ? 'none' : 'block';
  container.style.display = chosen.length ? 'grid' : 'none';
}

function renderSummary() {
  document.querySelectorAll('.order-summary__row').forEach(function (row) {
    const category = row.dataset.category;
    const dish = selection[category];

    row.querySelector('.order-summary__value').textContent = dish
      ? dish.name + ' ' + dish.price + '₽'
      : categories[category].empty;
  });

  document.querySelector('.order-summary__total-value').textContent = calculateTotal(selection) + '₽';
}

function removeDish(keyword) {
  const dish = dishes.find(function (item) {
    return item.keyword === keyword;
  });

  selection[dish.category] = null;
  saveCart(selectionToIds(selection));
  renderComposition();
  renderSummary();
}

function buildOrderData(form) {
  const data = Object.fromEntries(new FormData(form).entries());

  const payload = {
    full_name: data.full_name,
    email: data.email,
    subscribe: data.subscribe ? 1 : 0,
    phone: data.phone,
    delivery_address: data.delivery_address,
    delivery_type: data.delivery_type,
    delivery_time: data.delivery_time || null,
    comment: data.comment || ''
  };

  CATEGORY_ORDER.forEach(function (category) {
    const dish = selection[category];
    payload[categories[category].field] = dish ? dish.id : null;
  });

  return payload;
}

document.querySelector('.composition').addEventListener('click', function (event) {
  const card = event.target.closest('.dish');
  if (card) {
    removeDish(card.dataset.dish);
  }
});

document.querySelector('.order-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  const error = getOrderError(selection);
  if (error) {
    showNotification(error);
    return;
  }

  const form = event.target;
  const payload = buildOrderData(form);

  if (payload.delivery_type === 'by_time' && !payload.delivery_time) {
    showNotification('Укажите время доставки');
    return;
  }

  try {
    await createOrder(payload);
  } catch (requestError) {
    showNotification('Не удалось оформить заказ. ' + requestError.message);
    return;
  }

  clearCart();
  selection = buildSelection(dishes, []);
  form.reset();
  renderComposition();
  renderSummary();
  showNotification('Заказ успешно оформлен');
});

document.addEventListener('DOMContentLoaded', async function () {
  try {
    dishes = await loadDishes();
  } catch (error) {
    showNotification('Не удалось загрузить меню. ' + error.message);
    return;
  }

  selection = buildSelection(dishes, getCart());
  renderComposition();
  renderSummary();
});
