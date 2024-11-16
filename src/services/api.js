import axios from 'axios';

// Criar uma instância do Axios
const api = axios.create({
  baseURL: 'http://localhost:5000/', // URL base
  headers: {
    'Content-Type': 'application/json',
  },
});

// interceptors para manipulação de erros, se necessário
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      console.log("Token expirado");
    }
    return Promise.reject(error);
  }
);

export default api;