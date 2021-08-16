import { TodoDto } from "../todo/dto/todo.dto";
import { Todo } from "../todo/schemas/todo.schema";
import { CurrentUser } from "./ICurrentUser";

export interface IUser {
  id?: string;
  userId?: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IToken {
  id: string;
  name: string;
  email: string;
}

export interface UserWithTodo extends CurrentUser {
  todo: Todo[]
}

export enum Roles {
  client = 'client',
  admin = 'admin'
}