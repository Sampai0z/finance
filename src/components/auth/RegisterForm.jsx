import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    password: "",
    telefone: "",
    confirmPassword: "",
    cidade: "",
    endereco: "",
    bairro: "",
    numero: "",
    complemento: "",
    estado: "",
    cep: "",
    terms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "cep") {
      // Máscara para formatar o CEP
      const formattedValue = value
        .replace(/\D/g, "") // Remove todos os caracteres não numéricos
        .replace(/^(\d{5})(\d{3})$/, "$1-$2");
      setFormData({
        ...formData,
        [name]: formattedValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validar se as senhas coincidem
    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    // Validar CEP
    const isCepValid = /^[0-9]{5}-[0-9]{3}$/.test(formData.cep);
    if (!isCepValid) {
      alert("CEP inválido! O formato correto é 00000-000.");
      return;
    }

    try {
      const response = await api.post("/api/clientes/cadastro", formData);

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        navigate("/");
      } else {
        throw new Error("Token não recebido");
      }
    } catch (err) {
      console.error(
        "Erro ao registrar:",
        err.response?.data?.message || "Erro desconhecido"
      );
      alert("Erro ao cadastrar, tente novamente!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="nome"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Nome Completo
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          value={formData.nome}
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
          htmlFor="telefone"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Telefone
        </label>
        <input
          id="telefone"
          name="telefone"
          type="tel"
          value={formData.telefone}
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
          htmlFor="estado"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Estado
        </label>
        <select
          id="estado"
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          required
        >
          <option value="">Selecione</option>
          <option value="BA">Bahia - Juazeiro</option>
          <option value="PE">Pernambuco - Petrolina</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="cidade"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Cidade
        </label>
        <input
          id="cidade"
          name="cidade"
          type="text"
          value={formData.cidade}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="Cidade"
          required
        />
      </div>
      <div>
        <label
          htmlFor="endereco"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Endereço
        </label>
        <input
          id="endereco"
          name="endereco"
          type="text"
          value={formData.endereco}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="Rua, Endereço"
          required
        />
      </div>
      <div>
        <label
          htmlFor="numero"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Número
        </label>
        <input
          id="numero"
          name="numero"
          type="text"
          value={formData.numero}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="Número"
          required
        />
      </div>
      <div>
        <label
          htmlFor="bairro"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Bairro
        </label>
        <input
          id="bairro"
          name="bairro"
          type="text"
          value={formData.bairro}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="Bairro"
          required
        />
      </div>
      <div>
        <label
          htmlFor="complemento"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Complemento
        </label>
        <input
          id="complemento"
          name="complemento"
          type="text"
          value={formData.complemento}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="complemento"
          required
        />
      </div>
      <div>
        <label
          htmlFor="cep"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          CEP
        </label>
        <input
          id="cep"
          name="cep"
          type="text"
          value={formData.cep}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="00000-000"
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
