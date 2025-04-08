import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { Post } from './post/post';
import { UserModule } from './user/user.module';
import { User } from './user/user';
import { AuthModule } from './auth/auth.module';
import { CommentaryModule } from './commentary/commentary.module';
import { Commentary } from './commentary/commentary';
import { ReactionModule } from './reaction/reaction.module';
import { Reaction } from './reaction/reaction';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Tsatsa18111985',
    database: 'arsenaldb',
    entities: [Post, User, Commentary,Reaction],
    synchronize: true,
  }), PostModule, UserModule, AuthModule, CommentaryModule, ReactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
