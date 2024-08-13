import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openAI_Key = process.env.OPENAI_KEY || "";

const openai = new OpenAI({
  apiKey: openAI_Key,
});

export default openai;
