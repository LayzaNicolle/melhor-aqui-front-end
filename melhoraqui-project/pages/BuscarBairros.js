import Link from 'next/link';
import styles from '../styles/BuscarBairros.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

const fetchBairros = async () => {
  const res = await fetch('/api/bairros');
  if (!res.ok) throw new Error('Erro ao carregar bairros');
  return res.json();
};

const fetchIdeias = async () => {
  const res = await fetch('/api/ideias');
  if (!res.ok) throw new Error('Erro ao carregar ideias');
  return res.json();
};

export default function BuscarBairros() {
  const router = useRouter(); 
  const [busca, setBusca] = useState('');

  const { data: bairros = [] } = useQuery({
    queryKey: ['bairros'],
    queryFn: fetchBairros,
    staleTime: 1000 * 60 * 5, 
  });

  const { data: ideias = [], isLoading, isError } = useQuery({
    queryKey: ['ideias'],
    queryFn: fetchIdeias,
  });

  const ideiasFiltradas = ideias.filter(ideia => 
    ideia.titulo.toLowerCase().includes(busca.toLowerCase()) ||
    ideia.localizacao.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className={styles.container}>

      <header className={styles.header}>
        <button className={styles.backButton} onClick={() => router.push("/HomeMorador")}>
            <img src="/assets/back-icon-white.svg" alt="Voltar" />
        </button>
        <h1 className={styles.title}>MelhorAqui</h1>
        <div className={styles.headerSpacer}></div>
      </header>

      <nav className={styles.navbar}>
        <button className={styles.navItem}>Propostas</button>
        <button className={styles.navItem} onClick={() => router.push("/Solicitacoes")}>
          Solicitações
        </button>
        <button className={styles.navItem}>Notificações</button>
      </nav>

      {/* ÁREA QUE AGORA TEM SCROLL */}
      <div className={styles.contentScroll}>

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
          {isLoading && (
            <p style={{textAlign: 'center'}}>Carregando propostas...</p>
          )}

          {isError && (
            <p style={{textAlign: 'center', color: 'red'}}>
              Erro ao carregar dados.
            </p>
          )}
          
          {!isLoading && !isError && (
            ideiasFiltradas.length > 0 ? (
              ideiasFiltradas.map((ideia) => (
                <div key={ideia.id} className={styles.proposalCard}>
                  <h2>{ideia.titulo}</h2>
                  <p>{ideia.localizacao}</p>
                  <span
                    className={styles.status}
                    style={{
                      color: ideia.status === 'Aprovado' || ideia.status === 'Concluído'
                        ? 'green'
                        : ideia.status === 'Rejeitado'
                        ? 'red'
                        : 'orange'
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
            )
          )}
        </section>

      </div>

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
