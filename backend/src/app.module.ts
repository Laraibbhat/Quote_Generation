import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'laraib',
      password: 'Laraib9241',
      database: 'testDB',
      // entities: [User],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
