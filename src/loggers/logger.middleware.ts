import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
// import { LogFileService } from '../log-file/log-file.service';

// @Injectable()
export class LoggingMiddlewareService implements NestMiddleware {

  // private logFile = new LogFileService('app.log', 'app-logs');

  private customLogger = new Logger('HTTP');

  use(req: Request, res: Response, next: () => void) {
    const { method, originalUrl, body, query } = req;
    res.on('finish', () => {
      const { statusCode, statusMessage } = res;
      const reqBodyToLog =
        JSON.stringify(body) !== '{}' ? `, body : ${JSON.stringify(body)}` : '';

      const queryToLog =
        JSON.stringify(query) !== '{}'
          ? `, query: ${JSON.stringify(query)}`
          : '';

      const toBackend = `<-- ${method}, url: ${originalUrl}${reqBodyToLog}${queryToLog}`;
      const fromBackend = `--> status code: ${statusCode}, ${statusMessage}`;

      this.customLogger.log(toBackend);

      let loggerType = 'log';
      if (statusCode >= 400) loggerType = 'error';

      this.customLogger[loggerType](fromBackend);

      // this.logFile.update(toBackend);
      // this.logFile.update(fromBackend);
    });
    next();
  }
}
