import { EntitySchema } from 'typeorm';
import { User } from './user.entity'

export const UserEntitySchema = new EntitySchema({
  name: 'user',
  target: User,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: true,
    },
    login: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
    version: {
      type: 'string',
    },
  },
});
