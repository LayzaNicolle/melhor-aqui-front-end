import Link from 'next/link';
import styles from '../styles/HomeMorador.module.css';
import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore'; 

export default function Morador() {
  const { usuario } = useAuthStore();
  
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const primeiroNome = usuario?.nome ? usuario.nome.split(' ')[0] : 'Morador';

  if (!isClient) return null; 

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>MelhorAqui</h1>
      </header>
      <h1 className={styles.greeting}>Olá, {primeiroNome}</h1>

      <h2 className={styles.servicesTitle}>Nossos serviços</h2>
      <div className={styles.servicesGrid}>
        <Link href="/BuscarBairros">
          <div className={styles.serviceCard}>
            <img src="/assets/search-icon.svg" alt="Buscar bairros" className={styles.icon} />
            <p>Buscar bairros</p>
          </div>
        </Link>
        <Link href="/Solicitacoes">
  <div className={styles.serviceCard}>
    <img src="/assets/progress-icon.svg" alt="Solicitações" className={styles.icon} />
    <p>Andamento</p>
  </div>
</Link>

        <Link href="/PerfilMorador">
          <div className={styles.serviceCard}>
            <img src="/assets/profile-icon.svg" alt="Perfil" className={styles.icon} />
            <p>Perfil</p>
          </div>
        </Link>
        <Link href="/Notificacoes">
          <div className={styles.serviceCard}>
            <img src="/assets/notification-icon.svg" alt="Notificações" className={styles.icon} />
            <p>Notificações</p>
          </div>
        </Link>
      </div>

      <footer className={styles.footer}>
        <Link href="/BuscarBairros">
          <button className={styles.footerButton}>
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