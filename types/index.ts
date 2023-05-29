import { User } from "@prisma/client";

//creates a new type by omitting specific properties from an existing type.
export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  //replace 3 omitted properties above with below
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
