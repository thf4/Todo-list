import { Injectable } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import { IToken, IUser } from "../entities/IUser";

@Injectable()
export class TokenService {
  public async generateToken(user: IUser): Promise<string> {
    const Secret = process.env.SECRET_KEY;
    const tokenDate: IToken = {
      id: user.id,
      email: user.email,
      name: user.name
    };

    return jwt.sign(tokenDate, Secret)
  }
}