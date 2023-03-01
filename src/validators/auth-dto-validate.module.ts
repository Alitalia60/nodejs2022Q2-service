import { Module } from '@nestjs/common';
import { ValidateAuthDto } from './auth-dto-validate.service';

@Module({
  providers: [ValidateAuthDto],
  exports: [ValidateAuthDto],
})
export class DtoValidateModule { }
