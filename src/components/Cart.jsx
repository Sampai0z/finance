import { useState, useEffect } from "react";
// import { Trash2 } from "lucide-react" // Descomente se quiser usar o ícone
// import { Button } from "@/components/ui/button"

// Dados simulados dos produtos
const salgadosData = [
  { id: 1, name: "Coxinha de Frango", price: 5.5 },
  { id: 2, name: "Pastel de Carne", price: 6.0 },
  { id: 3, name: "Kibe", price: 5.0 },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    { id: 1, quantity: 2 },
    { id: 2, quantity: 1 },
  ]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = cartItems.reduce((sum, item) => {
      const product = salgadosData.find((p) => p.id === item.id);
      return sum + (product?.price || 0) * item.quantity;
    }, 0);

    // Adiciona a taxa de entrega ao total
    setTotal(newTotal + 5); // Taxa de entrega fixa
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
        <Button
          className="mt-4 bg-amber-600 hover:bg-amber-700"
          onClick={() => (window.location.href = "#produtos")}
        >
          Ver Produtos
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="space-y-4">
        {cartItems.map((item) => {
          const product = salgadosData.find((p) => p.id === item.id);
          if (!product) return null;

          return (
            <div
              key={item.id}
              className="flex justify-between items-center pb-4 border-b"
            >
              <div>
                <h4 className="font-medium">{product.name}</h4>
                <p className="text-amber-600">R$ {product.price.toFixed(2)}</p>
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
                  {/* <Trash2 className="h-5 w-5" /> */}
                  <p>Remover</p>
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
