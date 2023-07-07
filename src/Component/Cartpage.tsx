import React, { useEffect, useState } from 'react';
import './ProductPage.css';
import { Link } from 'react-router-dom';
interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
}

const Cartpage: React.FC = () => {
  const [Cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const fetchCart = () => {
      const item = localStorage.getItem('product');
      if (item) {
        setCart(JSON.parse(item));
      }
    };
    fetchCart();
  }, []);

  const removeItem = (itemId: number) => {
    const updatedProducts = Cart.filter((product) => product.id !== itemId);
    setCart(updatedProducts);
    localStorage.setItem('product', JSON.stringify(updatedProducts));
  };

  const addToCart = (productId: number) => {
    const updatedCart = Cart.map((product) => {
      if (productId === product.id) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    setCart(updatedCart);
    localStorage.setItem('product', JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId: number) => {
    const updatedCart = Cart.map((product) => {
      if (productId === product.id) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    });
    setCart(updatedCart);
    localStorage.setItem('product', JSON.stringify(updatedCart));
  };

  // Calculate the total price
  const totalPrice = Cart.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  return (
    <div>
      <h1 className="cartpage">Cart Page</h1>
      <div className="product-holder">
        {Cart.map((product) => (
          <div key={product.id} className="products">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>Price: ${product.price * product.quantity}</p>
            <div className="quantity">
              <button onClick={() => removeFromCart(product.id)}>-</button>
              <span className="quantity-value">{product.quantity}</span>
              <button onClick={() => addToCart(product.id)}>+</button>
            </div>
            <button className="delete-button" onClick={() => removeItem(product.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
      <p>Total Price: ${totalPrice}</p>
      {/* <button>proceed to check out</button> */}
     <Link to ='/'> <button className='btn'>continue shopping</button></Link>

    </div>
  );
};


export default Cartpage;
