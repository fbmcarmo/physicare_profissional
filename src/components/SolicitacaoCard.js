import React from 'react';
import PropTypes from 'prop-types';

const SolicitacaoCard = ({ solicitacao }) => {
  const { status, profissionalId, dataSolicitacao } = solicitacao;

  return (
    <div className="solicitacao-card">
      <h3>Profissional: {profissionalId.name}</h3>
      <p>Status: {status}</p>
      <p>Data de Solicitacao: {new Date(dataSolicitacao).toLocaleDateString()}</p>
    </div>
  );
};

SolicitacaoCard.propTypes = {
  solicitacao: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    profissionalId: PropTypes.object.isRequired,
    dataSolicitacao: PropTypes.string.isRequired,
  }).isRequired,
};

export default SolicitacaoCard;