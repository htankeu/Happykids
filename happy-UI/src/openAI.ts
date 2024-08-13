import OpenAI from "openai";

const openAI_Key = import.meta.env.VITE_OPENAI_KEY || "";

const openai = new OpenAI({
  apiKey: openAI_Key,
  dangerouslyAllowBrowser: true,
});

export default openai;
