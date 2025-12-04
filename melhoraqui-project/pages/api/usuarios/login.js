import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const { email, password } = req.body; 

    try {
      const usuario = await prisma.usuario.findFirst({
        where: {
          email: email,
        },
      });

      if (!usuario) {
        return res.status(401).send("Usuário não encontrado.");
      }

      if (usuario.senha !== password) {
        return res.status(401).send("Senha incorreta.");
      }

      return res.status(200).json(usuario);

    } catch (error) {
      console.error("Erro no login:", error);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  } else {
    res.status(405).end();
  }
}