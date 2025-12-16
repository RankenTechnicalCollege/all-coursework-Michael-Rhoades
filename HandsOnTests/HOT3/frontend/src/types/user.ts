export interface BaseUser {
  _id: string;
  email: string;
  emailVerified?: boolean;
  fullName?: string;
  givenName?: string;
  familyName?: string;
  createdAt?: string;
  updatedAt?: string;
  role?: string[];
}

export type User = BaseUser