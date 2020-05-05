import {
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Ip,
  Query,
} from '@nestjs/common';
import { QuotationService } from '../services/quotation.service';
import { ApiErrorCode } from '../../common/enums/api-error-code.enum';
import { ApiException } from '../../common/exceptions/api.exception';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserIdPipe } from '../../report/pipes/user-id.pipe';
import { ReportService } from '../../report/service/report.service';
import { CreateReportDto } from '../../report/dto/report.dto';
import { ActionTypeCode } from '../../report/enums/action-type.enum';

@Controller('quotation')
@ApiTags('语录')
export class QuotationController {
  constructor(
    private readonly quotationService: QuotationService,
    private readonly reportService: ReportService,
  ) {}
  @Get()
  @ApiOperation({ summary: '随机一条语录' })
  async randomOne(
    @Query('userID', new UserIdPipe()) userID: string,
    @Ip() ipv4: string,
    @Headers('user-agent') ua: string,
  ) {
    const result = await this.quotationService.randomOne();
    if (result.code !== ApiErrorCode.SUCCESS) {
      throw new ApiException(
        result.message,
        result.code,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const createReportDto = new CreateReportDto(
      userID,
      ipv4,
      ua,
      ActionTypeCode.CHANGE_QUOTATION,
    );
    await this.reportService.create(createReportDto);
    return result;
  }
  @Get('insert')
  @HttpCode(201)
  @ApiOperation({ summary: '录入语录' })
  async collect() {
    const result = await this.quotationService.find();
    if (result.code !== ApiErrorCode.SUCCESS) {
      throw new ApiException(
        result.message,
        result.code,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
