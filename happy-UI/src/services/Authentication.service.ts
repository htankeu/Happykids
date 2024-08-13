import axios from "axios";
// import SERVER_ENDPOINT from "../server_api"
import { UserLogin } from "../interfaces/userLgin.interface";
import { UserRegister } from "../interfaces/userRegister.interface";
import { message } from "antd";
import SERVER_ENDPOINT from "../server_api";
import { ErrorParser } from "../Error-parser/error.parser";

class AuthService {
  private BACKENDHOST: string;

  constructor() {
    this.BACKENDHOST = SERVER_ENDPOINT;
  }

  async login(user: UserLogin) {
    try {
      const response = await axios.post(`${this.BACKENDHOST}/auth/login`, user, {
        headers: { "Content-Type": "application/json" },
      });
      if (response) {
        message.success("Anmeldung erfolreich");
        localStorage.setItem("Happytoken", response.data.tokenId);
        localStorage.setItem("HappyuserId", response.data.userId);
        localStorage.setItem("HappyNotifs", response.data.userId);
        localStorage.setItem("havevolume", "0.3");
        localStorage.setItem("soundEffekt", "0.2");
      }
      return response.data;
    } catch (error) {
      message.error(`Anmeldung fehlgeschlagen, ${ErrorParser.parseError(error)}`);
      console.error("Anmeldung fehlgeschlagen", error);
    }
  }

  async register(user: UserRegister) {
    try {
      await axios.post(`${this.BACKENDHOST}/auth/register`, user, {
        headers: { "Content-Type": "application/json" },
      });
      message.success("Registrierung erfolgreich");
    } catch (error) {
      message.error(`Registrierung fehlgeschlagen, ${ErrorParser.parseError(error)}`);
      console.error("Registrierung fehlgeschlagen", error);
    }
  }
}

export default new AuthService();
