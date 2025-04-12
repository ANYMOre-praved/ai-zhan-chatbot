const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const PORT = 3000;

// ✅ ВСТАВЬ СВОЙ КЛЮЧ СЮДА
const configuration = new Configuration({
  apiKey: "sk-ВАШ_КЛЮЧ_ЗДЕСЬ"
});
const openai = new OpenAIApi(configuration);

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.7,
    });

    res.json({ reply: completion.data.choices[0].message.content });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Ошибка запроса к OpenAI" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Сервер запущен: http://localhost:${PORT}`);
});
