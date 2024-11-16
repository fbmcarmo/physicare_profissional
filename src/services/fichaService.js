import api from './api';
import { getClienteFromToken } from './authService';

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
    const clienteData = getClienteFromToken();
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

export const editarFicha = async (fichaId, dadosAtualizados) => {
  try {
    const response = await api.put(`/fichas/${fichaId}`, dadosAtualizados);
    return response.data;
  } catch (error) {
    console.error('Erro ao editar ficha:', error);
    throw error;
  }
};
