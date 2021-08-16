import { Roles } from "./IUser";

export interface CurrentUser {
  id: string;
  name: string;
  lastName: string;
  email: string;
  role: Roles[];
}