import { useState } from "react";
import ProductCard from "./ProductCard";

// Dados simulados dos produtos
const salgadosData = [
  {
    id: 1,
    name: "Coxinha de Frango",
    description: "Coxinha tradicional de frango com catupiry",
    price: 5.5,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Pastel de Carne",
    description: "Pastel crocante recheado com carne moída temperada",
    price: 6.0,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Kibe",
    description: "Kibe tradicional com recheio de carne moída e trigo",
    price: 5.0,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Bolinha de Queijo",
    description: "Bolinha crocante recheada com queijo",
    price: 4.5,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    name: "Esfiha de Carne",
    description: "Esfiha aberta com recheio de carne moída temperada",
    price: 5.5,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "Risole de Presunto e Queijo",
    description: "Risole crocante recheado com presunto e queijo",
    price: 5.0,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 7,
    name: "Empada de Frango",
    description: "Empada com massa amanteigada e recheio de frango",
    price: 6.5,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 8,
    name: "Pão de Queijo",
    description: "Pão de queijo mineiro tradicional",
    price: 3.5,
    image: "/placeholder.svg?height=200&width=200",
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
    <div className="w-3/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {salgadosData.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={() => addToCart(product.id)}
        />
      ))}
    </div>
  );
}
