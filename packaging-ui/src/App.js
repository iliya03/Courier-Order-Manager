import React, { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [packages, setPackages] = useState([]);

//importing the list of products from the packageoptimizer
  useEffect(() => {
    fetch('https://courier-order-manager.vercel.app/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const toggleSelection = (name) => {
    setSelected(prev =>
      prev.includes(name) ? prev.filter(item => item !== name) : [...prev, name]
    );
  };

  const placeOrder = () => {
    fetch('https://courier-order-manager.vercel.app/api/place-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: selected }),
    })
      .then(res => res.json())
      .then(data => setPackages(data.packages))
      .catch(err => console.error('Error placing order:', err));
  };

  return (
    <div className="App">
      <h1>Product List</h1>
      <ul>
        {products.map(p => (
          <li key={p.name}>
            <label>
              <input
                type="checkbox"
                checked={selected.includes(p.name)}
                onChange={() => toggleSelection(p.name)}
              />
              {p.name} - ${p.price} - {p.weight}g
            </label>
          </li>
        ))}
      </ul>

      <button onClick={placeOrder} style={{ marginTop: '10px' }}>Place Order</button>

      {packages.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2>This order has the following packages:</h2>
          {packages.map((pkg, index) => (
            <div key={index} style={{ marginBottom: '15px' }}>
              <strong>Package {index + 1}</strong><br />
              Items - {pkg.items.join(', ')}<br />
              Total weight - {pkg.totalWeight}g<br />
              Total price - ${pkg.totalPrice}<br />
              Courier price - ${pkg.courierPrice}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
