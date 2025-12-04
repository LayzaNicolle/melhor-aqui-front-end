import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const { 
        nome, email, senha, telefone, nascimento, 
        genero, deficiencia, cep, cidade, bairro, tipo 
      } = req.body;

      // Verifica se o email já existe
      const usuarioExistente = await prisma.usuario.findUnique({
        where: { email: email }
      });

      if (usuarioExistente) {
        return res.status(400).send("Este e-mail já está cadastrado.");
      }

      const novoUsuario = await prisma.usuario.create({
        data: {
          nome,
          email,
          senha,
          telefone,
          nascimento,
          genero,
          deficiencia,
          cep,
          cidade,
          bairro,
          tipo
        }
      });

      return res.status(201).json(novoUsuario);

    } catch (error) {
      console.error("Erro no cadastro:", error);
      return res.status(500).json({ error: "Erro ao criar usuário." });
    }
  }

  if (req.method === 'GET') {
    try {
      const usuarios = await prisma.usuario.findMany();
      return res.status(200).json(usuarios);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar usuários' });
    }
  }

  res.status(405).end();
}