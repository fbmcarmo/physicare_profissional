  import React, { useState, useEffect } from 'react';
  import Header from '../components/Header';
  import { listarSolicitacoesPorUsuario } from '../services/solicitacaoService';
  import { getUsuarioFromToken } from '../services/authService';
  import { listarClientePorId } from '../services/clienteService';
  import CardMeuCliente from '../components/CardMeuCliente';
  import "../styles/meusClientes.css";

  const MeusClientes = () => {
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profissionalId, setProfissionalId] = useState(null);
    const [clientes, setClientes] = useState([]);

    // UseEffect para pegar o usuário logado
    useEffect(() => {
      const fetchUsuario = async () => {
        try {
          const usuario = await getUsuarioFromToken();
          setProfissionalId(usuario.id);
        } catch (err) {
          setError('Erro ao obter usuário');
        }
      };

      fetchUsuario();
    }, []);

    // UseEffect para pegar as solicitações do profissional
    useEffect(() => {
      if (!profissionalId) return;
    
      const fetchSolicitacoesPorUsuario = async () => {
        try {
          const data = await listarSolicitacoesPorUsuario(profissionalId); // Solicitações por usuário
          setSolicitacoes(data);

          // Pegando os IDs dos clientes para buscar os dados
          const clienteIds = data.map(solicitacao => solicitacao.clienteId);
          console.log('IDs dos clientes:', clienteIds); // Verifique se os IDs estão corretos
    
          // Buscando dados dos clientes
          const clientesData = await Promise.all(
            clienteIds.map(clienteId => listarClientePorId(clienteId))
          );

          setClientes(clientesData); // Definindo os clientes no estado
        } catch (err) {
          setError('Erro ao buscar dados dos clientes');
        } finally {
          setLoading(false);
        }
      };
    
      fetchSolicitacoesPorUsuario(); // Chama a função
    }, [profissionalId]);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error}</p>;

    return (
      <div className="meus-clientes-container">
        <Header />
        <h2>Meus Clientes</h2>

        {solicitacoes.length === 0 ? (
          <p>Você ainda não possui nenhum cliente.</p>
        ) : (
          <div className="clientes-list">
            {solicitacoes.map(solicitacao => {
              const cliente = clientes.find(cliente => cliente._id === solicitacao.clienteId);
              return cliente ? (
                <CardMeuCliente key={solicitacao._id} solicitacao={solicitacao} cliente={cliente} />
              ) : null;
            })}
          </div>
        )}
      </div>
    );
  };

  export default MeusClientes;
