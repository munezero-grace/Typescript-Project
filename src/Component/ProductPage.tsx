import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./ProductPage.css";

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
}

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data: Product[]) => {
        setProducts([...data]);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleAddToCart = (selectedProduct: Product) => {
    let listOfProducts: Product[] = JSON.parse(
      localStorage.getItem("product") || "[]"
    );
    let found = 0;

    listOfProducts.forEach((product, index) => {
      let quantity = 1;
      if (selectedProduct.id === product.id) {
        if (parseInt(product.quantity.toString()) >= 0) {
          quantity = product.quantity + 1;
        }
        listOfProducts[index] = { ...selectedProduct, quantity };
        found = 1;
      }
    });

    localStorage.setItem("product", JSON.stringify(listOfProducts));

    if (found === 0) {
      let newItem: Product = { ...selectedProduct, quantity: 1 };
      localStorage.setItem(
        "product",
        JSON.stringify([...listOfProducts, newItem])
      );
    }
  };

  return (
    <div className="Wrap-all">
      <div className="title">
        <div className="box-filter">Filter</div>

        <div className="icon">
          <Link to="/cart">
            <FaShoppingCart className="icon" />
          </Link>
        </div>

        <div className="box-sort">Sort</div>
      </div>
      <div className="product-holder">
        {products.map((product) => (
          <div
            key={`pod_${product.id}`}
            className="product"
            onClick={() => handleAddToCart(product)}
          >
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description.slice(0, 40)}...</p>
            <p>{product.price}$</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
