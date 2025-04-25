import { useState } from "react";
import { Save } from "lucide-react";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "João da Silva",
    email: "joao.silva@email.com",
    phone: "(11) 98765-4321",
    birthdate: "1990-05-15",
    cpf: "123.456.789-00",
    notifications: {
      email: true,
      sms: false,
      promotions: true,
    },
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setProfile({
        ...profile,
        notifications: {
          ...profile.notifications,
          [name.split(".")[1]]: checked,
        },
      });
    } else {
      setProfile({
        ...profile,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Perfil atualizado:", profile);
    setIsEditing(false);
    alert("Perfil atualizado com sucesso!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-amber-800">Meu Perfil</h1>
        <p className="text-amber-600">Gerencie suas informações pessoais.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-amber-800">
            Informações Pessoais
          </h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              isEditing
                ? "bg-gray-200 text-gray-700"
                : "bg-amber-100 text-amber-800 hover:bg-amber-200"
            }`}
          >
            {isEditing ? "Cancelar" : "Editar"}
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nome Completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
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
                type="email"
                id="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
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
                type="tel"
                id="phone"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>

            <div>
              <label
                htmlFor="birthdate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Data de Nascimento
              </label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                value={profile.birthdate}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>

            <div>
              <label
                htmlFor="cpf"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                CPF
              </label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                value={profile.cpf}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-md font-medium text-amber-800 mb-4">
              Preferências de Notificação
            </h3>

            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="notifications.email"
                  name="notifications.email"
                  checked={profile.notifications.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="notifications.email"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Receber notificações por email
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="notifications.sms"
                  name="notifications.sms"
                  checked={profile.notifications.sms}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="notifications.sms"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Receber notificações por SMS
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="notifications.promotions"
                  name="notifications.promotions"
                  checked={profile.notifications.promotions}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="notifications.promotions"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Receber promoções e novidades
                </label>
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="flex items-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>Salvar Alterações</span>
              </button>
            </div>
          )}
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-amber-800 mb-6">Segurança</h2>

        <div className="space-y-4">
          <button className="text-amber-600 hover:text-amber-800 font-medium">
            Alterar Senha
          </button>

          <button className="text-amber-600 hover:text-amber-800 font-medium">
            Ativar Autenticação de Dois Fatores
          </button>

          <button className="text-red-600 hover:text-red-800 font-medium">
            Excluir Minha Conta
          </button>
        </div>
      </div>
    </div>
  );
}
