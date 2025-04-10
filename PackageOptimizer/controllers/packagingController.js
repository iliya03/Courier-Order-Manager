// backend/controllers/packagingController.js

import { getCourierPrice } from '../utils/courier.js';
import products from '../data/product.js';

function sortProducts(items) {
  // Prefer heavier and more expensive items first
  return items.sort((a, b) => b.weight - a.weight || b.price - a.price);
}

export function createPackages(selectedNames) {
  console.log('Selected Names:', selectedNames);

  const selectedItems = products.filter(p => selectedNames.includes(p.name));
  console.log('Selected Items:', selectedItems);

  const sorted = sortProducts([...selectedItems]);
  console.log('Sorted Items:', sorted);

  const packages = [];

  let packageGroup = { items: [], totalWeight: 0, totalPrice: 0 };

  while (sorted.length > 0) {
    const item = sorted.shift();

    if (
      packageGroup.totalPrice + item.price <= 250 &&
      packageGroup.totalWeight + item.weight <= 1000
    ) {
      packageGroup.items.push(item);
      packageGroup.totalWeight += item.weight;
      packageGroup.totalPrice += item.price;
    } else {
      packages.push({
        items: packageGroup.items.map(p => p.name),
        totalWeight: packageGroup.totalWeight,
        totalPrice: packageGroup.totalPrice,
        courierPrice: getCourierPrice(packageGroup.totalWeight)
      });

      packageGroup = {
        items: [item],
        totalWeight: item.weight,
        totalPrice: item.price
      };
    }
  }

  if (packageGroup.items.length > 0) {
    packages.push({
      items: packageGroup.items.map(p => p.name),
      totalWeight: packageGroup.totalWeight,
      totalPrice: packageGroup.totalPrice,
      courierPrice: getCourierPrice(packageGroup.totalWeight)
    });
  }

  console.log('Final Packages:', packages);
  return packages;
}
