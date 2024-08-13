export class AIRespParser {
  static contentParser(content: string) {
    if (content && content.includes("{") && content.includes("}")) return JSON.parse(content);

    return content;
  }
}
