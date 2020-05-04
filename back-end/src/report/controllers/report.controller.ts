import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Query,
  Headers,
  Ip,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReportService } from '../service/report.service';
import { CreateReportDto } from '../dto/report.dto';
import { ApiErrorCode } from '../../common/enums/api-error-code.enum';
import { ApiException } from '../../common/exceptions/api.exception';

@Controller('report')
@ApiTags('上报统计')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get(':actionType')
  @ApiOperation({ summary: '处理上报' })
  async handleViews(
    @Param('actionType') actionType: string,
    @Query('userID') userID: string,
    @Ip() ipv4: string,
    @Headers('user-agent') ua: string,
  ) {
    const createReportDto = new CreateReportDto(
      userID,
      ipv4,
      ua,
      Number(actionType),
    );
    const result = await this.reportService.create(createReportDto);
    if (result.code !== ApiErrorCode.SUCCESS) {
      throw new ApiException(
        result.message,
        result.code,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return result;
  }
}
