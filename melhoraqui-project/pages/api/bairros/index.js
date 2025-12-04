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

  if (req.method === 'GET') {
    try {
      const bairros = await prisma.bairro.findMany();
      return res.status(200).json(bairros);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar bairros' });
    }
  }

  if (req.method === 'POST') {
    try {
      const dados = req.body;
      const novoBairro = await prisma.bairro.create({
        data: dados
      });
      return res.status(201).json(novoBairro);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar bairro' });
    }
  }
}