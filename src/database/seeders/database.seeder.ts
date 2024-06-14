import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { UserSeeder } from 'src/database/seeders/user.seeder';

export class DatabaseSeeder implements Seeder {
  public async run(
    datasource: DataSource,
    factoryManger: SeederFactoryManager,
  ): Promise<any> {
    // await new UserSeeder().run(datasource, factoryManger);
  }
}
