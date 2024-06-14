import { Seeder, SeederFactory, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '@models/user/user.entity';
import { generateHash, isNullOrUndefined } from '@snapSystem/helpers/helpers';

export class UserSeeder implements Seeder {
  public async run(
    datasource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    console.info('User seeder running');

    const superUser = await datasource.getRepository(User).findOne({
      where: {
        email: 'superuser@ensue.us',
      },
    });
    if (isNullOrUndefined(superUser)) {
      await factoryManager.get(User).save({
        firstName: 'Super',
        middleName: null,
        lastName: 'User',
        email: 'superuser@ensue.us',
        password: await generateHash('m94w8yyfISyjttp'),
      });
    }
    const userCount = await datasource.getRepository(User).count();
    if (userCount < 10) {
      const userFactory: SeederFactory<User> = factoryManager.get(User);

      await userFactory.saveMany(10);
    }

    console.info('User seeder complete');
  }
}
