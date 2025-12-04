import styles from '../styles/CadastroMorador.module.css';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function CadastroMorador() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nome: '',
    nascimento: '',
    genero: '',
    deficiencia: '',
    cep: '',
    cidade: '',
    bairro: '',
    email: '',
    senha: '',
    telefone: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('cadastro_morador');
    if (saved) setFormData(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('cadastro_morador', JSON.stringify(formData));
  }, [formData]);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const camposObrigatorios = [
      'nome',
      'email',
      'senha',
      'nascimento',
      'genero',
      'cep',
      'cidade',
      'bairro',
      'telefone'
    ];

    const faltando = camposObrigatorios.filter(
      campo => !formData[campo] || formData[campo].trim() === ''
    );

    if (faltando.length > 0) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const response = await fetch('/api/usuarios', {
      //const response = await fetch('http://localhost:9234/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          senha: formData.senha,
          nascimento: formData.nascimento,
          genero: formData.genero,
          deficiencia: formData.deficiencia || null,
          cep: formData.cep,
          cidade: formData.cidade,
          bairro: formData.bairro,
          telefone: formData.telefone,
          tipo: 'MORADOR'
        })
      });

      if (!response.ok) {
        alert('Erro ao cadastrar. Tente novamente.');
        return;
      }

      localStorage.removeItem('cadastro_morador');
      alert('Cadastro realizado com sucesso!');
      router.push('/LoginMorador');

    } catch {
      alert('Não foi possível concluir o cadastro.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Cadastro</h1>
      </div>

      <form className={styles.formBox} onSubmit={handleSubmit}>

        <label className={styles.label}>Nome completo *</label>
        <input
          type="text"
          className={styles.input}
          value={formData.nome}
          onChange={(e) => updateField('nome', e.target.value)}
        />

        <label className={styles.label}>Email *</label>
        <input
          type="email"
          className={styles.input}
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
        />

        <label className={styles.label}>Senha *</label>
        <input
          type="password"
          className={styles.input}
          value={formData.senha}
          onChange={(e) => updateField('senha', e.target.value)}
        />

        <label className={styles.label}>Telefone *</label>
        <input
          type="text"
          placeholder="(00) 00000-0000"
          className={styles.input}
          value={formData.telefone}
          onChange={(e) => updateField('telefone', e.target.value)}
        />

        <label className={styles.label}>Data de nascimento *</label>
        <input
          type="text"
          placeholder="DD/MM/AAAA"
          className={styles.input}
          value={formData.nascimento}
          onChange={(e) => updateField('nascimento', e.target.value)}
        />

        <label className={styles.label}>Gênero *</label>
        <div className={styles.radioGroup}>
          <label>
            <input
              type="radio"
              name="gen"
              checked={formData.genero === 'Masculino'}
              onChange={() => updateField('genero', 'Masculino')}
            /> Masculino
          </label>

          <label>
            <input
              type="radio"
              name="gen"
              checked={formData.genero === 'Feminino'}
              onChange={() => updateField('genero', 'Feminino')}
            /> Feminino
          </label>

          <label>
            <input
              type="radio"
              name="gen"
              checked={formData.genero === 'Outro'}
              onChange={() => updateField('genero', 'Outro')}
            /> Outro
          </label>
        </div>

        <label className={styles.label}>Tipo de deficiência (opcional)</label>
        <input
          type="text"
          className={styles.input}
          value={formData.deficiencia}
          onChange={(e) => updateField('deficiencia', e.target.value)}
        />

        <div className={styles.row}>
          <div className={styles.col}>
            <label className={styles.label}>CEP *</label>
            <input
              type="text"
              className={styles.input}
              value={formData.cep}
              onChange={(e) => updateField('cep', e.target.value)}
            />
          </div>

          <div className={styles.col}>
            <label className={styles.label}>Cidade/UF *</label>
            <input
              type="text"
              className={styles.input}
              value={formData.cidade}
              onChange={(e) => updateField('cidade', e.target.value)}
            />
          </div>
        </div>

        <label className={styles.label}>Bairro *</label>
        <input
          type="text"
          className={styles.input}
          value={formData.bairro}
          onChange={(e) => updateField('bairro', e.target.value)}
        />

        <button type="submit" className={styles.submitBtn}>Cadastrar</button>
      </form>

      <div className={styles.bottomBar}>
        <button
          className={styles.inactiveTab}
          onClick={() => router.push('/LoginMorador')}
        >
          Login
        </button>

        <button className={styles.activeTab}>
          Cadastre-se
        </button>
      </div>
    </div>
  );
}
