import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // GET: Listar todas as ideias
  if (req.method === 'GET') {
    try {
      const ideias = await prisma.ideia.findMany({
        orderBy: { id: 'desc' } // Mostra as mais novas primeiro
      });
      return res.status(200).json(ideias);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar ideias' });
    }
  }

  // POST: Criar nova solicitação
  if (req.method === 'POST') {
    try {
      const { titulo, descricao, localizacao, categoria, status, usuarioId } = req.body;

      const novaIdeia = await prisma.ideia.create({
        data: {
          titulo,
          descricao,
          localizacao,
          categoria,
          status: status || 'Recebida',
          // Conecta com o usuário SE o ID for enviado
          usuario: usuarioId ? { connect: { id: usuarioId } } : undefined
        }
      });

      return res.status(201).json(novaIdeia);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar solicitação' });
    }
  }
}