import React from 'react';
import '../styles/FichaCard.css';

const FichaCard = ({ ficha }) => {
  return (
    <div className="ficha-card">
      <h3 className="ficha-title">Ficha criada por {ficha.profissionalId.nome}</h3>
      <p className="ficha-date">Data: {new Date(ficha.data_criacao).toLocaleDateString()}</p>
      <div className="exercicios-container">
        {ficha.exercicios.map((exercicio) => (
          <div key={exercicio._id} className="exercicio-item">
            <p><strong>Exercício:</strong> {exercicio.nome}</p>
            <p><strong>Séries:</strong> {exercicio.series}</p>
            <p><strong>Repetições:</strong> {exercicio.repeticoes}</p>
            <p><strong>Intensidade:</strong> {exercicio.intensidade}</p>
            <p><strong>Frequência:</strong> {exercicio.frequencia}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FichaCard;
