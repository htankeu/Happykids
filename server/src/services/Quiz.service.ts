import { Repository } from "typeorm";
import { Quiz } from "../entity/Quiz.entity";
import { IQuiz } from "../interfaces/Quiz.interface";
import { CRUD } from "../models/CRUD.model";
import { listResult } from "../models/resultList.model";
import { AppDataSource } from "../../data-source";
import { Question } from "../entity/Question.entity";
import { Stack } from "../helper/Stack.helper";
import GenerateRandom from "../helper/generate-random.helper";

export class QuizService implements CRUD<Quiz, IQuiz, listResult<Quiz>> {
  private quizRepository: Repository<Quiz>;
  private questionRepository: Repository<Question>;
  private generateRandomHelper = new GenerateRandom<Question>();

  constructor() {
    this.quizRepository = AppDataSource.getRepository(Quiz);
    this.questionRepository = AppDataSource.getRepository(Question);
  }

  list(take: number, page: number, filterOption?: any): Promise<listResult<Quiz>> {
    throw new Error("Method not implemented.");
  }
  async create(resource: any): Promise<Quiz> {
    const allQuestions: Question[] = await this.questionRepository.find({
      relations: {
        Propositions: true,
      },
    });

    const choosenQuestions: Question[] = this.generateRandomHelper.generateRandomElemList(allQuestions);

    const quiz: IQuiz = {
      QuizName: "QUIZGO",
      Questions: choosenQuestions,
    };

    return await this.quizRepository.save(quiz);
  }
  readById(id: any): Promise<Quiz | null> | Promise<IQuiz | null> {
    throw new Error("Method not implemented.");
  }
  putById(id: any, resource: any): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: any): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
