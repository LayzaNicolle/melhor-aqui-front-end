import styles from '../styles/CadastroMorador.module.css';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function CadastroMorador() {
  const router = useRouter();

  // Estados com persistência no localStorage
  const [formData, setFormData] = useState({
    nome: '',
    nascimento: '',
    genero: '',
    deficiencia: '',
    cep: '',
    cidade: '',
    bairro: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('cadastro_morador');
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cadastro_morador', JSON.stringify(formData));
  }, [formData]);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Cadastro</h1>
      </div>

      <div className={styles.formBox}>
        <label className={styles.label}>Nome completo</label>
        <input 
          type="text" 
          placeholder="Ex: João da Silva" 
          className={styles.input} 
          value={formData.nome}
          onChange={(e) => updateField('nome', e.target.value)}
        />

        <label className={styles.label}>Data de nascimento</label>
        <input 
          type="text" 
          placeholder="DD/MM/AAAA" 
          className={styles.input} 
          value={formData.nascimento}
          onChange={(e) => updateField('nascimento', e.target.value)}
        />

        <label className={styles.label}>Gênero</label>
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

        <label className={styles.label}>Tipo de deficiência</label>
        <input 
          type="text" 
          placeholder="Ex: Deficiência auditiva" 
          className={styles.input} 
          value={formData.deficiencia}
          onChange={(e) => updateField('deficiencia', e.target.value)}
        />

        <div className={styles.row}>
          <div className={styles.col}>
            <label className={styles.label}>CEP</label>
            <input 
              type="text" 
              placeholder="00000-000" 
              className={styles.input} 
              value={formData.cep}
              onChange={(e) => updateField('cep', e.target.value)}
            />
          </div>

          <div className={styles.col}>
            <label className={styles.label}>Cidade/UF</label>
            <input 
              type="text" 
              placeholder="Ex: Recife/PE" 
              className={styles.input} 
              value={formData.cidade}
              onChange={(e) => updateField('cidade', e.target.value)}
            />
          </div>
        </div>

        <label className={styles.label}>Bairro</label>
        <input 
          type="text" 
          placeholder="Ex: Boa Viagem" 
          className={styles.input} 
          value={formData.bairro}
          onChange={(e) => updateField('bairro', e.target.value)}
        />

        <button className={styles.submitBtn}>Cadastrar</button>
      </div>

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