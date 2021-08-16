import { Module } from '@nestjs/common';
import { SharedModule } from '../Shared/shared.module';
import { TodoController } from './controller/todo.controller';
import { TodoService } from './service/todo.service';

@Module({
  imports: [
    SharedModule,
  ],
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}
