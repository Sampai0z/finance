import { UserButton } from "@clerk/clerk-react";

function Header() {
  return (
    <header className="text-black py-8 shadow-lg mb-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-2">Controle Financeiro Pessoal</h1>
        <p className="text-xl opacity-90">
          Gerencie seus ganhos e gastos de forma simples e eficiente
        </p>
        <UserButton />
      </div>
    </header>
  );
}

export default Header;
