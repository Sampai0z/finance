import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    terms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar se as senhas coincidem
    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    // Aqui você implementaria a lógica de registro
    console.log("Registro com:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Nome Completo
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="Seu nome completo"
          required
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="seu@email.com"
          required
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Telefone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="(00) 00000-0000"
          required
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Senha
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            placeholder="••••••••"
            required
            minLength={6}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          A senha deve ter pelo menos 6 caracteres
        </p>
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Confirmar Senha
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            placeholder="••••••••"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Endereço
        </label>
        <input
          id="address"
          name="address"
          type="text"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="Rua, número, bairro, cidade"
          required
        />
      </div>

      <div className="flex items-center">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          checked={formData.terms}
          onChange={handleChange}
          className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
          required
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
          Eu concordo com os{" "}
          <a href="#" className="text-amber-600 hover:underline">
            Termos de Serviço
          </a>{" "}
          e{" "}
          <a href="#" className="text-amber-600 hover:underline">
            Política de Privacidade
          </a>
        </label>
      </div>

      <div>
        <button
          type="submit"
          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Criar Conta
        </button>
      </div>
    </form>
  );
}
