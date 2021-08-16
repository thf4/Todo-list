import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IUser } from "../entities/IUser";
import { LoginDto, LoginToken } from "../user/dto/user.dto";
import { User, UserModel } from "../user/schemas/user.schema";
import { PasswordService } from "./password.service";
import { TokenService } from "./token.service";

@Injectable()
export class AuthService {
  constructor(
    private passwordService: PasswordService,
    private tokenService: TokenService,
    @InjectModel(User.name) private userModel: Model<UserModel>
  ) {}

  async passwordMatches(hash: string, password: string): Promise<Boolean> {
    const result = await this.passwordService.compare(hash, password)
    if(!result)
      throw new BadRequestException('invalid password');

    return result;
  };

  async login(payload: LoginDto): Promise<LoginToken> {
    try {
      const user = await this.validateEmail(payload.email);

      await this.passwordMatches(user.password, payload.password);

      const x = await this.tokenService.generateToken(user);

      const result = {token: x} ;

      return result;
    } catch(err){
      return err
    };
  }

  private async validateEmail(email: string): Promise<IUser> {
    const checkEmailAvailable = await this.userModel.findOne({ email });
    
    if(!checkEmailAvailable)
      throw new BadRequestException('user not found')

    return checkEmailAvailable;
  };

}