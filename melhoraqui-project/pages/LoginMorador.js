import { useState } from 'react'
import styles from '../styles/LoginMorador.module.css'
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setError('') 
    setLoading(true)

    try {
      const response = await fetch('http://localhost:8080/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })

      if (response.ok) {
        const dadosUsuario = await response.json()
      
        localStorage.setItem('usuarioLogado', JSON.stringify(dadosUsuario))
        router.push('/HomeMorador')
        
      } else {
        const msgErro = await response.text();
        setError(msgErro || 'E-mail ou senha incorretos')
        setLoading(false)
      }
    } catch (err) {
      console.error(err)
      setError('Erro de conexão com o servidor.')
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.topBox}>
        <img src="/assets/logo.png" alt="logo" className={styles.logo} />
      </div>

      <div className={styles.formBox}>
        <h1 className={styles.title}>Login</h1>

        <div className={styles.inputGroup}>
          <input type="email" placeholder="E-mail" className={styles.input} value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className={styles.inputGroup}>
          <input type="password" placeholder="Senha" className={styles.input} value={password}
            onChange={(e) => setPassword(e.target.value)}/>
        </div>

        <a className={styles.forgot}>Esqueceu a senha?</a>

        <button
          className={styles.loginBtn}
          onClick={handleLogin}
          disabled={loading}
          //onClick={() => router.push('/HomeMorador')}
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