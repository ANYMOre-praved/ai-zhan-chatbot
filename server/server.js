import express from "express";
import cors from "cors";
import { OpenAI } from "openai";
import dotenv from "dotenv";

// Загрузим переменные окружения из .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { messages } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0.7,
    });
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error from OpenAI API" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
