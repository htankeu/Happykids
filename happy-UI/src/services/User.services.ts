import axios from "axios";
import SERVER_ENDPOINT from "../server_api";
import { IUser } from "../interfaces/User.interface";
import { ILevel } from "../interfaces/Level.interface";

class UserService {
  private BACKENDHOST: string;

  constructor() {
    this.BACKENDHOST = SERVER_ENDPOINT;
  }

  async getUserInfo() {
    const userId = localStorage.getItem("HappyuserId");
    const response = await axios.get(`${this.BACKENDHOST}/user/${userId}`);

    return response.data;
  }

  async getUserLevel(): Promise<string> {
    const userId = localStorage.getItem("HappyuserId");
    const response = await axios.get(`${this.BACKENDHOST}/user/${userId}`);
    const finalResponse = response.data as IUser;
    const level: ILevel = finalResponse.Level!;
    const levelName: string = level.Level;

    return levelName;
  }

  async setUserNextLevel() {
    const userId = localStorage.getItem("HappyuserId");
    await axios.post(`${this.BACKENDHOST}/user/${userId}/nextLevel`, {
      headers: { "Content-Type": "application/json" },
    });
  }

  async addUserPoints(points: number) {
    const userId = localStorage.getItem("HappyuserId");
    await axios.post(
      `${this.BACKENDHOST}/user/${userId}/addPoints`,
      { Points: points },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export default new UserService();
