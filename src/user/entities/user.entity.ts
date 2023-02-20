import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string; // uuid v4

  @Column()
  login: string;

  @Column()
  password: string;

  @VersionColumn()
  version: number; // integer number, increments on update

  @CreateDateColumn()
  createdAt: Date; // timestamp of creation

  @UpdateDateColumn()
  updatedAt: Date; // timestamp of last update

  toResponse() {
    // const { id, login, version, createdAt, updatedAt } = this;
    const { id, login, version } = this;
    const createdAtAsNumber = new Date(this.createdAt).getTime();
    const updatedAtAsNumber = new Date(this.updatedAt).getTime();
    return {
      id: id,
      login: login,
      version: version,
      createdAt: createdAtAsNumber,
      updatedAt: updatedAtAsNumber,
    };
  }
}
