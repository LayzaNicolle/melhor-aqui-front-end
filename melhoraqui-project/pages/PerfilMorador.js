import Link from 'next/link';
import styles from '../styles/PerfilMorador.module.css';
import { useState, useEffect } from 'react';

export default function PerfilMorador() {
  const [usuario, setUsuario] = useState({
    nome: 'Carregando...',
    email: '...',
    cidade: '',
    bairro: ''
  });

  useEffect(() => {
    const dadosSalvos = localStorage.getItem('usuarioLogado');
    if (dadosSalvos) {
      try {
        const dadosParseados = JSON.parse(dadosSalvos);
        setUsuario(dadosParseados);
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.backButton}>
          <img src="/assets/back-icon-white.svg" alt="Voltar" />
        </button>
        <h1 className={styles.title}>MelhorAqui</h1>
        <div className={styles.headerSpacer}></div>
      </header>

      <main className={styles.main}>
        <div className={styles.profileSection}>
          <img src="/assets/profile-picture.svg" alt="Foto de perfil" className={styles.profilePicture} />
          <h2 className={styles.profileName}>{usuario.nome}</h2>
        </div>

        <div className={styles.contactInfo}>
          <div className={styles.contactItem}>
            <img src="/assets/email-icon.svg" alt="Email" className={styles.contactIcon} />
            <p>{usuario.email}</p>
          </div>
          <div className={styles.contactItem}>
            <img src="/assets/phone-icon.svg" alt="Telefone" className={styles.contactIcon} />
            <p>{usuario.telefone || '(Sem telefone cadastrado)'}</p>
          </div>
          <div className={styles.contactItem}>
            <img src="/assets/location-icon.svg" alt="Localização" className={styles.contactIcon} />
            <p>{usuario.cidade}</p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <Link href="/BuscarBairros">
          <button className={styles.footerButton}>
            <img src="/assets/search-icon.svg" alt="Buscar" />
          </button>
        </Link>
        <Link href="/PerfilMorador">
          <button className={`${styles.footerButton} ${styles.active}`}>
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