import { useState } from "react";
import { Plus, Edit, Trash2, MapPin, Check } from "lucide-react";

// Dados simulados de endereços
const addressesData = [
  {
    id: 1,
    title: "Casa",
    street: "Rua das Flores",
    number: "123",
    complement: "Apto 101",
    neighborhood: "Jardim Primavera",
    city: "São Paulo",
    state: "SP",
    zipCode: "01234-567",
    isDefault: true,
  },
  {
    id: 2,
    title: "Trabalho",
    street: "Avenida Paulista",
    number: "1000",
    complement: "Sala 45",
    neighborhood: "Bela Vista",
    city: "São Paulo",
    state: "SP",
    zipCode: "01310-100",
    isDefault: false,
  },
];

export default function Addresses() {
  const [addresses, setAddresses] = useState(addressesData);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);

  const [newAddress, setNewAddress] = useState({
    title: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
    isDefault: false,
  });

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
      title: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
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

  const handleUpdateAddress = (e) => {
    e.preventDefault();

    // Em uma aplicação real, você enviaria isso para o backend

    // Se o endereço editado for definido como padrão, remova o padrão dos outros
    let updatedAddresses = addresses.map((address) =>
      newAddress.isDefault ? { ...address, isDefault: false } : address
    );

    // Atualizar o endereço específico
    updatedAddresses = updatedAddresses.map((address) =>
      address.id === editingAddressId
        ? { ...newAddress, id: address.id }
        : address
    );

    setAddresses(updatedAddresses);

    // Resetar o formulário
    setNewAddress({
      title: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      zipCode: "",
      isDefault: false,
    });

    setIsAddingNew(false);
    setEditingAddressId(null);
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
          <h1 className="text-2xl font-bold text-amber-800">Meus Endereços</h1>
          <p className="text-amber-600">Gerencie seus endereços de entrega.</p>
        </div>

        <button
          onClick={() => {
            setIsAddingNew(!isAddingNew);
            setEditingAddressId(null);
            setNewAddress({
              title: "",
              street: "",
              number: "",
              complement: "",
              neighborhood: "",
              city: "",
              state: "",
              zipCode: "",
              isDefault: false,
            });
          }}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium ${
            isAddingNew
              ? "bg-gray-200 text-gray-700"
              : "bg-amber-600 text-white hover:bg-amber-700"
          }`}
        >
          {isAddingNew ? (
            <span>Cancelar</span>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              <span>Adicionar Endereço</span>
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
                  htmlFor="street"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Rua/Avenida
                </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={newAddress.street}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="number"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Número
                </label>
                <input
                  type="text"
                  id="number"
                  name="number"
                  value={newAddress.number}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="complement"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Complemento
                </label>
                <input
                  type="text"
                  id="complement"
                  name="complement"
                  placeholder="Apto, Bloco, etc."
                  value={newAddress.complement}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="neighborhood"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Bairro
                </label>
                <input
                  type="text"
                  id="neighborhood"
                  name="neighborhood"
                  value={newAddress.neighborhood}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Cidade
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={newAddress.city}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Estado
                </label>
                <select
                  id="state"
                  name="state"
                  value={newAddress.state}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                >
                  <option value="">Selecione</option>
                  <option value="SP">São Paulo</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="MG">Minas Gerais</option>
                  {/* Adicione outros estados conforme necessário */}
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
            <div key={address.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start">
                <div>
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

                  <div className="mt-2 text-gray-700">
                    <p>
                      {address.street}, {address.number}
                      {address.complement ? `, ${address.complement}` : ""}
                    </p>
                    <p>
                      {address.neighborhood}, {address.city} - {address.state}
                    </p>
                    <p>CEP: {address.zipCode}</p>
                  </div>
                </div>

                <div className="flex space-x-2">
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
