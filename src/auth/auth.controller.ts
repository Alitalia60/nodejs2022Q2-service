import {
  Controller,
  UseGuards,
  Post,
  Request,
  Body,
  Get,
  HttpCode,
} from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common/enums';
import { AuthUserDto } from 'src/user/dto/auth-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserService } from '../user/user.service';
import { ValidationPipe } from '@nestjs/common/pipes';
import { ValidateTokenDto } from '../validators/token-validate.service';
import { ValidateAuthDto } from '../validators/auth-dto-validate.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserService,
  ) { }

  //!! LOGIN------------------------------------------

  @Post('login')
  @ApiOperation({ summary: 'Loginng by users login' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Succesfull' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Wrong data' })
  @ApiBody({
    description: 'Required properties: login, password',
    type: AuthUserDto,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(ValidateAuthDto, LocalAuthGuard)
  async login(@Body(ValidationPipe) authUserDto: AuthUserDto) {
    return await this.authService.loginUser(authUserDto);
  }

  //!! CREATE------------------------------------------
  @Post('signup')
  @ApiOperation({ summary: 'Add new user' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Created' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Required data missing or wrong',
  })
  @ApiBody({
    description: 'Required properties: login, password',
    type: CreateUserDto,
  })
  async createUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<User> {
    return this.authService.createUser(createUserDto);
  }

  //!! REFRESH------------------------------------------
  // @UseGuards(ValidateTokenDto, JwtAuthGuard)
  @UseGuards(ValidateTokenDto)
  @Post('refresh')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successfull' })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Token is invalid',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Required refreshToken',
  })
  @ApiBody({
    description: 'Required properties: refreshToken',
    type: CreateUserDto,
  })
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Request() req) {
    return this.authService.refreshTokensPair(req)
    // return req.user
  }

  //!! TEST TEST TEST------------------------------------------
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
