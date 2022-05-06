import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import * as _ from 'lodash';
@Catch()
export class GRPCExceptionFilterAux implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    let code = '999',
      status = 500,
      message = 'Erro desconhecido';
    if (exception.getStatus) {
      const ctx = host.switchToHttp();
      const httpResponse = ctx.getResponse();
      const { 'user-agent': userAgent = [] } = httpResponse._internal_repr;
      const [agent = ''] = userAgent;
      if (agent.match(/grpc/g)) {
        status = exception.getStatus();
        ({ code, message } = exception.message);
      }
    } else {
      const paths = [
        'soapenv:Envelope.soap:Body.soap:Fault.faultstring._text',
        'soapenv:Envelope.soapenv:Body.soapenv:Fault.faultstring._text',
      ];
      let soapError = '';
      _.forEach(paths, (path: any) => {
        soapError = _.get(exception, path, '');
        if (soapError) return false;
      });
      if (soapError) [code, message] = soapError.split(' - ');
    }
    code = code.replace(/^.*:/, '');
    return {
      error: {
        status,
        message: {
          code,
          message,
        },
      },
    };
  }
}
