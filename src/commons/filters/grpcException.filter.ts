import {
  ExceptionFilter as NestExceptionFilter,
  Catch,
  ArgumentsHost,
} from '@nestjs/common';
@Catch()
export class GrpcExceptionFilter implements NestExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.statusCode;

    if (response.internalRepr.get('user-agent')[0].indexOf('grpc') > -1) {
      return {
        statusCode: status,
        message: exception.message,
        data: null,
      };
    }
  }
}
