import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string; // uuid v4

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  version?: number; // integer number, increments on update

  @Column()
  createdAt?: number; // timestamp of creation

  @Column()
  updatedAt?: number; // timestamp of last update

  toResponse() {
    // const { id, login, version, createdAt, updatedAt } = this;
    const { id, login, version } = this;
    return { id, login, version };
  }
}
