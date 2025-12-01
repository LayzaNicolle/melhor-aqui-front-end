import { useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/Index.module.css'

export default function Loader1() {
  const router = useRouter()

  useEffect(() => {
    const t = setTimeout(() => router.push('/loader2'), 5000)
    return () => clearTimeout(t)
  }, [router])

  return (
    <div className={styles.splash1}>
      <div className={styles.card}>
        <img src="/assets/logo.png" alt="logo" className={styles.logo} />
        <h1 className={styles.brand}>Melhor Aqui</h1>
      </div>
    </div>
  )
}


