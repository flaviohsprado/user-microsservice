import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connection } from './commons/config/connectionDatabase.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...connection,
    }),
    UserModule,
  ],
})
export class AppModule {}
