/* istanbul ignore file */
import { RpcException } from '@nestjs/microservices';

export default class StandardGrpcError extends RpcException {
  private statusCode: number;

  constructor(statusCode: number, message: string) {
    super({
      statusCode,
      message,
    });

    this.statusCode = statusCode;
    this.message = message;
  }
}
