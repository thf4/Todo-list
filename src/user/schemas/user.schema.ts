import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Roles } from '../../entities/IUser';

export type UserModel = User & Document;

@Schema()
export class User {
  @Prop()
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ type: Roles })
  role: Roles[];
}

export const UserSchema = SchemaFactory.createForClass(User);