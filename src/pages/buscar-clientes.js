import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import CardCliente from '../components/CardCliente';
import { buscarClientes } from '../services/clienteService'; 
import "../styles/buscarClientes.css";

const BuscarClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await buscarClientes();
        setClientes(data);
      } catch (error) {
        setError("Erro ao carregar clientes");
      }
    };

    fetchClientes();
  }, []);

  return (
    <div className="buscar-clientes-container">
      <Header /> {/* Header na página */}
      <h2>Buscar Clientes</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="clientes-list">
        {clientes.length === 0 ? (
          <p>Não há clientes cadastrados.</p>
        ) : (
          clientes.map((cliente) => <CardCliente key={cliente._id} cliente={cliente} />)
        )}
      </div>
    </div>
  );
};

export default BuscarClientes;