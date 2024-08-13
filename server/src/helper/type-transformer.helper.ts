import { ValueTransformer } from "typeorm";

export const bigintTransformer: ValueTransformer = {
  to: (entityValue: number) => entityValue,
  from: (databaseValue: string): number => parseInt(databaseValue, 10),
};

export const numberTransformer: ValueTransformer = {
  to: (entityValue: number) => entityValue,
  from: (databaseValue: string): number => Number(databaseValue),
};

export const dateTransformer: ValueTransformer = {
  to: (entityValue: Date | null) => entityValue,
  from: (databaseValue: string): Date | null => (databaseValue ? new Date(databaseValue) : null),
};
