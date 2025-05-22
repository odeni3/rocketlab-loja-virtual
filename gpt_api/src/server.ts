import 'dotenv/config';
import express, { Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages } = req.body;
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao conectar com a OpenAI.' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});