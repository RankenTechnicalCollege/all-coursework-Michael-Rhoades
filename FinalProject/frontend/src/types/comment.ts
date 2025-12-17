export interface BaseComment {
  id: string;
  authorId: string;
  authorName: string;
  text: string;
  commentedOn: Date;
}

export type Comment = BaseComment