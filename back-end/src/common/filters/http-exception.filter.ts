import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ApiException } from '../exceptions/api.exception';

@Catch(HttpException)
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    if (exception instanceof ApiException) {
      response.status(status).json({
        date: new Date(),
        code: exception.getErrorCode(),
        message: exception.getErrorMessage(),
      });
    } else {
      response.status(status).json({
        statusCode: status,
        date: new Date().toLocaleDateString(),
        message: exception,
      });
    }
  }
}
