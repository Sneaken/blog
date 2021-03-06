import { HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { ApiException } from '../../common/exceptions/api.exception';
import {
  ApiErrorCode,
  ApiErrorMessage,
} from '../../common/enums/api-error-code.enum';

@Injectable()
export class UserIdPipe implements PipeTransform<string, string> {
  transform(value: any): string {
    if (typeof value !== 'string' || value.length !== 32) {
      throw new ApiException(
        ApiErrorMessage.REPORT_USER_ID_INVALID,
        ApiErrorCode.REPORT_USER_ID_INVALID,
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }
}
