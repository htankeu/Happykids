import { AIRespParser } from "../helper-function/AIResponseParser.helper";
import openai from "../openAI";

export class OpenAiService {
  private openAI_Model = import.meta.env.VITE_OPENAI_MODEL || "";

  async createCompletion(
    systemPrompt: string,
    userPrompt: string,
    temperature: number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<string | null | any> {
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

    console.log("The response are done:--------------------", completion.choices[0].message.content);

    return AIRespParser.contentParser(completion.choices[0].message.content || "");
  }

  async createCompletionText(
    systemPrompt: string,
    userPrompt: string,
    temperature: number
  ): Promise<string | null | unknown> {
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
      response_format: { type: "text" },
      temperature: temperature,
    });

    console.log("The AI-response are done:--------------------", completion.choices[0].message.content);

    return AIRespParser.contentParser(completion.choices[0].message.content || "");
  }
}
