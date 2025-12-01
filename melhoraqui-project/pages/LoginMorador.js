import styles from '../styles/LoginMorador.module.css'
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter()

  return (
    <div className={styles.container}>
      <div className={styles.topBox}>
        <img src="/assets/logo.png" alt="logo" className={styles.logo} />
      </div>

      <div className={styles.formBox}>
        <h1 className={styles.title}>Login</h1>

        <div className={styles.inputGroup}>
          <input type="email" placeholder="E-mail" className={styles.input} />
        </div>

        <div className={styles.inputGroup}>
          <input type="password" placeholder="Senha" className={styles.input} />
        </div>

        <a className={styles.forgot}>Esqueceu a senha?</a>

        <button
          className={styles.loginBtn}
          onClick={() => router.push('/HomeMorador')}
        >
          Entrar
        </button>
      </div>

      <div className={styles.bottomBar}>
        <button className={styles.activeTab}>Login</button>

        <button
          className={styles.inactiveTab}
          onClick={() => router.push('/CadastroMorador')}
        >
          Cadastre-se
        </button>
      </div>
    </div>
  );
}