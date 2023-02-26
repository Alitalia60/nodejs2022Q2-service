import { Module } from '@nestjs/common';
import { MessageService } from './message.service';

@Module({
  imports: [],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule { }
