import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from './src/Shared/shared.module';

@Module({
  imports: [
    SharedModule,
    ConfigModule.forRoot({
      isGlobal: true ,
    }),
    MongooseModule.forRoot(process.env.DATABASE_KEY),
  ],
})
export class AppModule {}
