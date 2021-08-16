import { IsOptional, IsString } from "class-validator";

export class TodoDto {
  @IsString()
  @IsOptional()
  userId?: string;

  @IsString()
  title: string;

  @IsString()
  text: string;
  
  @IsString()
  @IsOptional()
  createAt?: Date;
}