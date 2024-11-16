import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import BuscarClientes from './pages/buscar-clientes';
import MeusClientes from './pages/meus-clientes';
import MinhaConta from './pages/minha-conta';
import Cadastro from './pages/cadastro';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/buscar-clientes" element={<BuscarClientes />} />
        <Route path="/meus-clientes" element={<MeusClientes />} />
        <Route path="/minha-conta" element={<MinhaConta />} />
      </Routes>
    </Router>
  );
}

export default App;