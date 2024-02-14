import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VoteModule } from './vote/vote.module';
import { ManageModule } from './manage/manage.module';
import { UploadModule } from './upload/upload.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [VoteModule, ManageModule, UploadModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
