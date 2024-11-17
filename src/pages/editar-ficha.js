import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { fetchFichaById, editarFicha, apagarFicha } from '../services/fichaService';
import '../styles/editarFicha.css'; // Importa o arquivo de estilos

const EditarFicha = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ficha, setFicha] = useState(null);
  const [novoExercicio, setNovoExercicio] = useState({
    nome: '',
    series: '',
    repeticoes: '',
    intensidade: '',
    frequencia: '',
  });

  useEffect(() => {
    const carregarFicha = async () => {
      try {
        const fichaCarregada = await fetchFichaById(id);
        setFicha(fichaCarregada);
      } catch (error) {
        console.error('Erro ao carregar ficha:', error);
      }
    };
    carregarFicha();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoExercicio((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAdicionarExercicio = () => {
    if (ficha && Array.isArray(ficha.exercicios)) {
      setFicha((prevState) => ({
        ...prevState,
        exercicios: [...prevState.exercicios, novoExercicio],
      }));
      setNovoExercicio({
        nome: '',
        series: '',
        repeticoes: '',
        intensidade: '',
        frequencia: '',
      });
    }
  };

  const handleSalvar = async () => {
    if (ficha && ficha.exercicios) {
      const dadosAtualizados = {
        exercicios: ficha.exercicios,
      };

      try {
        console.log('Enviando dados para o backend:', dadosAtualizados);
        await editarFicha(ficha._id, dadosAtualizados);
        alert('Ficha atualizada com sucesso!');
        navigate(-1);
      } catch (error) {
        console.error('Erro ao atualizar a ficha:', error);
        alert('Erro ao atualizar a ficha. Verifique os dados e tente novamente.');
      }
    }
  };

  const handleVoltar = () => {
    navigate(-1);
  };

  const handleApagarFicha = async () => {
    const confirmDelete = window.confirm('Tem certeza que deseja apagar todos os exercícios dessa ficha?');
    if (confirmDelete) {
      try {
        await apagarFicha(ficha._id); // Envia a requisição para apagar os exercícios
        alert('Ficha apagada com sucesso!');
        window.location.reload();
      } catch (error) {
        console.error('Erro ao apagar a ficha:', error);
        alert('Erro ao apagar a ficha. Tente novamente.');
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="editar-ficha-container">
        <h2 className="editar-ficha-title">Editar Ficha</h2>
        {ficha ? (
          <div>
            <h3 className="editar-ficha-subtitle">Cliente: {ficha.clienteId}</h3>
            <h4 className='editar-ficha-subtitle'>Exercícios Existentes:</h4>
            <ul className="exercicios-list">
              {ficha.exercicios.map((exercicio, index) => (
                <li key={index} className="exercicio-item">
                  <strong>{exercicio.nome}</strong>: {exercicio.series} séries de {exercicio.repeticoes} repetições,
                  intensidade {exercicio.intensidade}, {exercicio.frequencia}.
                </li>
              ))}
            </ul>
            <h4 className='editar-ficha-subtitle'>Adicionar Novo Exercício</h4>
            <div className="novo-exercicio-form">
              <input
                type="text"
                name="nome"
                placeholder="Nome do exercício"
                value={novoExercicio.nome}
                onChange={handleInputChange}
                className="novo-exercicio-input"
              />
              <input
                type="number"
                name="series"
                placeholder="Séries"
                value={novoExercicio.series}
                onChange={handleInputChange}
                className="novo-exercicio-input"
              />
              <input
                type="number"
                name="repeticoes"
                placeholder="Repetições"
                value={novoExercicio.repeticoes}
                onChange={handleInputChange}
                className="novo-exercicio-input"
              />
              <input
                type="text"
                name="intensidade"
                placeholder="Intensidade"
                value={novoExercicio.intensidade}
                onChange={handleInputChange}
                className="novo-exercicio-input"
              />
              <input
                type="text"
                name="frequencia"
                placeholder="Frequência"
                value={novoExercicio.frequencia}
                onChange={handleInputChange}
                className="novo-exercicio-input"
              />
              <button onClick={handleAdicionarExercicio} className="btn adicionar-btn">
                Adicionar Exercício
              </button>
            </div>
            <div className="editar-ficha-buttons">
              <button onClick={handleSalvar} className="btn salvar-btn">
                Salvar
              </button>
              <button onClick={handleVoltar} className="btn voltar-btn">
                Voltar
              </button>
              <button onClick={handleApagarFicha} className="btn apagar-btn">
                Apagar Ficha
              </button>
            </div>
          </div>
        ) : (
          <p>Carregando ficha...</p>
        )}
      </div>
    </div>
  );
};

export default EditarFicha;
