export interface BaseTest {
  id: string;
  createdBy?: string;
  createdOn?: Date;
  title: string;
  result: string;
}

export type Test = BaseTest