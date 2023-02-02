import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DB } from '../DataBase/database';

// type userDto = CreateUserDto | UpdateUserDto;
@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    const newUser = new CreateUserDto();
    const newUserData = {
      ...createUserDto,
      id: uuidv4(),
      version: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    Object.assign(newUser, newUserData);
    DB.users.push(newUser);
    return newUser;
  }

  findAll() {
    return DB.users;
  }

  findOne(id: string) {
    return DB.users.find((user) => user.id === id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const userIndex = DB.users.findIndex((user) => user.id === id);
    if (DB.users[userIndex].password !== updateUserDto.password) {
      const newUserData = {
        password: updateUserDto.password,
        version: DB.users[userIndex].version + 1,
        updateAt: Date.now(),
      };
      const userData = { ...DB.users[userIndex], ...newUserData };
      DB.users.splice(userIndex, 1, userData);
    }
    return DB.users[userIndex];
  }

  remove(id: string) {
    DB.users = DB.users.filter((user) => user.id !== id);
    return;
  }
}
