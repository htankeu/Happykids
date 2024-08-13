import axios from "axios";
import SERVER_ENDPOINT from "../server_api";
import { ILevel } from "../interfaces/Level.interface";

class LevelService {
  private BACKENDHOST: string;

  constructor() {
    this.BACKENDHOST = SERVER_ENDPOINT;
  }

  async getNextLevel() {
    const userId = localStorage.getItem("userId");
    const response = await axios.get(`${this.BACKENDHOST}/level/nextlevel?UserId=${userId}`);

    return response.data.NextLevel;
  }

  async getLevel(levelId: string) {
    const response = await axios.get(`${this.BACKENDHOST}/level/${levelId}`);
    const Level: ILevel = response.data as ILevel;

    return Level.Level;
  }
}

export default new LevelService();
