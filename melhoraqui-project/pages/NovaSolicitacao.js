import Link from 'next/link';
import styles from '../styles/NovaSolicitacao.module.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function NovaSolicitacao() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [usuarioId, setUsuarioId] = useState(null);

  const [form, setForm] = useState({
    titulo: '',
    rua: '',
    bairro: '',
    cidade: '',
    descricao: ''
  });

  useEffect(() => {
    const dadosSalvos = localStorage.getItem('usuarioLogado');
    if (dadosSalvos) {
      const usuario = JSON.parse(dadosSalvos);
      setUsuarioId(usuario.id);
    } else {
      router.push('/LoginMorador');
    }
  }, []);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  async function handleSubmit() {
    if (!form.titulo || !form.descricao || !form.bairro) {
      alert("Por favor, preencha pelo menos o Problema, Bairro e Descrição.");
      return;
    }

    setLoading(true);

    try {
      const localizacaoCompleta = `${form.rua ? form.rua + ', ' : ''}${form.bairro} - ${form.cidade}`;
      const payload = {
        titulo: form.titulo,
        descricao: form.descricao,
        localizacao: localizacaoCompleta,
        categoria: 'Solicitação', 
        status: 'Recebida',
        usuario: usuarioId ? { id: usuarioId } : null 
      };

      const response = await fetch('api/ideias', {
      // const response = await fetch('http://localhost:9234/ideias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert("Solicitação enviada com sucesso!");
        router.push('/BuscarBairros'); 
      } else {
        alert("Erro ao enviar solicitação.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/Notificacoes">
          <button className={styles.backButton}>
            <img src="/assets/back-icon-white.svg" alt="Voltar" />
          </button>
        </Link>
        <h1 className={styles.title}>MelhorAqui</h1>
        <div className={styles.headerSpacer}></div>
      </header>

      <main className={styles.main}>
        <h2 className={styles.pageTitle}>Confirmação de envio</h2>

        <div className={styles.formSection}>
          <label className={styles.label}>Problema</label>
          <input 
            type="text" 
            className={styles.input} 
            placeholder="Ex: Buraco na via"
            value={form.titulo}
            onChange={(e) => handleChange('titulo', e.target.value)}
          />

          <label className={styles.label}>Rua</label>
          <input 
            type="text" 
            className={styles.input} 
            value={form.rua}
            onChange={(e) => handleChange('rua', e.target.value)}
          />

          <div className={styles.row}>
            <div className={styles.col}>
              <label className={styles.label}>Bairro</label>
              <input 
                type="text" 
                className={styles.input} 
                value={form.bairro}
                onChange={(e) => handleChange('bairro', e.target.value)}
              />
            </div>
            <div className={styles.col}>
              <label className={styles.label}>Cidade/UF</label>
              <input 
                type="text" 
                className={styles.input} 
                value={form.cidade}
                onChange={(e) => handleChange('cidade', e.target.value)}
              />
            </div>
          </div>

          <label className={styles.label}>Descrição</label>
          <textarea 
            className={styles.textarea} 
            rows="4" 
            placeholder="Descreva detalhadamente o problema..."
            value={form.descricao}
            onChange={(e) => handleChange('descricao', e.target.value)}
          ></textarea>
          <button 
            className={styles.submitButton}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar Solicitação'}
          </button>
        </div>
      </main>

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