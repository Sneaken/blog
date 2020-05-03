import { HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quotation } from '../interfaces/quotation.interface';
import { ApiErrorCode } from '../../common/enums/api-error-code.enum';
import { CreateQuotationDto } from '../dto/quotation.dto';

@Injectable()
export class QuotationService {
  constructor(
    @InjectModel('Quotation') private readonly quotationModel: Model<Quotation>,
    private httpService: HttpService,
  ) {}

  /**
   * 新建语录
   * @param {CreateQuotationDto} createQuotationDto
   */
  async create(createQuotationDto: CreateQuotationDto) {
    try {
      const createdQuotation = new this.quotationModel(createQuotationDto);
      await createdQuotation.save();
      return {
        code: ApiErrorCode.SUCCESS,
      };
    } catch (e) {
      return {
        code: ApiErrorCode.QUOTATION_CREATE_ERROR,
        message: '语录创建失败',
      };
    }
  }

  /**
   * 从接口批量导入语录到mongodb
   */
  async find() {
    try {
      const url = 'https://route.showapi.com/1211-1';
      const { data } = await this.httpService
        .get(url, {
          params: {
            // eslint-disable-next-line @typescript-eslint/camelcase
            showapi_appid: '128238',
            // eslint-disable-next-line @typescript-eslint/camelcase
            showapi_sign: 'ed8e6baaa4ca4e71ba5d3e18fe6dfe4a',
            count: '10',
          },
        })
        .toPromise();
      // 一旦出错 整个数据都无法插入
      // await this.quotationModel.insertMany(data.showapi_res_body.data);
      if (data.showapi_res_code === 0) {
        for (
          let i = 0, length = data.showapi_res_body.data.length;
          i < length;
          i++
        ) {
          const { english, chinese } = data.showapi_res_body.data[i];
          const createQuotationDto = new CreateQuotationDto(english, chinese);
          await this.create(createQuotationDto);
        }
      }
      return {
        code: ApiErrorCode.SUCCESS,
      };
    } catch (e) {
      return {
        code: ApiErrorCode.QUOTATION_CREATE_ERROR,
        message: '语录创建失败',
      };
    }
  }

  /**
   * 随机一条语录
   */
  async randomOne() {
    try {
      const result = await this.quotationModel.aggregate([
        {
          $sample: { size: 1 },
        },
      ]);
      if (result.length !== 1) {
        return {
          code: ApiErrorCode.QUOTATION_GET_ERROR,
          message: '语录获取失败',
        };
      }
      return {
        code: ApiErrorCode.SUCCESS,
        data: result[0],
      };
    } catch (e) {
      return {
        code: ApiErrorCode.QUOTATION_GET_ERROR,
        message: '语录获取失败',
      };
    }
  }
}
