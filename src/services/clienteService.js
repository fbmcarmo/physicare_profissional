import api from './api';

export const buscarClientes = async () => {
  try {
    const response = await api.get('/clientes');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    throw new Error("Erro ao buscar clientes");
  }
};

export const listarClientePorId = async (clienteId) => {
  try {
    const response = await api.get(`/clientes/${clienteId}`);
    return response.data; // Retorna os dados do cliente
  } catch (err) {
    if (err.response) {
      // Se houver uma resposta do servidor
      console.error('Erro ao buscar cliente:', err.response.data);
      throw new Error(`Erro ao buscar cliente: ${err.response.data.message || err.response.statusText}`);
    } else if (err.request) {
      // Se não houver resposta do servidor
      console.error('Erro na requisição:', err.request);
      throw new Error('Erro na requisição. Verifique a conexão com o servidor.');
    } else {
      // Outro tipo de erro
      console.error('Erro desconhecido:', err.message);
      throw new Error('Erro desconhecido ao buscar cliente');
    }
  }
};