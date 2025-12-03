import Link from 'next/link';
import styles from '../styles/BuscarBairros.module.css';
import { useState, useEffect } from 'react';

export default function BuscarBairros() {
  const [bairros, setBairros] = useState([]); 
  const [ideias, setIdeias] = useState([]);   
  const [busca, setBusca] = useState('');

  useEffect(() => {
    async function carregarDados() {
      try {
        const resBairros = await fetch('http://localhost:8080/bairros');
        if (resBairros.ok) setBairros(await resBairros.json());

        const resIdeias = await fetch('http://localhost:8080/ideias');
        if (resIdeias.ok) setIdeias(await resIdeias.json());

      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }
    carregarDados();
  }, []);

  const ideiasFiltradas = ideias.filter(ideia => 
    ideia.titulo.toLowerCase().includes(busca.toLowerCase()) ||
    ideia.localizacao.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.backButton}>
          <img src="/assets/back-icon-white.svg" alt="Voltar" />
        </button>
        <h1 className={styles.title}>MelhorAqui</h1>
        <div className={styles.headerSpacer}></div>
      </header>

      <nav className={styles.navbar}>
        <button className={styles.navItem}>Propostas</button>
        <button className={styles.navItem}>Solicitações</button>
        <button className={styles.navItem}>Notificações</button>
      </nav>

      <section className={styles.filterSection}>
        <input 
          type="text" 
          placeholder="Filtrar por bairro ou título" 
          className={styles.filterInput}
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        <div className={styles.filterTags}>
          <button 
            className={styles.tag} 
            onClick={() => setBusca('')}
            style={{backgroundColor: '#ccc', color: '#000'}}
          >
            Todos
          </button>
          {bairros.map((bairro) => (
            <button 
              key={bairro.id} 
              className={styles.tag}
              onClick={() => setBusca(bairro.nome)}
            >
              {bairro.nome}
            </button>
          ))}
        </div>
      </section>

      <section className={styles.proposalsSection}>
        {ideiasFiltradas.length > 0 ? (
          ideiasFiltradas.map((ideia) => (
            <div key={ideia.id} className={styles.proposalCard}>
              <h2>{ideia.titulo}</h2>
              <p>{ideia.localizacao}</p>
              <span
                className={styles.status}
                style={{
                  color: ideia.status === 'Aprovado' ? 'green' : 
                        ideia.status === 'Rejeitado' ? 'red' : 'orange'
                }}
              >
                {ideia.status}
              </span>
            </div>
          ))
        ) : (
          <p style={{textAlign: 'center', marginTop: 20, color: '#666'}}>
            Nenhuma proposta encontrada.
          </p>
        )}
      </section>

      <footer className={styles.footer}>
        <Link href="/BuscarBairros">
          <button className={`${styles.footerButton} ${styles.active}`}>
            <img src="/assets/search-icon.svg" alt="Buscar" />
          </button>
        </Link>
        <Link href="/PerfilMorador">
          <button className={styles.footerButton}>
            <img src="/assets/profile-icon.svg" alt="Perfil" />
          </button>
        </Link>
        <Link href="/Notificacoes">
          <button className={styles.footerButton}>
            <img src="/assets/notification-icon.svg" alt="Notificações" />
          </button>
        </Link>
      </footer>
    </div>
  );
}
