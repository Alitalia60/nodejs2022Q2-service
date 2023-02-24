import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOneBy({
      login: createUserDto.login,
    });

    if (user) {
      // throw new HttpException(
      //   'Login already exists',
      //   HttpStatus.UNPROCESSABLE_ENTITY,
      // );
    }

    const newUser = new User();
    Object.assign(newUser, createUserDto);
    return (await this.userRepository.save(newUser)).toResponse();
  }

  async findAll() {
    return await this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.login'])
      .getMany();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user.toResponse();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.password !== updateUserDto.oldPassword) {
      throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
    }

    Object.assign(user, {
      password: updateUserDto.newPassword,
    });

    return (await this.userRepository.save(user)).toResponse();
  }

  async remove(id: string) {
    const result = await this.userRepository.delete({ id: id });
    if (result.affected === 0) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
