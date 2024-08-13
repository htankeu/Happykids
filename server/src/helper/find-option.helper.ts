import { FindOptionsOrder, FindOptionsWhere } from "typeorm";

export class FindOptionHelper {
  whereCondition<T>(
    orParams: { key: string; value: any }[][],
    andParams: { key: string; value: any }[],
    relationOrParams: {
      key: string;
      value: { key: string; value: { key: string; value: any }[][] };
    }
  ): FindOptionsWhere<T>[] {
    const whereCascade: { [key: string]: any }[] = [];
    const relCascade: { [key: string]: any } = {};
    // set a or-condition with the and-condition together
    orParams.forEach((m) => {
      const orCascade: { [key: string]: any } = {};

      m.forEach((n) => {
        orCascade[n.key] = n.value;

        andParams.forEach((j) => {
          orCascade[j.key] = j.value;
          if (relationOrParams) {
            orCascade[relationOrParams.key] = {
              [relationOrParams.value.key]: relCascade,
            };
          }
        });
      });

      whereCascade.push(orCascade);
    });

    if (orParams.length > 0) return whereCascade as FindOptionsWhere<T>[];

    // set a and condition
    const andCascade: { [key: string]: any } = this.getAndCascade(andParams, relationOrParams);
    whereCascade.push(andCascade);

    return whereCascade as FindOptionsWhere<T>[];
  }

  private getAndCascade(andParams: { key: string; value: any }[], relationOrParams: any): { [key: string]: any } {
    const andCascade: { [key: string]: any } = {};

    andParams.forEach((j) => {
      andCascade[j.key] = j.value;
    });
    if (relationOrParams) {
      const relCascade = this.getRelationCascade(relationOrParams);
      andCascade[relationOrParams.key] = {
        [relationOrParams.value.key]: relCascade,
      };
    }

    return andCascade;
  }

  private getRelationCascade(relationOrParams: {
    key: string;
    value: { key: string; value: { key: string; value: any }[][] };
  }): { [key: string]: any } {
    const relCascade: { [key: string]: any } = {};

    // set a where condition for the entities in relation
    if (relationOrParams) {
      relationOrParams.value.value.forEach((l) => {
        l.forEach((k) => {
          relCascade[k.key] = k.value;
        });
      });
    }

    return relCascade;
  }

  createOrderOptions<T>(sortParams: { key: string; value: "ASC" | "DESC" | undefined }): FindOptionsOrder<T> {
    return {
      [sortParams.key]: sortParams.value,
    } as FindOptionsOrder<T>;
  }
}

export default new FindOptionHelper();
