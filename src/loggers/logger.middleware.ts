import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
// import { LoggingService } from './logging.service';

@Injectable()
export class LoggingMiddlewareService implements NestMiddleware {
  // constructor(private readonly customLogger: LoggingService) {
  //   this.customLogger.setContext('HTTP');
  // }
  private customLogger = new Logger('HTTP');

  use(req: Request, res: Response, next: () => void) {

    const { method, originalUrl, body, query } = req;
    res.on('finish', () => {
      const { statusCode } = res;
      if (method !== 'GET') {
        this.customLogger.log(
          `${method}, ${originalUrl},${body}, ${query}, status code: ${statusCode}`,
        );
      } else {
        this.customLogger.log(
          `${method}, ${originalUrl}, status code: ${statusCode}`,
        );
      }
    });
    next();
  }
}
