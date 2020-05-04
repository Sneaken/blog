import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Report } from '../interfaces/report.interface';
import { ApiErrorCode } from '../../common/enums/api-error-code.enum';
import { CreateReportDto } from '../dto/report.dto';
import { ActionTypeCode } from '../enums/action-type.enum';

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

  /**
   * 查询访问量
   */
  async handleVisits() {
    try {
      const result = await this.reportModel.aggregate([
        { $match: { actionType: ActionTypeCode.VISIT } },
        { $project: { _id: 0, userID: 1 } },
      ]);
      const uniqueList = [...new Set(result.map(item => item.userID))];
      // const result = await this.reportModel.countDocuments({actionType: ActionTypeCode.VISIT})
      // 查询不带参数用以下方法
      // const result = await this.reportModel.estimatedDocumentCount({});
      return {
        code: ApiErrorCode.SUCCESS,
        data: {
          visitors: uniqueList.length,
          views: result.length,
        },
      };
    } catch (e) {
      return {
        code: ApiErrorCode.REPORT_CREATE_ERROR,
        message: `查询失败：${e.message}`,
      };
    }
  }
}
