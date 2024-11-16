import React from 'react';
import Header from '../components/Header'; // Importa o Header

const Dashboard = () => {
  return (
    <div>
      <Header />
      <main className="dashboard-main">
        <h1>Bem-vindo ao Physicare  </h1>
        <p>Escolha uma das opções no menu para começar.</p>
      </main>
    </div>
  );
};

export default Dashboard;
