import React from 'react';
import '../styles/cardMeuCliente.css';
import { finalizarContato } from '../services/solicitacaoService'; // Importa a função de finalizar contato


const CardMeuCliente = ({ solicitacao, cliente }) => {
  const { status, _id: solicitacaoId } = solicitacao;
  
  // Função para abrir o link do WhatsApp
  const handleContato = () => {
    const telefone = cliente.telefone; 
    const link = `https://wa.me/${telefone}`;
    window.open(link, '_blank'); // Abre o link do WhatsApp em uma nova aba
  };

  const handleFinalizar = async () => {
    try {
      await finalizarContato(solicitacao._id); // Chama a função do serviço
      alert('Contato finalizado com sucesso.');
      window.location.reload(); // Recarrega a página
    } catch (error) {
      alert('Erro ao finalizar o contato.');
    }
  };
  

  return (
    <div className="card-meu-cliente">
      <h3>Cliente: {cliente.nome}</h3> {/* Exibe o nome do cliente */}
      <p>Status: {status}</p> {/* Status da Solicitação */}
      <p>Telefone: {cliente.telefone}</p> {/* Exibe o telefone do cliente */}

      <div className="buttons-container">
        {/* Botão de Aceitar */}
        {status === 'Pendente' && (
          <button className="btn aceitar">Aceitar</button>
        )}

        {/* Botão de Rejeitar */}
        {status === 'Pendente' && (
          <button className="btn rejeitar">Rejeitar</button>
        )}

        {/* Botões adicionais se a solicitação for aceita */}
        {status === 'Aceito' && (
          <>
            <button className="btn finalizar" onClick={handleFinalizar}>Finalizar</button>
            <button className="btn editar-ficha">Editar Ficha</button>
            <button className="btn contato" onClick={handleContato}>
              Contato
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CardMeuCliente;
