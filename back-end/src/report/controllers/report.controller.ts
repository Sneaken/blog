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
import { UserIdPipe } from '../pipes/user-id.pipe';
import { ActionTypePipe } from '../pipes/action-type.pipe';
import { BlogIdPipe } from '../pipes/blog-id.pipe';
import { BlogService } from '../../blog/services/blog.service';

@Controller('report')
@ApiTags('上报统计')
export class ReportController {
  constructor(
    private readonly reportService: ReportService,
    private readonly blogService: BlogService,
  ) {}

  @Get(':actionType')
  @ApiOperation({ summary: '处理上报' })
  async handleViews(
    @Param('actionType', new ActionTypePipe()) actionType: number,
    @Query('userID', new UserIdPipe()) userID: string,
    @Query('blogID', new BlogIdPipe()) blogID: string,
    @Ip() ipv4: string,
    @Headers('user-agent') ua: string,
  ) {
    const createReportDto = new CreateReportDto(userID, ipv4, ua, actionType);
    const result = await this.reportService.create(createReportDto);
    if (result.code !== ApiErrorCode.SUCCESS) {
      throw new ApiException(
        result.message,
        result.code,
        HttpStatus.BAD_REQUEST,
      );
    }
    const result2 = await this.blogService.reportViews(blogID);
    if (result2.code !== ApiErrorCode.SUCCESS) {
      throw new ApiException(
        result2.message,
        result2.code,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
