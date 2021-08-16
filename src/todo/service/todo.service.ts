import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CurrentUser } from "../../entities/ICurrentUser";
import { ITodo } from "../../entities/ITodo";
import { UserWithTodo } from "../../entities/IUser";
import { UserDto } from "../../user/dto/user.dto";
import { User, UserModel } from "../../user/schemas/user.schema";
import { TodoDto } from "../dto/todo.dto";
import { Todo, TodoModel } from "../schemas/todo.schema";


@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private todoModel: Model<TodoModel>,
    @InjectModel(User.name) private userModel: Model<UserModel>,
  ){}

  public findAll = async (): Promise<Todo[]> => {
    try {
      return this.todoModel.find().exec();
    } catch(err) {  
      throw err;
    } 
  }

  public findOne = async (id: string): Promise<Todo> => {
    try{ 
      const todo = await this.todoModel.findById(id); 
      return todo
    } catch(err) {
      throw err;
    }
  }

  public findUserTodo = async ( userId: Types.ObjectId, currentUser: CurrentUser): Promise<UserWithTodo> =>{
    try{
      const client = await this.todoModel.find({userId: userId});
      const user: UserWithTodo = { ...currentUser, todo: client}
      return user
    } catch(err){
      throw err;
    }
  } 
   
  public createTodo = async (dto: TodoDto): Promise<ITodo> => {
    try {
      const create = this.todoModel.create(dto);
      return create;
    } catch(err) {
      throw err;
    }
  }
 
  public createTodoUser = async ( payload: TodoDto): Promise<Todo> => {
    try {

      const data = await this.todoModel.create(payload);
      return data
    } catch(err) {
      throw err;
    }
  }
}