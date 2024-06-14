import { BaseFilter } from '@snapSystem/flters/Base.filter';
import { Brackets, SelectQueryBuilder } from 'typeorm';
import { User } from '@models/user/user.entity';

export class UserFilter extends BaseFilter<User> {
  public constructor(builder: SelectQueryBuilder<User>) {
    super(builder);
  }

  public name(name = '') {
    if (name != '') {
      this.builder.where(
        new Brackets((qb) => {
          qb.where('first_name LIKE :firstName', { firstName: `%${name}%` })
            .orWhere('last_name LIKE :lastName', { lastName: `%${name}%` })
            .orWhere('middle_name LIKE :middleName', {
              middleName: `%${name}%`,
            });
        }),
      );
      return this.builder;
    }
  }
}
