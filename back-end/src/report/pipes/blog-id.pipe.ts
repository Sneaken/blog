import { HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { ApiException } from '../../common/exceptions/api.exception';
import {
  ApiErrorCode,
  ApiErrorMessage,
} from '../../common/enums/api-error-code.enum';

@Injectable()
export class BlogIdPipe implements PipeTransform {
  transform(value: any): string {
    if (typeof value === 'undefined') return value;
    if (typeof value !== 'string' || value.length !== 24) {
      throw new ApiException(
        ApiErrorMessage.REPORT_BLOG_ID_INVALID,
        ApiErrorCode.REPORT_BLOG_ID_INVALID,
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }
}
