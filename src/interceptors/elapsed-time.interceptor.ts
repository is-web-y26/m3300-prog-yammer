import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class ElapsedTimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    return next.handle().pipe(
      tap(() => {
        const time = Date.now() - now;
        if (
          request &&
          request.headers.accept &&
          request.headers.accept.includes('text/html')
        ) {
          response.locals.loadTime = time;
        } else {
          if (response.setHeader)
            response.setHeader('X-Elapsed-Time', `${time} ms`);
        }
        console.log(`Response processed: ${time} ms`);
      }),
    );
  }
}
