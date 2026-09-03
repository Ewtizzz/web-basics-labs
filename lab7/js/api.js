const DISHES_KEY = 'food-construct-dishes';

async function loadDishes() {
  localStorage.setItem(DISHES_KEY, JSON.stringify(DISHES));
  return JSON.parse(localStorage.getItem(DISHES_KEY));
}
