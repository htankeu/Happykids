import { Repository } from "typeorm";
import { Question } from "../entity/Question.entity";
import { IQuestion } from "../interfaces/Questions.interface";
import { CRUD } from "../models/CRUD.model";
import { listResult } from "../models/resultList.model";
import { AppDataSource } from "../../data-source";
import { OTHEME } from "../enum/theme-enum";
import { OLEVEL } from "../enum/level.enum";
import { OpenAiService } from "./OpenAI.service";
import { QuestionModel } from "../models/Question.model";
import { ITheme } from "../interfaces/Theme.interface";
import { Theme } from "../entity/Theme.entity";
import { ILevel } from "../interfaces/Level.interface";
import { Level } from "../entity/Level.entity";
import { IProposition } from "../interfaces/Proposition.interface";
import { PropositionService } from "./Proposition.service";
import { FilterOption } from "../helper/filter-option.helper";
import { QuestionListFilter } from "../models/QuestionListFilter.model";

export class QuestionService implements CRUD<Question, IQuestion, listResult<Question>> {
  private questionRepository: Repository<Question>;
  private themeRepository: Repository<Theme>;
  private levelRepository: Repository<Level>;
  private propositionService: PropositionService;
  private openaiService: OpenAiService;

  constructor() {
    this.questionRepository = AppDataSource.getRepository(Question);
    this.themeRepository = AppDataSource.getRepository(Theme);
    this.levelRepository = AppDataSource.getRepository(Level);
    this.propositionService = new PropositionService();
    this.openaiService = new OpenAiService();
  }

  async list(take: number, page: number, filterOption?: any): Promise<listResult<Question>> {
    const filterOptionUser: FilterOption = new FilterOption();
    const questionOptions: QuestionListFilter = filterOption as QuestionListFilter;
    // const allFilterOptions = filterOptionUser.questionFilter(questionOptions);

    // const whereCascade: FindOptionsWhere<Question>[] = findOptionHelper.whereCondition<Question>(
    //   allFilterOptions.filterOrArray,
    //   allFilterOptions.filterAndArray,
    //   allFilterOptions.filterRelations[0]
    // );

    let [data, total]: [Question[], number] = [[], 1];

    if (questionOptions.Level != "" && questionOptions.Theme != "") {
      [data, total] = await this.questionRepository.findAndCount({
        take: 15,
        relations: {
          Propositions: true,
          Theme: true,
          Level: true,
        },
        where: { Theme: { Theme: questionOptions.Theme }, Level: { Level: questionOptions.Level } },
      });
    } else if (questionOptions.Level != "" && questionOptions.Theme == "") {
      [data, total] = await this.questionRepository.findAndCount({
        take: 15,
        relations: {
          Propositions: true,
          Theme: true,
          Level: true,
        },
        where: { Level: { Level: questionOptions.Level } },
      });
    } else if (questionOptions.Theme != "" && questionOptions.Level == "") {
      [data, total] = await this.questionRepository.findAndCount({
        take: 15,
        relations: {
          Propositions: true,
          Theme: true,
          Level: true,
        },
        where: { Theme: { Theme: questionOptions.Theme } },
      });
    } else {
      [data, total] = await this.questionRepository.findAndCount({
        take: 15,
        relations: {
          Propositions: true,
          Theme: true,
          Level: true,
        },
      });
    }

    const result: listResult<Question> = { total, data };
    return result;
  }
  create(resource: IQuestion): Promise<Question> {
    return this.questionRepository.save(resource);
  }

  async generateQuestion(questionTheme: OTHEME, numberOfQuestion: number, level: OLEVEL) {
    const systemPrompt: string = `
    Sie sind ein hilfreicher Assistent, der JSON ausgeben kann.
    `;
    const userPrompt: string = `
    Erzeugt ${numberOfQuestion} Fragen aus dem Bereich ${questionTheme} für ${level}, sowie die drei wahrscheinlichen Antworten und die richtige Antwort für jede Frage in der Form: {questions:[{question:"",propositions:[""...],response:""}...]}.
    `;

    const aiResult = await this.openaiService.createCompletion(systemPrompt, userPrompt, 1);
    const returnedQuestions: QuestionModel[] = aiResult["questions"] as QuestionModel[];

    returnedQuestions.map(async (returnedQuestion: QuestionModel) => {
      const questiontheme: ITheme | null = await this.themeRepository.findOne({ where: { Theme: questionTheme } });
      const themeLevel: ILevel | null = (await this.levelRepository.findOne({ where: { Level: level } })) as ILevel;

      const question: IQuestion = {
        Question: returnedQuestion.question,
        Response: returnedQuestion.response,
        ThemeId: questiontheme!.id,
        Theme: questiontheme!,
        LevelId: themeLevel!.id,
        Level: themeLevel,
      };

      const trueQuestion: Question = await this.create(question);

      returnedQuestion.propositions.map(async (prop: string) => {
        const proposition: IProposition = {
          Proposition: prop,
          Question: trueQuestion,
        };

        await this.propositionService.create(proposition);
      });
    });
  }

  readById(id: any): Promise<Question | null> | Promise<IQuestion | null> {
    throw new Error("Method not implemented.");
  }

  putById(id: any, resource: any): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  deleteById(id: any): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
