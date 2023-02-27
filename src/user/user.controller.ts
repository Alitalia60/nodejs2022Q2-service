import { ValidationPipe } from '@nestjs/common/pipes';
import { HttpCode, UseGuards } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import {
  Controller,
  Get,
  // Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  UseFilters,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HttpExceptionFilter } from '../exeptions/http-exeptions.filter';
// import { AppErrorsFilter } from 'src/exeptions/app-errors.filter';

//!! ------------------------------------------------
@ApiTags('user')
@UseGuards(JwtAuthGuard)
@UseFilters(new HttpExceptionFilter(UserController.name))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'List all users' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  findAll() {
    return this.userService.findAll();
  }

  //!! ------------------------------------------------
  @Get(':id')
  @ApiOperation({ summary: 'Find user with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'user`s id (UUID)' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'id is not UUID',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found' })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.findOne(id);
  }

  //!! ------------------------------------------------
  @Put(':id')
  @ApiOperation({ summary: 'Change user with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'user`s id (UUID)' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Wrong password' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'id is not UUID',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User with specified id not found',
  })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  //!! ------------------------------------------------
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'user`s id (UUID)' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Success' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User with id not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'id is not UUID',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.remove(id);
  }
}
