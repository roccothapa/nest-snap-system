import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../../snap-system/base-entity/base-entity';
import { Role } from '../role/role.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'first_name', length: 50 })
  public firstName: string;

  @Column({ name: 'last_name', length: 50 })
  public lastName: string;

  @Column({ nullable: true, name: 'middle_name', length: 50 })
  public middleName: string;

  @Column({ name: 'avatar', length: 250 })
  public avatar: string;

  @Column({ name: 'email', length: 50 })
  public email: string;

  @Column({ name: 'password', length: 255 })
  public password: string;

  @Column({
    nullable: true,
    name: 'email_verify_at',
    type: 'datetime',
  })
  public emailVerifyAt: string;

  @Column({ name: 'status', type: 'tinyint' })
  public status: boolean;

  @Column({ name: 'is_locked', type: 'boolean' })
  public isLocked: boolean;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'users_roles',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  public roles: Role[];
}
