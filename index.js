import express from "express";
import cors from "cors";
import OpenAI from 'openai';
import dotenv from 'dotenv';

const PORT = 8000;
const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();
const API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: API_KEY,
});

app.post("/completions", async (req, res) => {
  try {
    const completion = await openai.chat.completions.create(
      {
        model: "gpt-4",
        messages: [
          {
            role: "user",
            content: "Create a SQL request to " + req.body.message
          },
        ], 
      }
    )
    res.send(completion.choices[0].message);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});