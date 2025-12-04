const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Começando a popular o banco de dados...')

  // --- 1. CRIAR BAIRROS ---
  console.log('📍 Criando Bairros...')
  const bairros = [
    { nome: 'Boa Vista', cidade: 'Recife', regiao: 'Centro' },
    { nome: 'Cordeiro', cidade: 'Recife', regiao: 'Oeste' },
    { nome: 'Ibura', cidade: 'Recife', regiao: 'Sul' },
    { nome: 'Afogados', cidade: 'Recife', regiao: 'Oeste' },
    { nome: 'Boa Viagem', cidade: 'Recife', regiao: 'Sul' },
    { nome: 'Casa Amarela', cidade: 'Recife', regiao: 'Norte' },
    { nome: 'Várzea', cidade: 'Recife', regiao: 'Oeste' },
    { nome: 'Derby', cidade: 'Recife', regiao: 'Centro' }
  ]

  for (const bairro of bairros) {
    await prisma.bairro.create({ data: bairro })
  }

  // --- 2. CRIAR USUÁRIOS ---
  console.log('bust Criando Usuários...')
  
  // Usuário 1: Maria (Para testar Login)
  const maria = await prisma.usuario.create({
    data: {
      nome: 'Maria da Silva',
      email: 'maria@teste.com',
      senha: '123', // Senha simples para teste
      tipo: 'MORADOR',
      telefone: '81999998888',
      nascimento: '15/05/1990',
      genero: 'Feminino',
      cidade: 'Recife',
      bairro: 'Boa Viagem',
      cep: '51000-000'
    }
  })

  // Usuário 2: João (Outro morador)
  const joao = await prisma.usuario.create({
    data: {
      nome: 'João Pedro',
      email: 'joao@teste.com',
      senha: '123',
      tipo: 'MORADOR',
      telefone: '81988887777',
      nascimento: '20/10/1985',
      genero: 'Masculino',
      cidade: 'Recife',
      bairro: 'Cordeiro',
      cep: '50000-000'
    }
  })

  // --- 3. CRIAR IDEIAS (Vinculadas aos usuários acima) ---
  console.log('💡 Criando Ideias e Solicitações...')

  await prisma.ideia.create({
    data: {
      titulo: 'Reforma da parada de ônibus',
      descricao: 'O teto da parada está caindo e molha tudo quando chove.',
      categoria: 'Infraestrutura',
      status: 'Em Análise',
      localizacao: 'Boa Viagem - Recife',
      prioridade: 2,
      usuarioId: maria.id // Vincula à Maria
    }
  })

  await prisma.ideia.create({
    data: {
      titulo: 'Iluminação na Praça do Cordeiro',
      descricao: 'Muitos postes queimados, gerando insegurança.',
      categoria: 'Segurança',
      status: 'Recebida',
      localizacao: 'Cordeiro - Recife',
      prioridade: 1,
      usuarioId: joao.id // Vincula ao João
    }
  })

  await prisma.ideia.create({
    data: {
      titulo: 'Buraco na Av. Caxangá',
      descricao: 'Buraco atrapalhando o trânsito perto do sinal.',
      categoria: 'Pavimentação',
      status: 'Concluído', // Para testar status verde
      localizacao: 'Várzea - Recife',
      prioridade: 0,
      usuarioId: joao.id
    }
  })

  await prisma.ideia.create({
    data: {
      titulo: 'Coleta de lixo irregular',
      descricao: 'O caminhão não passa há 3 dias.',
      categoria: 'Saneamento',
      status: 'Rejeitado', // Para testar status vermelho
      localizacao: 'Afogados - Recife',
      prioridade: 3,
      usuarioId: maria.id
    }
  })

  console.log('✅ Banco de dados populado com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })