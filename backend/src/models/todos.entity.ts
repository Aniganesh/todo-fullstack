import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Users } from './users.entity';

@Entity({ name: 'todos' })
export class Todo extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  title: string;

  @Column({ type: 'varchar', length: 1000 })
  description: string;

  @Column({ type: 'varchar', length: 20 })
  status: string;

  @ManyToOne(Users.name)
  user: Users;
}
