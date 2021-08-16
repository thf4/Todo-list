import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';


@Injectable()
export class PasswordService {
  public async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  public async compare(hash: string, password: string): Promise<Boolean> {
    return bcrypt.compare(password, hash);
  }
}