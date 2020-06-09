import { forwardRef, Module } from '@nestjs/common';
import { ReportService } from './service/report.service';
import { ReportController } from './controllers/report.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportSchema } from './schemas/report.schema';
import { BlogModule } from '../blog/blog.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Report', schema: ReportSchema }]),
    forwardRef(() => BlogModule),
  ],
  controllers: [ReportController],
  providers: [ReportService],
  exports: [ReportService],
})
export class ReportModule {}
