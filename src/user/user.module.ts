import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { SharedModule } from '../Shared/shared.module';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeatureAsync([{
      name: User.name,
      useFactory: () => {
        UserSchema.pre('save', function (next){
          console.log('deu mole');
          next();
        });
      }
    }]),
  ],
  providers: [UserService],
  exports:[UserService],
  controllers: [UserController],
})
export class UserModule {}
