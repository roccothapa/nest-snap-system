import { BaseEntitySerializer } from '@snapSystem/base-entity/serializer/base-entity.serializer';
import { Exclude, Expose } from 'class-transformer';
import { isNullOrUndefined } from '@snapSystem/helpers/helpers';

export class UserSerializer extends BaseEntitySerializer {
  public id: number;

  public firstName: string;

  public lastName: string;

  public middleName: string;

  public avatar: string;

  public email: string;

  @Exclude({ toPlainOnly: true })
  public password: string;

  @Exclude({ toPlainOnly: true })
  public emailVerifyAt: string;

  public status: boolean;

  @Exclude({ toPlainOnly: true })
  public isLocked: boolean;

  @Expose()
  get fullName(): string {
    if (isNullOrUndefined(this.middleName) || this.middleName == '') {
      return `${this.firstName} ${this.lastName}`;
    } else {
      return `${this.firstName} ${this.middleName} ${this.lastName}`;
    }
  }
}
