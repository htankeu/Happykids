import axios from "axios";
import SERVER_ENDPOINT from "../server_api";

class QuestionsService {
  private BACKENDHOST: string;

  constructor() {
    this.BACKENDHOST = SERVER_ENDPOINT;
  }

  async generateQuestions(theme: string, level: string, numberofQuestion?: number) {
    await axios.get(
      `${this.BACKENDHOST}/question/generate?questionsTheme=${theme}&numberQuestion=${numberofQuestion}&userLevel=${level}`
    );
  }

  async getAllQuestions(level: string = "", theme: string = "") {
    const response = await axios.get(`${this.BACKENDHOST}/question?level=${level}&theme=${theme}`);

    return response.data;
  }
}

export default new QuestionsService();
