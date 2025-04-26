import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.NOT_FOUND;

    if (
      request.headers.accept &&
      request.headers.accept.includes('text/html')
    ) {
      response.status(status).render('404', {
        message: exception.message,
        url: request.url,
        layout: false,
      });
    } else {
      response.status(status).json({
        message: exception.message,
        statusCode: status,
      });
    }
  }
}
