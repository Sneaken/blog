import {
  ArgumentMetadata,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ApiException } from '../../common/exceptions/api.exception';
import {
  ApiErrorCode,
  ApiErrorMessage,
} from '../../common/enums/api-error-code.enum';

@Injectable()
export class ListConditionPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (
      !this.toValidate(value) ||
      (value.type && !Array.isArray(value.type)) ||
      (value.tags && !Array.isArray(value.tags)) ||
      (value.rewardsOpen && !this.onOrOff(value.rewardsOpen)) ||
      (value.copyrightOn && !this.onOrOff(value.copyrightOn)) ||
      (value.commentable && !this.onOrOff(value.commentable)) ||
      (value.published && !this.onOrOff(value.published))
    ) {
      throw new ApiException(
        ApiErrorMessage.BLOG_LIST_QUERY_BY_CONDITION_ERROR + '2',
        ApiErrorCode.BLOG_LIST_QUERY_BY_CONDITION_ERROR,
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }
  private toValidate(value): boolean {
    let result = false;
    const allow = [
      'title',
      'type',
      'tags',
      'rewardsOpen',
      'copyrightOn',
      'commentable',
      'published',
    ];
    Object.keys(value).forEach(item => {
      if (result) return;
      result = !allow.includes(item);
    });
    return !result;
  }

  private onOrOff(value): boolean {
    return ['0', '1'].includes(value);
  }
}
