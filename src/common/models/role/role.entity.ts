import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../../snap-system/base-entity/base-entity';
import { User } from '../user/user.entity';
import { RoleEnum } from '../../enum/role.enum';

@Entity({ name: 'roles' })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'name', length: 50 })
  public name: RoleEnum;

  @ManyToMany(() => User)
  @JoinTable()
  public users: User[];
}
