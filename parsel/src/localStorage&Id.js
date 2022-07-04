export function setName(baskets) {
    return localStorage.setItem('basket', JSON.stringify(baskets));
  }

export function getName() {
    return localStorage.getItem('basket');
  }

  export function generateId() {
    return String(
      Math.random() * 10000
    ).replace('.', '0');
  } 