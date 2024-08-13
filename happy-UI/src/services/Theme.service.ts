import axios from "axios";
import SERVER_ENDPOINT from "../server_api";

class ThemeService {
  private BACKENDHOST: string;

  constructor() {
    this.BACKENDHOST = SERVER_ENDPOINT;
  }

  async getAllTheme() {
    const response = await axios.get(`${this.BACKENDHOST}/theme`);

    return response.data;
  }
}

export default new ThemeService();
