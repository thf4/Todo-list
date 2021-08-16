import { Prop, Schema, SchemaFactory  } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema, Types } from "mongoose";
import { User } from "../../user/schemas/user.schema";

export type TodoModel = Todo & Document;

@Schema()
export class Todo {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User'})
  userId?: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  text: string;

  @Prop({ default: Date.now })
  creatAt?: Date
}

export const TodoSchema = SchemaFactory.createForClass(Todo);