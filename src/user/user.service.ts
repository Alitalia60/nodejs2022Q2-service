import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { createHash } from 'node:crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
// import { CustomFIlterExeptions } from 'src/exeptions/http-exeptions.filter';
// import { LoggingService } from '../loggers/logging.service';

@Injectable()
export class UserService {
  private readonly customLogger: Logger;
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    this.customLogger = new Logger('User');
  }

  //!! -------------------------------
  async create(createUserDto: CreateUserDto) {
    console.log('UserService.create, createUserDto: ', createUserDto);
    // this.customLogger.log(`Create user: ${createUserDto}`);

    const { login, password } = createUserDto;
    const newUser = new User();
    newUser.password = this.hashPassword(password);
    newUser.login = login;
    return await this.userRepository.save(newUser);
  }

  //!! -------------------------------

  async findAll() {
    return await this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.login'])
      // .select(['user.id', 'user.login', 'user.password'])
      .getMany();
  }

  //!! -------------------------------
  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      const message = 'User not found';
      this.customLogger.error(message);
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }
    const { password, createdAt, updatedAt, version, ...res } = user;
    return res;
  }

  //!! -------------------------------
  async findByLogin(login: string) {
    const user = await this.userRepository.findOne({ where: { login } });
    if (!user) return null;
    return user;
  }

  //!! -------------------------------
  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.password !== updateUserDto.oldPassword) {
      throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
    }

    Object.assign(user, {
      password: updateUserDto.newPassword,
    });

    // return (await this.userRepository.save(user)).toResponse();
    return await this.userRepository.save(user);
  }

  //!! -------------------------------
  async remove(id: string) {
    const result = await this.userRepository.delete({ id });
    if (result.affected === 0) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  //!! ------------------------------------
  hashPassword(pass: string) {
    return createHash('sha256').update(pass).digest('hex');
  }
}
