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
  console.log("Received request body:", req.body);
  
  if (!req.body.message) {
    return res.status(400).json({ error: "No message provided in the request body" });
  }

  try {
    console.log("Sending request to OpenAI API...");
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "Create a SQL request to " + req.body.message,
        },
      ],
    });
    console.log("OpenAI API response:", completion.choices[0].message);
    res.json({ result: completion.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    if (error instanceof Error) {
      console.error('Error stack:', error.stack);
      res.status(500).json({ error: error.message, stack: error.stack });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
