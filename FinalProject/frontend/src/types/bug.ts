type Edit = {
  timestamp: Date;
  op: string;
  col: string;
  target: string;
  update: EditDesc[];
  preformedBy: string;
}

type EditDesc = {
  field: string;
  oldValue: string;
  newValue: string;
}

type Comment = {
  authorId: string;
  text: string;
  commentedOn: Date;
  id: string;
}

type TestCase = {
  title: string;
  result: string;
  addedOn: Date;
  id: string;
  lastUpdated: Date;
}

type Hours = {
  hours: number;
  loggedBy: string;
  loggedOn: Date;
}

export interface BaseBug {
  _id: string;
  title: string;
  description: string;
  stepsToReproduce: string;
  authorOfBug?: string;
  createdOn?: Date;
  updatedOn?: Date;
  edits?: Edit[];
  comments?: Comment[];
  classification?: string;
  classifiedOn?: Date;
  assignedToUserId?: string;
  assignedToUserName?: string;
  assignedOn?: Date;
  testCases?: TestCase[];
  workHoursLogged?: Hours[];
  fixInVersion?: string;
  fixedOnDate?: Date;
  closed: boolean;
  closedOn?: Date;
  lastUpdatedBy?: string;
}

export type Bug = BaseBug