import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOauthClientsTable1711088749358
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'oauth_clients',
        columns: [
          {
            name: 'id',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'secret',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'grant_type',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'redirect',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '250',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('oauth_clients');
  }
}
