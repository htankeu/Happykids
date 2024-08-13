import compareHelper from "../helper-function/compare.helper";
import { IProposition } from "../interfaces/Proposition.interface";
import { OpenAiService } from "./OpenAI.service";

class SpielenService {
  private openaiService: OpenAiService;

  constructor() {
    this.openaiService = new OpenAiService();
  }
  async generateEncouragement(siege: number) {
    const systemPrompt: string = `
    Sie sind ein hilfreicher Assistent, der JSON ausgeben kann.
    `;
    const userPrompt: string = `
    Schreib mir bitte einen ermutigenden Text für ${siege} aufeinanderfolgende Siege
    Geben sie mir die Ausgabe im Format {text:..}
    `;

    const aiResult = await this.openaiService.createCompletion(systemPrompt, userPrompt, 1);
    const notifs = localStorage.getItem("notificatons");
    let newNotif = aiResult as string;
    if (notifs) {
      localStorage.removeItem("notifications");
      newNotif = notifs + "_" + (aiResult as string);
    }
    localStorage.setItem("notifications", newNotif);

    return aiResult["text"] as string;
  }

  async generateWinMessage(winner: string) {
    const systemPrompt: string = `
    Sie sind ein hilfreicher Assistent, der JSON ausgeben kann.
    `;
    const userPrompt: string = `
    Schreib mir bitte einen Text, um zu sagen, dass ich gegen AI ${winner} habe.
    Gib mir bitte die Antwort im Format {message:...}
    `;

    const aiResult = await this.openaiService.createCompletion(systemPrompt, userPrompt, 1);

    return aiResult["message"] as string;
  }

  async AISpiel(question: string, propositions: IProposition[], response: string, level: string): Promise<boolean> {
    const allPropositions: string[] = propositions.map((props: IProposition) => {
      return props.Proposition;
    });
    const systemPrompt: string = `
    Sie sind ein hilfreicher Assistent, der JSON ausgeben kann. Sie können manchmal falsche Antworten erzeugen
    `;
    const userPrompt: string = `
    Du hast das Niveau ${level}
    Wähl die richtige Antwort von der Frage: ${question} zwischen den verschiedenen flogenden Möglichkeiten ${allPropositions}.
    Gib mir die Antwort im Format {Antwort:..}
    `;

    const aiResult = await this.openaiService.createCompletion(systemPrompt, userPrompt, 1);

    const result = aiResult["Antwort"] as string;
    return compareHelper.compareString(result, response);
  }
}

export default new SpielenService();
