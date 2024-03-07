import { Module, Logger } from '@nestjs/common';
import { VoteModule } from './vote/vote.module';
import { ManageModule } from './manage/manage.module';
import { UploadModule } from './upload/upload.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { WinstonInstance } from './utils/winston.logger.util';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: process.env.NODE_ENV == 'prod' ? '../.env.prod' 
        : process.env.NODE_ENV == 'dev' ? '../.env.dev' : '../.env.local',
    }),
    WinstonModule.forRoot({
      instance: WinstonInstance
    }),
    VoteModule, 
    ManageModule,
    UploadModule, 
    UserModule, AuthModule
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
