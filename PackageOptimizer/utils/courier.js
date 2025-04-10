// backend/utils/courier.js

export function getCourierPrice(weight) {
    if (weight <= 200) return 5;
    if (weight <= 500) return 10;
    if (weight <= 1000) return 15;
    if (weight <= 5000) return 20
    return 25;
  }
  