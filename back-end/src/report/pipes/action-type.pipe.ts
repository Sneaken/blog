import { HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { ApiException } from '../../common/exceptions/api.exception';
import { ApiErrorCode } from '../../common/enums/api-error-code.enum';

@Injectable()
export class ActionTypePipe implements PipeTransform<string, number> {
  transform(value: any): number {
    value = parseInt(value, 10);
    if (isNaN(value) || typeof value !== 'number' || value < 0) {
      throw new ApiException(
        '行为无效',
        ApiErrorCode.REPORT_ACTION_TYPE_INVALID,
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }
}
