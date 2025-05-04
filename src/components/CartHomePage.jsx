import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react"; // Descomente se quiser usar o ícone
// import { Button } from "@/components/ui/button";

// Dados simulados dos produtos
import { allProducts } from "../services/product";

export default function Cart({ cartItems, setCartItems }) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = cartItems.reduce((sum, item) => {
      const product = allProducts.find((p) => p.id === item.id);
      return sum + (product?.price || 0) * item.quantity;
    }, 0);

    setTotal(newTotal + 5);
  }, [cartItems]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm text-center">
        <p className="text-gray-500">Seu carrinho está vazio</p>
        <button
          className="mt-4 px-2 rounded-md md:rounded-lg text-white font-semibold bg-amber-600 hover:bg-amber-700"
          onClick={() => (window.location.href = "#produtos")}
        >
          Ver Produtos
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="space-y-4">
        {cartItems.map((item) => {
          const product = allProducts.find((p) => p.id === item.id);
          console.log(product);
          if (!product) return null;

          return (
            <div
              key={item.id}
              className="flex justify-between items-center pb-4 border-b"
            >
              <div>
                <h4 className="font-medium">{product.name}</h4>
                <p className="text-amber-600">R$ {product.price}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md"
                  >
                    -
                  </button>
                  <span className="w-10 h-8 flex items-center justify-center border-t border-b border-gray-300">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 space-y-2">
        <div className="flex justify-between font-medium">
          <span>Subtotal:</span>
          <span>R$ {total - 5.0}</span> {/* Subtotal sem a taxa de entrega */}
        </div>
        <div className="flex justify-between font-medium">
          <span>Taxa de entrega:</span>
          <span>R$ 5.00</span>
        </div>
        <div className="flex justify-between text-lg font-bold pt-2 border-t">
          <span>Total:</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
