import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Report } from '../interfaces/report.interface';
import { ApiErrorCode } from '../../common/enums/api-error-code.enum';
import { CreateReportDto } from '../dto/report.dto';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel('Report') private readonly reportModel: Model<Report>,
  ) {}

  /**
   * 新建日志
   * @param {CreateReportDto} createReportDto
   */
  async create(createReportDto: CreateReportDto) {
    try {
      const createdReport = new this.reportModel(createReportDto);
      await createdReport.save();
      return {
        code: ApiErrorCode.SUCCESS,
      };
    } catch (e) {
      return {
        code: ApiErrorCode.REPORT_CREATE_ERROR,
        message: '上报失败',
      };
    }
  }
}
