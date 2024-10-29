import express, {Application, Request, Response} from "express";
import cors from "cors";
import OpenAI from "openai";  
// import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8000;
const API_KEY = process.env.OPENAI_API_KEY;

const app: Application = express();
app.use(cors());
app.use(express.json());


// const configuration = new Configuration({
//   apiKey: API_KEY,
// })

// Initialize OpenAI client
// const openai = new OpenAIApi(configuration);
const openai = new OpenAI({
  apiKey: API_KEY,
});


app.post("/completions", async (req: Request, res: Response) => {
  console.log("Received request body:", req.body);
  
  if (!req.body.message) {
    return res.status(400).json({ error: "No message provided in the request body" });
  }
  console.log("Received message:", req.body);
  try {
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
    const responseContent = completion.choices[0].message.content;
    console.log("OpenAI API response:", responseContent);

    // Send JSON response
    res.json({ result: responseContent });
    // res.json({ result: completion.choices[0].message.content });
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
