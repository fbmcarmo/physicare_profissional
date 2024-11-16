import api from './api';
import Cookies from 'js-cookie'; 
import { jwtDecode } from 'jwt-decode'; // Usando a exportação nomeada

// Função para realizar o login
export const login = async (email, password) => {
  try {

    const response = await api.post('/profissionais/login', 
      { email, senha: password },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    // Se houver um token, armazena no cookie
    const { token } = response.data;
    if (token) {
      Cookies.set('token', token, { expires: 7, path: '/' });
    }

    return response.data; // Retorna os dados recebidos da resposta
  } catch (error) {
    // Tratamento de erro adequado
    const errorMessage = error.response?.data?.error || "Erro ao fazer login";
    throw new Error(errorMessage);
  }
};

// Função para realizar o logout
export const logout = () => {
  // Remove o token do cookie
  Cookies.remove('token', { path: '/' });
};

// Função para verificar se o usuário está autenticado
export const isAuthenticated = () => {
  const token = Cookies.get('token'); // Obtém o token do cookie
  return token !== undefined; // Retorna true se o token estiver presente
};

// Função para decodificar o token e obter os dados do cliente
export const getUsuarioFromToken = () => {
  const token = Cookies.get('token');
  
  if (!token) {
    return null; // Se não houver token, retorna null
  }

  try {
    const decoded = jwtDecode(token); // Decodifica o token
    return decoded; // Retorna os dados decodificados (como o ID do cliente)
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return null;
  }
};

export const getTokenFromCookie = () => {
  const name = "token=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split(';');
  
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
};

// Função para buscar os dados completos do cliente no backend
export const fetchClienteData = async () => {
  const decodedToken = getUsuarioFromToken();

  if (!decodedToken || !decodedToken.id) {
    throw new Error('Token inválido ou cliente não encontrado');
  }

  try {
    const response = await api.get(`/clientes/${decodedToken.id}`); // Chama a API para obter dados do cliente
    return response.data; // Retorna os dados do cliente
  } catch (error) {
    throw new Error('Erro ao buscar os dados do cliente');
  }
};

export const fetchProfissionalData = async () => {
  const decodedToken = getUsuarioFromToken();

  if (!decodedToken || !decodedToken.id) {
    throw new Error('Token inválido ou cliente não encontrado');
  }

  try {
    const response = await api.get(`/profissionais/${decodedToken.id}`); // Chama a API para obter dados do profissional
    return response.data; // Retorna os dados do cliente
  } catch (error) {
    throw new Error('Erro ao buscar os dados do cliente');
  }
};