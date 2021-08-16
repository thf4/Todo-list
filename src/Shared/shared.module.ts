import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthService } from "../middlewares/auth.service";

import { PasswordService } from "../middlewares/password.service";
import { TokenService } from "../middlewares/token.service";
import { TodoController } from "../todo/controller/todo.controller";
import { Todo, TodoSchema } from "../todo/schemas/todo.schema";
import { TodoService } from "../todo/service/todo.service";
import { UserController } from "../user/controller/user.controller";
import { User, UserSchema } from "../user/schemas/user.schema";
import { UserService } from "../user/service/user.service";
import { JwtStrategy } from "../middlewares/jwt.strategy";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Todo.name,
        schema: TodoSchema,
      },
    ]),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, PasswordService, TokenService, UserService, TodoService,JwtStrategy],
  exports:[AuthService, PasswordService, TokenService, UserService, TodoService,JwtStrategy],
  controllers: [UserController, TodoController]
})
export class SharedModule {}
