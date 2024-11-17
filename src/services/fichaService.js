import api from './api';
import { getTokenFromCookie, getUsuarioFromToken } from './authService';

// Função para buscar todas as fichas
export const fetchFichas = async () => {
  try {
    const response = await api.get('/fichas');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar fichas:', error);
    throw error;
  }
};

// Função para buscar as fichas de um cliente específico
export const fetchMinhasFichasCliente = async () => {
  try {
    const clienteData = getUsuarioFromToken();
    if (!clienteData || !clienteData.id) {
      throw new Error('ID do cliente não encontrado');
    }

    const response = await api.get(`/fichas/clientes/${clienteData.id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar fichas do cliente:', error);
    throw error;
  }
};

// Função para buscar as fichas de um profissional específico
export const fetchMinhasFichasProfissionais = async (profissionalId) => {
  try {
    const response = await api.get(`/fichas/profissionais/${profissionalId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar fichas do profissional:', error);
    throw error;
  }
};

// Função para buscar uma ficha específica pelo ID
export const fetchFichaById = async (fichaId) => {
  try {
    const response = await api.get(`/fichas/${fichaId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar ficha pelo ID:', error);
    throw error;
  }
};

// Função para criar uma nova ficha
export const criarFicha = async (novaFicha) => {
  try {
    const response = await api.post('/fichas', novaFicha);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar nova ficha:', error);
    throw error;
  }
};

// Função para editar uma ficha existente
export const editarFicha = async (fichaId, dadosAtualizados) => {
  try {
    const token = getTokenFromCookie(); // Obtém o token de autenticação
    const response = await api.put(
      `/fichas/${fichaId}`,
      dadosAtualizados,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao editar ficha:', error);
    throw error;
  }
};

// Função para adicionar um exercício a uma ficha
export const adicionarExercicioNaFicha = async (fichaId, novoExercicio) => {
  try {
    const response = await api.patch(`/fichas/${fichaId}/exercicios`, novoExercicio);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar exercício na ficha:', error);
    throw error;
  }
};

// Função para deletar uma ficha pelo ID
export const deletarFicha = async (fichaId) => {
  try {
    await api.delete(`/fichas/${fichaId}`);
    return { message: 'Ficha deletada com sucesso.' };
  } catch (error) {
    console.error('Erro ao deletar ficha:', error);
    throw error;
  }
};

// Função para remover um exercício específico de uma ficha
export const removerExercicioDaFicha = async (fichaId, exercicioId) => {
  try {
    const response = await api.delete(`/fichas/${fichaId}/exercicios/${exercicioId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao remover exercício da ficha:', error);
    throw error;
  }
};
export const apagarFicha = async (fichaId) => {
  try {
    const token = getTokenFromCookie(); // Obtém o token de autenticação

    // Se o token não existir, lança um erro
    if (!token) {
      throw new Error('Token de autenticação não encontrado');
    }

    // Faz a requisição PUT para apagar os exercícios da ficha
    const response = await api.put(
      `/fichas/${fichaId}`,
      { exercicios: [] }, // Remove todos os exercícios
      {
        headers: {
          Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Erro ao apagar ficha:', error);
    throw error;
  }
};
