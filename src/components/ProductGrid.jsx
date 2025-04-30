// import { useState } from "react";
import ProductCard from "./ProductCard";

// Dados simulados dos produtos
import { allProducts } from "../services/product";

export default function ProductGrid({onAddToCart}) {
  // const [setCart] = useState([]);

  // const addToCart = (productId) => {
  //   setCart((prevCart) => {
  //     const existingItem = prevCart.find((item) => item.id === productId);

  //     if (existingItem) {
  //       return prevCart.map((item) =>
  //         item.id === productId
  //           ? { ...item, quantity: item.quantity + 1 }
  //           : item
  //       );
  //     } else {
  //       return [...prevCart, { id: productId, quantity: 1 }];
  //     }
  //   });
  // };

  const salgados = allProducts.filter((p) => p.category !== "bebidas");
  const bebidas = allProducts.filter((p) => p.category === "bebidas");

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {salgados.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => onAddToCart(product)}
          />
        ))}
      </div>
      <h2 className="text-3xl font-bold text-center m-5  p-5 text-amber-800">
        Bebidas
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {bebidas.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => onAddToCart(product)}
          />
        ))}
      </div>
    </>
  );
}
