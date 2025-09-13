const STORAGE_KEY = 'cart';

export function initLocalStorage() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    const initialData = {
      items: [],
      total: 0,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
  }
}

export function getFromLocalStorage() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

export function saveToLocalStorage(item) {
    let cart = getFromLocalStorage();
    cart.items.push(item);
    cart.total += item.price;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));

}

export function setItemToLocalStorage(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}