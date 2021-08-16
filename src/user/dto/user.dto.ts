import { Type } from 'class-transformer';
import { IsEmail, IsJWT, IsString } from 'class-validator';
import { TodoDto } from '../../todo/dto/todo.dto';

export class UserDto {
  @IsString()
  id?: string;

  @IsString()
  name: string;
  
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @Type(() => TodoDto)
  todo?: TodoDto
 
}

export class LoginDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class LoginToken {
  @IsJWT()
  public token: string;
}
