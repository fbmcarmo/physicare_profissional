import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o useNavigate do React Router v6
import '../styles/cardMeuCliente.css';
import { aceitarSolicitacao, finalizarContato, rejeitarSolicitacao } from '../services/solicitacaoService';
import { fetchMinhasFichasProfissionais } from '../services/fichaService';
import { getUsuarioFromToken } from '../services/authService';

const CardMeuCliente = ({ solicitacao, cliente }) => {
  const { status, _id: solicitacaoId } = solicitacao;
  const [fichas, setFichas] = useState([]);
  const navigate = useNavigate(); // Hook para navegação

  // Carregar as fichas do profissional assim que o componente for montado
  useEffect(() => {
    const usuario = getUsuarioFromToken(); // Supondo que isso retorne o usuário
    if (usuario && usuario.id) {
      fetchMinhasFichasProfissionais(usuario.id)
        .then(fichas => setFichas(fichas)) // Atualiza o estado com as fichas
        .catch(err => console.error("Erro ao buscar as fichas:", err));
    }
  }, []);

  // Função para abrir o link do WhatsApp
  const handleContato = () => {
    const telefone = cliente.telefone;
    const link = `https://wa.me/${telefone}`;
    window.open(link, '_blank'); // Abre o link do WhatsApp em uma nova aba
  };

  const handleFinalizar = async () => {
    try {
      await finalizarContato(solicitacaoId); // Chama a função do serviço
      alert('Contato finalizado com sucesso.');
      window.location.reload(); // Recarrega a página
    } catch (error) {
      alert('Erro ao finalizar o contato.');
    }
  };

  const handleRejeitar = async () => {
    try {
      await rejeitarSolicitacao(solicitacaoId); // Chama a função do serviço
      alert('Contato rejeitado com sucesso.');
      window.location.reload(); // Recarrega a página
    } catch (error) {
      alert('Erro ao finalizar o contato.');
    }
  };

  const handleAceitar = async () => {
    try {
      await aceitarSolicitacao(solicitacaoId); // Chama a função do serviço
      alert('Contato aceito com sucesso.');
      window.location.reload(); // Recarrega a página
    } catch (error) {
      alert('Erro ao finalizar o contato.');
    }
  };

  const handleEditar = async () => {
    // Encontrar a ficha associada à solicitação ou cliente
    const fichaAssociada = fichas.find(ficha => ficha.clienteId === cliente._id); // ou utilize um campo associativo de sua lógica
    if (fichaAssociada) {
      console.log("ID da ficha associada: ", fichaAssociada._id); // Exibe o ID da ficha associada
      // Redirecionar para a página de edição da ficha
      navigate(`/editar-ficha/${fichaAssociada._id}`);
    } else {
      console.log("Nenhuma ficha associada encontrada.");
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
          <button className="btn aceitar" onClick={handleAceitar}>Aceitar</button>
        )}

        {/* Botão de Rejeitar */}
        {status === 'Pendente' && (
          <button className="btn rejeitar" onClick={handleRejeitar}>Rejeitar</button>
        )}

        {/* Botões adicionais se a solicitação for aceita */}
        {status === 'Aceito' && (
          <>
            <button className="btn finalizar" onClick={handleFinalizar}>Finalizar</button>
            <button className="btn editar-ficha" onClick={handleEditar}>Editar Ficha</button>
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
