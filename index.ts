import express from "express";
import cors from "cors";
import OpenAI from "openai";  // Correct way to import in the latest versions
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8000;
const API_KEY = process.env.OPENAI_API_KEY;

const app = express();
app.use(cors());
app.use(express.json());

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: API_KEY,
});

app.post("/completions", async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5",
      messages: [
        {
          role: "user",
          content: "Create a SQL request to " + req.body.message,
        },
      ],
    });

    res.send(completion.choices[0].message.content);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
