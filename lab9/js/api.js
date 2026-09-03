const DISHES_KEY = 'food-construct-dishes';
const ORDERS_KEY = 'food-construct-orders';

async function loadDishes() {
  localStorage.setItem(DISHES_KEY, JSON.stringify(DISHES));
  return JSON.parse(localStorage.getItem(DISHES_KEY));
}

function readOrders() {
  return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
}

function writeOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

async function getOrders() {
  return readOrders();
}

async function getOrder(id) {
  const order = readOrders().find(function (item) {
    return item.id === id;
  });

  if (!order) {
    throw new Error('Заказ не найден');
  }

  return order;
}

async function createOrder(data) {
  const orders = readOrders();
  const id = orders.reduce(function (max, order) {
    return order.id > max ? order.id : max;
  }, 0) + 1;

  const order = Object.assign({ id: id, created_at: new Date().toISOString() }, data);
  orders.push(order);
  writeOrders(orders);

  return order;
}

async function updateOrder(id, data) {
  const orders = readOrders();
  const index = orders.findIndex(function (item) {
    return item.id === id;
  });

  if (index === -1) {
    throw new Error('Заказ не найден');
  }

  orders[index] = Object.assign({}, orders[index], data, { updated_at: new Date().toISOString() });
  writeOrders(orders);

  return orders[index];
}

async function deleteOrder(id) {
  const orders = readOrders();
  const index = orders.findIndex(function (item) {
    return item.id === id;
  });

  if (index === -1) {
    throw new Error('Заказ не найден');
  }

  const order = orders[index];
  orders.splice(index, 1);
  writeOrders(orders);

  return order;
}
