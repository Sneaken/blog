import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogModule } from './blog/blog.module';
import { UserModule } from './user/user.module';
import { TagModule } from './tag/tag.module';
import { TypeModule } from './type/type.module';
import { CommentModule } from './comment/comment.module';
import { QuotationModule } from './quotation/quotation.module';
import { ReportController } from './report/controllers/report.controller';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    BlogModule,
    UserModule,
    TagModule,
    TypeModule,
    CommentModule,
    QuotationModule,
    ReportModule,
    MongooseModule.forRoot('mongodb://localhost:27017/blog', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
