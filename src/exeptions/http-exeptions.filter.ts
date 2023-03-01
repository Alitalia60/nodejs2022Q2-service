import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly customLogger: Logger;
  private readonly name: string;
  constructor(name = '') {
    this.name = name;
    this.customLogger = new Logger();
    // this.customLogger.log
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const mes = exception.message;
    const errName = exception.name;

    const bodyToLog =
      JSON.stringify(req.body) !== '{}'
        ? `, body : ${JSON.stringify(req.body)}`
        : '';

    const queryToLog =
      JSON.stringify(req.query) !== '{}'
        ? `, query: ${JSON.stringify(req.query)}`
        : '';

    this.customLogger.error(
      `[${this.name}] ${req.method}, url: ${req.originalUrl}${bodyToLog}${queryToLog}, status code: ${status}`,
    );

    res.status(status).json({
      message: mes,
      statusCode: status,
    });
  }
}
