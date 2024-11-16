import React from 'react';
import "../styles/cardCliente.css";

const CardCliente = ({ cliente }) => {
  return (
    <div className="card-cliente">
      <div className="card-header">
        <h3 className="cliente-nome">{cliente.nome}</h3>
        <p className="cliente-email">{cliente.email}</p>
      </div>
      <div className="card-body">
        <p><strong>Telefone:</strong> {cliente.telefone}</p>
        <p><strong>Objetivo:</strong> {cliente.objetivo}</p>
        <p><strong>Data de Nascimento:</strong> {new Date(cliente.data_nascimento).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default CardCliente;