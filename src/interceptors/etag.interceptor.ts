import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import * as crypto from 'crypto';
import { Response } from 'express';

@Injectable()
export class CacheControl implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      tap((data) => {
        const tag = crypto
          .createHash('sha256')
          .update(JSON.stringify(data))
          .digest('hex');
        response.setHeader('ETag', tag);
        response.setHeader('Cache-Control', 'public, max-age=3600');
      }),
    );
  }
}
