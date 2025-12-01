import Link from 'next/link'

export default function Admin(){
  return (
    <div style={{ padding: 20 }}>
      <h1>Administrador (demo)</h1>
      <p>Você escolheu Administrador.</p>

      <Link href="/choice">Voltar</Link>
    </div>
  )
}