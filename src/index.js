
import express, { Application, Request, Response } from "express";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

const PORT = 8000;
const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "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";

const configuration = new Configuration ({
  apiKey: API_KEY,
})

const openai = new OpenAIApi(configuration);

app.post("/completions", async (req, res) => {
  try {
    const completion = await openai.createChatCompletion(
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
    res.send(completion.data.choices[0].message);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});