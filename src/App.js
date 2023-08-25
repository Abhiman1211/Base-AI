import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";

function App() {
  const [cart, setCart] = useState([]);
  const [shoppingItems, setShoppingItems] = useState([]);

  useEffect(() => {
    const alanInstance = alanBtn({
      key: "d041a1e0f63b39b73609fbb1c4925a472e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: (commandData) => {
        if (commandData.command === "loadShoppingItems") {
          setShoppingItems(commandData.data);
        }
        if (commandData.command === "addToCart") {
          addToCart(commandData.data);
        }
      },
    });

    return () => {
      // Clean up the Alan instance when the component unmounts
      alanInstance.destroy();
    };
  }, []);

  const addToCart = (shoppingItem) => {
    setCart((oldCart) => [...oldCart, shoppingItem]);
  };

  return (
    <div className="App">
      <h1>Shopping Items</h1>
      <ul>
        {shoppingItems.map((shoppingItem) => (
          <li key={shoppingItem.name}>
            {shoppingItem.name} - {shoppingItem.price} - {shoppingItem.category}
          </li>
        ))}
      </ul>
      <h1>Cart</h1>
      <ul>
        {cart.map((cartItem) => (
          <li key={cartItem.name}>
            {cartItem.name} - {cartItem.price} - {cartItem.category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
