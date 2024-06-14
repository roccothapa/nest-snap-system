import { BaseRepository } from '@snapSystem/repository/base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { User } from '@models/user/user.entity';
import { UserSerializer } from '@models/user/user.serializer';
import { BaseFilter } from '@snapSystem/flters/Base.filter';

export class UserRepository extends BaseRepository<User, UserSerializer> {
  protected getFilter(builder: SelectQueryBuilder<User>): BaseFilter<User> {
    return undefined;
  }

  public constructor(@InjectRepository(User) repo: Repository<User>) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  protected transform(model: User): UserSerializer {
    return plainToInstance(UserSerializer, instanceToPlain(model));
  }

  protected onBeforeResult(builder: SelectQueryBuilder<User>): void {}
}
