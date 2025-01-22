import express, { Application, Request, Response } from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";
import rateLimit from 'express-rate-limit'; 


dotenv.config();

const PORT = process.env.PORT || 8000;
const API_KEY = process.env.OPENAI_API_KEY;

if (!API_KEY) {
  console.error("Error: OPENAI_API_KEY is not set in environment variables.");
  process.exit(1);
}

const app: Application = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: API_KEY });

// Rate limiter middleware
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests per windowMs
});

// In-memory storage for query history
const queryHistory: { message: string; result: string }[] = [];

app.post("/completions", async (req: Request, res: Response) => {
  try {
    console.log("Received request body:", req.body);

    if (!req.body.message || typeof req.body.message !== "string") {
      return res.status(400).json({ error: "Invalid request: 'message' is required and should be a string." });
    }

    console.log("Sending request to OpenAI API...");
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: "Do not return anything else except the executable DML script. Create a SQL request to " + req.body.message,
        },
      ],
    });

    const responseContent = completion.choices[0]?.message?.content;
    if (!responseContent) {
      console.error("No valid response received from OpenAI API.");
      return res.status(500).json({ error: "No response from OpenAI API." });
    }

    console.log("OpenAI API response:", responseContent);

    // Store the query and response in history
    queryHistory.push({ message: req.body.message, result: responseContent });

    res.json({ result: responseContent });

  } catch (error) {
    console.error("OpenAI API Error:", error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred." });
    }
  }
});

// Endpoint to retrieve query history
app.get("/history", (req: Request, res: Response) => {
  res.json({ history: queryHistory });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Endpoint not found." });
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
