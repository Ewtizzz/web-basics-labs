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
