import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, MapPin, Check } from "lucide-react";
import api from "../../services/api";

export default function Addresses() {
  const [profile, setProfile] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);

  const [newAddress, setNewAddress] = useState({
    // title: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    zipCode: "",
    isDefault: false,
  });

  const getUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Usuário não autenticado");

      const response = await api.get("/api/usuario", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = response.data;
      setProfile(user);

      // Atualiza addresses com dados vindos do backend
      const userAddress = {
        id: user.id,
        title: "Casa",
        endereco: user.endereco,
        numero: user.numero,
        complemento: user.complemento,
        bairro: user.bairro,
        cidade: user.cidade,
        estado: user.estado,
        zipCode: user.cep,
        isDefault: true,
      };

      setAddresses([userAddress]);
    } catch (err) {
      console.error(err.response?.data?.message || "Erro desconhecido");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const address = {
    id: profile?.id,
    title: "Casa", // Valor fixo ou pode vir do DB
    endereco: profile?.endereco,
    numero: profile?.numero, // Se não tiver no DB, deixa vazio ou crie lógica para extrair
    complemento: profile?.complemento,
    bairro: profile?.bairro,
    cidade: profile?.cidade,
    zipCode: profile?.cep,
    isDefault: true, // Define como quiser
  };
  console.log(address);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const checked = e.target.checked;

    setNewAddress({
      ...newAddress,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddAddress = (e) => {
    e.preventDefault();

    // Em uma aplicação real, você enviaria isso para o backend
    const newId = Math.max(...addresses.map((a) => a.id)) + 1;

    // Se o novo endereço for definido como padrão, remova o padrão dos outros
    let updatedAddresses = addresses;
    if (newAddress.isDefault) {
      updatedAddresses = addresses.map((address) => ({
        ...address,
        isDefault: false,
      }));
    }

    setAddresses([
      ...updatedAddresses,
      {
        ...newAddress,
        id: newId,
      },
    ]);

    // Resetar o formulário
    setNewAddress({
      // title: "",
      endereco: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: "",
      zipCode: "",
      isDefault: false,
    });

    setIsAddingNew(false);
  };

  const handleEditAddress = (address) => {
    setNewAddress(address);
    setEditingAddressId(address.id);
    setIsAddingNew(true);
  };
  const handleUpdateAddress = async (e) => {
    e.preventDefault();

    // Atualiza o estado localmente antes de enviar para o backend
    let updatedAddresses = addresses.map((address) =>
      newAddress.isDefault ? { ...address, isDefault: false } : address
    );

    updatedAddresses = updatedAddresses.map((address) =>
      address.id === editingAddressId
        ? { ...newAddress, id: address.id }
        : address
    );
    const token = localStorage.getItem("token");
    // Agora, enviamos a requisição PUT para o backend
    try {
      const response = await api.put(
        "/api/cliente/endereco",
        {
          endereco: newAddress.endereco,
          numero: newAddress.numero,
          complemento: newAddress.complemento,
          bairro: newAddress.bairro,
          cidade: newAddress.cidade,
          estado: newAddress.estado,
          zipCode: newAddress.zipCode,
          isDefault: newAddress.isDefault,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Adicione o token de autenticação aqui
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Sucesso na atualização
        setAddresses(updatedAddresses);
        // Resetar o formulário
        setNewAddress({
          // title: "",
          endereco: "",
          numero: "",
          complemento: "",
          bairro: "",
          cidade: "",
          estado: "",
          zipCode: "",
          isDefault: false,
        });
        setIsAddingNew(false);
        setEditingAddressId(null);
        console.log("Endereço atualizado com sucesso!");
      } else {
        console.log("Falha ao atualizar o endereço");
      }
    } catch (error) {
      console.error("Erro ao atualizar o endereço:", error);
    }
  };

  const handleDeleteAddress = (id) => {
    // Em uma aplicação real, você enviaria isso para o backend
    if (window.confirm("Tem certeza que deseja excluir este endereço?")) {
      setAddresses(addresses.filter((address) => address.id !== id));
    }
  };

  const handleSetDefault = (id) => {
    // Em uma aplicação real, você enviaria isso para o backend
    setAddresses(
      addresses.map((address) => ({
        ...address,
        isDefault: address.id === id,
      }))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="md:text-2xl text-xl font-bold text-amber-800">Meus Endereços</h1>
          <p className="md:text-base text-sm text-amber-600">Gerencie seus endereços de entrega.</p>
        </div>

        <button
          onClick={() => {
            setIsAddingNew(!isAddingNew);
            setEditingAddressId(null);
            setNewAddress({
              // title: "",
              endereco: "",
              numero: "",
              complemento: "",
              bairro: "",
              cidade: "",
              estado: "",
              zipCode: "",
              isDefault: false,
            });
          }}
          className={`flex items-center mx-8 md:space-x-2 md:px-4 md:py-2 space-x-1 px-2 py-1 rounded-lg text-sm font-medium ${
            isAddingNew
              ? "bg-gray-200 text-gray-700"
              : "bg-amber-600 text-white hover:bg-amber-700"
          }`}
        >
          {isAddingNew ? (
            <span>Cancelar</span>
          ) : (
            <>
              <Plus className="md:h-4 md:w-4 h-6 w-6" />
              <span className="md:block hidden">Adicionar Endereço</span>
            </>
          )}
        </button>
      </div>

      {isAddingNew && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-amber-800 mb-6">
            {editingAddressId ? "Editar Endereço" : "Novo Endereço"}
          </h2>

          <form
            onSubmit={editingAddressId ? handleUpdateAddress : handleAddAddress}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Título do Endereço
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Ex: Casa, Trabalho"
                  value={newAddress.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                  disabled
                />
              </div>

              <div>
                <label
                  htmlFor="zipCode"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  CEP
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  placeholder="00000-000"
                  value={newAddress.zipCode}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="endereco"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Rua/Avenida
                </label>
                <input
                  type="text"
                  id="endereco"
                  name="endereco"
                  value={newAddress.endereco}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                  type="text"
                  id="numero"
                  name="numero"
                  value={newAddress.numero}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                  type="text"
                  id="complemento"
                  name="complemento"
                  placeholder="Apto, Bloco, etc."
                  value={newAddress.complemento}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                  type="text"
                  id="bairro"
                  name="bairro"
                  value={newAddress.bairro}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="cidade"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Cidade
                </label>
                <input
                  type="text"
                  id="cidade"
                  name="cidade"
                  value={newAddress.cidade}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
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
                  value={newAddress.estado}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                >
                  <option value="">Selecione</option>
                  <option value="BA">Bahia - Juazeiro</option>
                  <option value="PE">Pernambuco - Petrolina</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isDefault"
                    name="isDefault"
                    checked={newAddress.isDefault}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="isDefault"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Definir como endereço padrão
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                {editingAddressId ? "Atualizar Endereço" : "Adicionar Endereço"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {addresses.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <MapPin className="h-12 w-12 text-amber-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Nenhum endereço cadastrado
            </h3>
            <p className="text-gray-500 mb-4">
              Adicione um endereço para facilitar suas compras.
            </p>
            <button
              onClick={() => setIsAddingNew(true)}
              className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Adicionar Endereço
            </button>
          </div>
        ) : (
          addresses.map((address) => (
            <div key={address.id} className="bg-white rounded-lg shadow-sm md:p-6 p-2">
              <div className="flex justify-between items-start relative">
                <div className="w-full">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-medium text-amber-800">
                      {address.title}
                    </h3>
                    {address.isDefault && (
                      <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                        Padrão
                      </span>
                    )}
                  </div>

                  <div className="w-full mt-2 text-gray-700">
                    <p>
                      {address.endereco}, {address.numero}
                      {address.complemento ? `, ${address.complemento}` : ""} 
                      {address.bairro ? `, ${address.bairro}` : ""} 
                      {address.cidade}
                      {address.estado ? `- ${address.estado}` : ""}
                    </p>
                    <p>CEP: {address.zipCode}</p>
                  </div>
                </div>

                <div className="absolute top-2 right-4 flex space-x-2">
                  <button
                    onClick={() => handleEditAddress(address)}
                    className="p-2 text-amber-600 hover:text-amber-800 hover:bg-amber-50 rounded-full"
                    aria-label="Editar"
                  >
                    <Edit className="h-5 w-5" />
                  </button>

                  <button
                    onClick={() => handleDeleteAddress(address.id)}
                    className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full"
                    aria-label="Excluir"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>

                  {!address.isDefault && (
                    <button
                      onClick={() => handleSetDefault(address.id)}
                      className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-full"
                      aria-label="Definir como padrão"
                    >
                      <Check className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
