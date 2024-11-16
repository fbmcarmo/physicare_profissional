import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cadastro, login } from "../services/authService";
import "../styles/cadastro.css";

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    telefone: "",
    especialidade: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Limpa erros anteriores

    try {
      const response = await cadastro(formData); // Chama o serviço
      console.log("Usuário cadastrado:", response);
      login(formData.email, formData.senha)
      navigate("/dashboard"); // Redireciona após sucesso
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="cadastro-form">
        <label>
          Nome:
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            required
            placeholder="Digite seu nome"
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="Digite seu email"
          />
        </label>
        <label>
          Senha:
          <input
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleInputChange}
            required
            placeholder="Digite sua senha"
          />
        </label>
        <label>
          Telefone:
          <input
            type="text"
            name="telefone"
            value={formData.telefone}
            onChange={handleInputChange}
            required
            placeholder="Digite seu telefone"
          />
        </label>
        <label>
          Especialidade:
          <input
            type="text"
            name="especialidade"
            value={formData.especialidade}
            onChange={handleInputChange}
            required
            placeholder="Qual sua especialidade?"
          />
        </label>
        <button type="submit" className="submit-btn">Cadastrar</button>
      </form>
    </div>
  );
};

export default Cadastro;
