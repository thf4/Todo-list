import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Types } from "mongoose";
import { CurrentUser } from "../../entities/ICurrentUser";
import { Roles, UserWithTodo } from "../../entities/IUser";
import { JwtAuthGuard } from "../../Shared/decorators/auth.decorator";


import { Users } from "../../Shared/decorators/user.decorator";
import { TodoDto } from "../dto/todo.dto";
import { Todo } from "../schemas/todo.schema";
import { TodoService } from "../service/todo.service";

@Controller('todo')
export class TodoController {
  constructor (private readonly todoService: TodoService) {}

  @Get()
  findAll(): Promise<Todo[]> {
    try{ 
      return this.todoService.findAll();
    } catch(err) {
      throw err;
    }
  };

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  find(@Param('id') id: string): Promise<Todo> {
    try{ 
      return this.todoService.findOne(id);
    } catch(err) {
      throw err;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  todoUser(@Body() payload: TodoDto): Promise<Todo> {
    try {
      return this.todoService.createTodoUser(payload)
    } catch(err) {
      throw err;
    } 
  }

  @UseGuards(JwtAuthGuard)
  @Get('busca/:id')
  findUserTodo(@Param('id') id: Types.ObjectId, currentUser: CurrentUser): Promise<UserWithTodo> {
    try{
      return this.todoService.findUserTodo(id, currentUser)
    } catch(err) {
      throw err;
    }
  }
}