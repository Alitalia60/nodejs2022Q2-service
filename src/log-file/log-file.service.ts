import { Injectable } from '@nestjs/common';
import fs from 'fs';
import { resolve } from 'node:path';

// @Injectable()
export class LogFileService {
  isSavingActive: boolean;
  fileName: string;
  logDirName: string;
  logFileSize: number;
  logFilelUrl: string;

  constructor(
    fileName: string,
    logDirName: string,
    isSavingActive = true,
    logFileSize = 100,
    logFilelUrl = process.cwd(),
  ) {

    this.logFilelUrl = resolve(process.cwd(), this.logDirName, this.fileName);
    this.logFilelUrl = './src/' + this.logDirName + '/' + this.fileName;
  }

  async update(messageLine: string) {
    fs.appendFile(this.logFilelUrl, messageLine, (err) => {
      throw new Error(`Error updating log file:  ${err}`);
    });
  }
}
