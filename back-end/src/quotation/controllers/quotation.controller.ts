import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { QuotationService } from '../services/quotation.service';
import { ApiErrorCode } from '../../common/enums/api-error-code.enum';
import { ApiException } from '../../common/exceptions/api.exception';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('quotation')
@ApiTags('语录')
export class QuotationController {
  constructor(private readonly quotationService: QuotationService) {}
  @Get()
  @ApiOperation({ summary: '随机一条语录' })
  async randomOne() {
    const result = await this.quotationService.randomOne();
    if (result.code !== ApiErrorCode.SUCCESS) {
      throw new ApiException(
        result.message,
        result.code,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
