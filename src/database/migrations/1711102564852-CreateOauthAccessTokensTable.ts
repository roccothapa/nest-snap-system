import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOauthAccessTokensTable1711102564852
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'oauth_access_tokens',
        columns: [
          {
            name: 'access_token',
            type: 'text',
          },
          {
            name: 'refresh_token',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'client_id',
            type: 'integer',
            unsigned: true,
          },
          {
            name: 'user_id',
            type: 'integer',
            unsigned: true,
          },
          {
            name: 'expires_at',
            type: 'datetime',
          },
          {
            name: 'revoked',
            type: 'boolean',
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
        foreignKeys: [
          {
            name: 'fk_oauth_access_tokens_user_id',
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'restrict',
            onUpdate: 'cascade',
          },
          {
            name: 'fk_oauth_access_tokens_client_id',
            columnNames: ['client_id'],
            referencedTableName: 'oauth_clients',
            referencedColumnNames: ['id'],
            onDelete: 'restrict',
            onUpdate: 'cascade',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('oauth_clients');
  }
}
