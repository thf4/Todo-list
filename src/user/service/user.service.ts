import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { IUser, UserWithTodo } from '../../entities/IUser';
import { PasswordService } from '../../middlewares/password.service';
import { UserDto } from '../dto/user.dto';
import { User, UserModel } from '../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
  @InjectModel(User.name) private userModel: Model<UserModel>,
  private passwordService: PasswordService,
  ) {}
    
    async findAll(): Promise<User[]> {
    try {
      return this.userModel.find().exec();
    } catch (err) {
      throw err;
    }
  }

  public findOne = async (id: Types.ObjectId): Promise<User> => {
    try {
      const find = await this.userModel.findById(id);
      return find;
    } catch(err) {
      throw err;
    }
  }

  async create(dto: UserDto): Promise<User> {
    try {
     
      const hash = await this.passwordService.hash(dto.password);

      const data: IUser = { ...dto, password: hash };

      await this.validateEmail(dto.email);

      const client = await this.userModel.create(data);

      return client
    } catch (err) {
        throw err
    }
  }

  private async validateEmail(email: string): Promise<void> {
    const checkEmailAvailable = await this.userModel.findOne({ email });
    
    if(checkEmailAvailable)
      throw new ConflictException('Email is taken')
  }
}
