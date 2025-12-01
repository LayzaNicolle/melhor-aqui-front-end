import styles from '../styles/Choice.module.css'
import { useRouter } from 'next/router'

export default function Choice() {
  const router = useRouter()

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Eu sou...</h2>

        <button 
          className={styles.card}
          onClick={() => router.push('/LoginMorador')}
        >
          <img 
            src="/assets/icon-morador.png" 
            alt="morador" 
            className={styles.icon}
          />
        </button>

        <button 
          className={styles.card}
          onClick={() => router.push('/admin')}
        >
          <img 
            src="/assets/icon-admin.png" 
            alt="admin" 
            className={styles.icon1}
          />
        </button>
      </div>
    </div>
  )
}

