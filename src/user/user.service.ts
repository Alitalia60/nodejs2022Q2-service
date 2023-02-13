import { v4 as uuidv4 } from 'uuid';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DB } from '../DataBase/database';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { version } from 'os';

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
      throw new HttpException('Login already exists', HttpStatus.NOT_FOUND);
    }

    const itemData = {
      // id: uuidv4(),
      ...createUserDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const newUser = this.userRepository.create(itemData);
    return (await this.userRepository.save(newUser)).toResponse();
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users.map((item) => item.toResponse());
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

    Object.assign(user, updateUserDto);
    return (await this.userRepository.save(user)).toResponse();
  }

  async remove(id: string) {
    const result = await this.userRepository.delete({ id: id });
    if (result.affected === 0) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  // create(createUserDto: CreateUserDto) {
  //   const itemData = {
  //     id: uuidv4(),
  //     ...createUserDto,
  //     version: 1,
  //     createdAt: Date.now(),
  //     updatedAt: Date.now(),
  //   };
  //   DB.users.push(itemData);
  //   const { password, ...rest } = itemData;
  //   return rest;
  // }

  // findAll() {
  //   return DB.users.map((user) => {
  //     const { password, ...rest } = user;
  //     return rest;
  //   });
  // }

  // findOne(id: string) {
  //   const user = DB.users.find((item) => item.id === id);

  //   if (!user) {
  //     throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //   }
  //   const { password, ...rest } = user;
  //   return rest;
  // }

  // update(id: string, updateUserDto: UpdateUserDto) {
  //   const user = DB.users.find((item) => item.id === id);

  //   if (!user) {
  //     throw new HttpException('Useric not found', HttpStatus.NOT_FOUND);
  //   }

  //   if (user.password !== updateUserDto.oldPassword) {
  //     throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
  //   }

  //   const index = DB.users.indexOf(user);
  //   if (user.password !== updateUserDto.newPassword) {
  //     const itemData = {
  //       ...user,
  //       password: updateUserDto.newPassword,
  //       version: user.version + 1,
  //       updatedAt: Date.now(),
  //     };
  //     Object.assign(DB.users[index], itemData);
  //   }
  //   const { password, ...rest } = DB.users[index];
  //   return rest;
  // }

  // remove(id: string) {
  //   const user = DB.users.find((user) => user.id === id);
  //   if (!user) {
  //     throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //   }
  //   DB.users = DB.users.filter((user) => user.id !== id);
  // }
}
