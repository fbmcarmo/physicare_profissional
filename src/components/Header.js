import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../services/authService';
import "../styles/header.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="header-container">
      <nav className="header-nav">
        <ul className="header-menu">
          <li className={location.pathname === '/dashboard' ? 'active' : ''}>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className={location.pathname === '/buscar-clientes' ? 'active' : ''}>
            <Link to="/buscar-clientes">Buscar Clientes</Link>
          </li>
          <li className={location.pathname === '/meus-clientes' ? 'active' : ''}>
            <Link to="/meus-clientes">Meus Clientes</Link>
          </li>
          <li className={location.pathname === '/minha-conta' ? 'active' : ''}>
            <Link to="/minha-conta">Minha Conta</Link>
          </li>
          <li>
            <button className="logout-button" onClick={handleLogout}>Sair</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
