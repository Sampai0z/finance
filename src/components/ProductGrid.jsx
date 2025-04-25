import { useState } from "react";
import ProductCard from "./ProductCard";

// Dados simulados dos produtos
const salgadosData = [
  {
    name: "Coxinha de Frango",
    price: 1.0,
    category: "salgado",
  },
  {
    name: "Batatinha Recheada",
    price: 1.0,
    category: "salgado",
  },
  {
    name: "Quibe Recheado",
    price: 1.0,
    category: "salgado",
  },
  {
    name: "Enroladinho de Queijo",
    price: 1.0,
    category: "salgado",
  },
  {
    name: "Enroladinho de Salsicha",
    price: 1.0,
    category: "salgado",
  },
  {
    name: "Mini Pastel",
    price: 1.0,
    category: "salgado",
  },
];
const bebidas = [
  {
    name: "Suco",
    price: 2.0,
    category: "bebida",
  },
  {
    name: "Refrigerante",
    price: 3.0,
    category: "bebida",
  },
  {
    name: "Água",
    price: 2.0,
    category: "bebida",
  },
];

export default function ProductGrid() {
  const [setCart] = useState([]);

  const addToCart = (productId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { id: productId, quantity: 1 }];
      }
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {salgadosData.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => addToCart(product.id)}
          />
        ))}
      </div>
      <h2 className="text-3xl font-bold text-center m-5  p-5 text-amber-800">
        Bebidas
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {bebidas.map((product) => (
          <ProductCard
            key={bebidas.id}
            product={product}
            onAddToCart={() => addToCart(product.id)}
          />
        ))}
      </div>
    </>
  );
}
