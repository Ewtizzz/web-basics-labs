let dishes = [];

function findDish(id) {
  return dishes.find(function (dish) {
    return dish.id === id;
  }) || null;
}

function getOrderDishes(order) {
  return CATEGORY_ORDER
    .map(function (category) { return findDish(order[categories[category].field]); })
    .filter(function (dish) { return dish !== null; });
}

function getOrderTotal(order) {
  return getOrderDishes(order).reduce(function (sum, dish) {
    return sum + dish.price;
  }, 0);
}

function getDeliveryLabel(order) {
  return order.delivery_type === 'by_time' && order.delivery_time
    ? order.delivery_time
    : 'Как можно скорее (с 7:00 до 23:00)';
}

function formatDate(value) {
  return new Date(value).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).replace(',', '');
}

function closeModal() {
  const modal = document.querySelector('.modal');
  if (modal) {
    modal.remove();
  }
}

function openModal(title, content, buttons) {
  closeModal();

  const modal = document.createElement('div');
  modal.className = 'modal';

  const dialog = document.createElement('div');
  dialog.className = 'modal__window';

  const close = document.createElement('button');
  close.className = 'modal__close';
  close.type = 'button';
  close.textContent = '×';
  close.addEventListener('click', closeModal);

  const heading = document.createElement('h3');
  heading.className = 'modal__title';
  heading.textContent = title;

  const body = document.createElement('div');
  body.className = 'modal__body';
  body.append(content);

  const footer = document.createElement('div');
  footer.className = 'modal__buttons';
  buttons.forEach(function (item) {
    const button = document.createElement('button');
    button.className = 'order-form__button';
    button.type = 'button';
    button.textContent = item.text;
    button.addEventListener('click', item.action);
    footer.append(button);
  });

  dialog.append(close, heading, body, footer);
  modal.append(dialog);
  document.body.append(modal);
}

function createSubtitle(text) {
  const subtitle = document.createElement('p');
  subtitle.className = 'modal__subtitle';
  subtitle.textContent = text;
  return subtitle;
}

function createRow(label, value) {
  const row = document.createElement('div');
  row.className = 'modal__row';

  const title = document.createElement('p');
  title.className = 'modal__row-title';
  title.textContent = label;

  const text = document.createElement('p');
  text.className = 'modal__row-value';
  text.textContent = value;

  row.append(title, text);
  return row;
}

function createField(label, name, type, value) {
  const row = document.createElement('div');
  row.className = 'modal__row';

  const caption = document.createElement('label');
  caption.className = 'modal__row-title';
  caption.setAttribute('for', 'edit-' + name);
  caption.textContent = label;

  const input = type === 'textarea'
    ? document.createElement('textarea')
    : document.createElement('input');

  input.className = type === 'textarea' ? 'order-form__textarea' : 'order-form__input';
  input.id = 'edit-' + name;
  input.name = name;
  input.value = value === null || value === undefined ? '' : value;

  if (type === 'textarea') {
    input.rows = 3;
  } else {
    input.type = type;
  }

  if (type === 'time') {
    input.min = '07:00';
    input.max = '23:00';
    input.step = '300';
  }

  row.append(caption, input);
  return row;
}

function createDeliveryTypeField(value) {
  const row = document.createElement('div');
  row.className = 'modal__row';

  const caption = document.createElement('p');
  caption.className = 'modal__row-title';
  caption.textContent = 'Способ доставки';

  const group = document.createElement('div');

  [{ value: 'now', label: 'Как можно скорее' }, { value: 'by_time', label: 'К указанному времени' }]
    .forEach(function (option) {
      const line = document.createElement('div');
      line.className = 'order-form__radio-row';

      const input = document.createElement('input');
      input.className = 'order-form__radio';
      input.type = 'radio';
      input.name = 'delivery_type';
      input.id = 'edit-delivery-' + option.value;
      input.value = option.value;
      input.checked = value === option.value;

      const label = document.createElement('label');
      label.className = 'order-form__radio-label';
      label.setAttribute('for', input.id);
      label.textContent = option.label;

      line.append(input, label);
      group.append(line);
    });

  row.append(caption, group);
  return row;
}

function createComposition(order) {
  const list = document.createElement('div');

  getOrderDishes(order).forEach(function (dish) {
    list.append(createRow(categories[dish.category].title, dish.name + ' (' + dish.price + '₽)'));
  });

  const total = document.createElement('p');
  total.className = 'modal__total';
  total.textContent = 'Стоимость: ' + getOrderTotal(order) + '₽';
  list.append(total);

  return list;
}

function showDetails(order) {
  const content = document.createElement('div');

  content.append(
    createRow('Дата оформления', formatDate(order.created_at)),
    createSubtitle('Доставка'),
    createRow('Имя получателя', order.full_name),
    createRow('Адрес доставки', order.delivery_address),
    createRow('Время доставки', getDeliveryLabel(order)),
    createRow('Телефон', order.phone),
    createRow('Email', order.email),
    createSubtitle('Комментарий'),
    createRow('', order.comment || 'Без комментария'),
    createSubtitle('Состав заказа'),
    createComposition(order)
  );

  openModal('Просмотр заказа', content, [
    { text: 'Ок', action: closeModal }
  ]);
}

function showEdit(order) {
  const form = document.createElement('form');
  form.className = 'modal__form';

  form.append(
    createRow('Дата оформления', formatDate(order.created_at)),
    createSubtitle('Доставка'),
    createField('Имя получателя', 'full_name', 'text', order.full_name),
    createField('Адрес доставки', 'delivery_address', 'text', order.delivery_address),
    createDeliveryTypeField(order.delivery_type),
    createField('Время доставки', 'delivery_time', 'time', order.delivery_time),
    createField('Телефон', 'phone', 'tel', order.phone),
    createField('Email', 'email', 'email', order.email),
    createSubtitle('Комментарий'),
    createField('', 'comment', 'textarea', order.comment),
    createSubtitle('Состав заказа'),
    createComposition(order)
  );

  openModal('Редактирование заказа', form, [
    { text: 'Отмена', action: closeModal },
    {
      text: 'Сохранить',
      action: async function () {
        const data = Object.fromEntries(new FormData(form).entries());

        if (data.delivery_type === 'by_time' && !data.delivery_time) {
          showNotification('Укажите время доставки');
          return;
        }

        try {
          await updateOrder(order.id, {
            full_name: data.full_name,
            email: data.email,
            phone: data.phone,
            delivery_address: data.delivery_address,
            delivery_type: data.delivery_type,
            delivery_time: data.delivery_time || null,
            comment: data.comment || ''
          });
        } catch (error) {
          showNotification('Не удалось изменить заказ. ' + error.message);
          return;
        }

        closeModal();
        await renderOrders();
        showNotification('Заказ успешно изменён');
      }
    }
  ]);
}

function showDelete(order) {
  const content = document.createElement('p');
  content.className = 'modal__question';
  content.textContent = 'Вы уверены, что хотите удалить заказ?';

  openModal('Удаление заказа', content, [
    { text: 'Отмена', action: closeModal },
    {
      text: 'Да',
      action: async function () {
        try {
          await deleteOrder(order.id);
        } catch (error) {
          showNotification('Не удалось удалить заказ. ' + error.message);
          return;
        }

        closeModal();
        await renderOrders();
        showNotification('Заказ успешно удалён');
      }
    }
  ]);
}

function createOrderRow(order, index) {
  const row = document.createElement('tr');
  row.dataset.order = order.id;

  const names = getOrderDishes(order).map(function (dish) {
    return dish.name;
  }).join(', ');

  [String(index + 1), formatDate(order.created_at), names, getOrderTotal(order) + '₽', getDeliveryLabel(order)]
    .forEach(function (value) {
      const cell = document.createElement('td');
      cell.textContent = value;
      row.append(cell);
    });

  const actions = document.createElement('td');
  const group = document.createElement('div');
  group.className = 'orders-table__actions';

  [
    { text: 'Подробнее', action: 'details' },
    { text: 'Редактирование', action: 'edit' },
    { text: 'Удаление', action: 'delete' }
  ].forEach(function (item) {
    const button = document.createElement('button');
    button.className = 'orders-table__button';
    button.type = 'button';
    button.dataset.action = item.action;
    button.textContent = item.text;
    group.append(button);
  });

  actions.append(group);
  row.append(actions);
  return row;
}

async function renderOrders() {
  const body = document.querySelector('.orders-table__body');
  const table = document.querySelector('.orders-table');
  const empty = document.querySelector('.orders__empty');

  const orders = (await getOrders()).sort(function (a, b) {
    return new Date(b.created_at) - new Date(a.created_at);
  });

  body.innerHTML = '';
  orders.forEach(function (order, index) {
    body.append(createOrderRow(order, index));
  });

  table.style.display = orders.length ? 'table' : 'none';
  empty.style.display = orders.length ? 'none' : 'block';
}

document.querySelector('.orders-table__body').addEventListener('click', async function (event) {
  const button = event.target.closest('.orders-table__button');
  if (!button) {
    return;
  }

  const id = Number(button.closest('tr').dataset.order);
  let order;

  try {
    order = await getOrder(id);
  } catch (error) {
    showNotification('Не удалось получить заказ. ' + error.message);
    return;
  }

  if (button.dataset.action === 'details') {
    showDetails(order);
  } else if (button.dataset.action === 'edit') {
    showEdit(order);
  } else {
    showDelete(order);
  }
});

document.addEventListener('DOMContentLoaded', async function () {
  try {
    dishes = await loadDishes();
  } catch (error) {
    showNotification('Не удалось загрузить меню. ' + error.message);
    return;
  }

  await renderOrders();
});
