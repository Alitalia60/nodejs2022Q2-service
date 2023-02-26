import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';

@Injectable()
export class MessageService {

  sayError(mes: string, error: string) {
    console.log(mes, error);

  }
}
