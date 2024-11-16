import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';
import "../styles/header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header-container">
      <nav className="header-nav">
        <ul className="header-menu">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/buscar-cliente">Buscar Cliente</Link></li>
          <li><Link to="/meus-clientes">Meus Clientes</Link></li>
          <li><Link to="/minhas-fichas">Minhas Fichas</Link></li>
          <li><Link to="/minha-conta">Minha Conta</Link></li>
          <li><button className="logout-button" onClick={handleLogout}>Sair</button></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
