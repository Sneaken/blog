import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from './schemas/blog.schema';
import { BlogController } from './controllers/blog.controller';
import { BlogService } from './services/blog.service';
import { ReportModule } from '../report/report.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Blog', schema: BlogSchema }]),
    ReportModule,
  ],
  controllers: [BlogController],
  providers: [BlogService],
  exports: [BlogService],
})
export class BlogModule {}
