import openai from "../../openAI";
import { AIRespParser } from "../helper/AIResponseParser.helper";

export class OpenAiService {
  private openAI_Model = process.env.OPENAI_MODEL || "";

  async createCompletion(systemPrompt: string, userPrompt: string, temperature: number): Promise<string | null | any> {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      model: this.openAI_Model,
      response_format: { type: "json_object" },
      temperature: temperature,
    });

    return AIRespParser.contentParser(completion.choices[0].message.content || "");
  }
}
