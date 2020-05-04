import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from './schemas/blog.schema';
import { BlogController } from './controllers/blog.controller';
import { BlogService } from './services/blog.service';
import { ReportService } from '../report/service/report.service';
import { ReportSchema } from '../report/schemas/report.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Blog', schema: BlogSchema }]),
    MongooseModule.forFeature([{ name: 'Report', schema: ReportSchema }]),
  ],
  controllers: [BlogController],
  providers: [BlogService, ReportService],
})
export class BlogModule {}
