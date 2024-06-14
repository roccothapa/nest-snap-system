import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import {
  editorColumns,
  editorForeignKeys,
} from '../../snap-system/helpers/editor-migration';

export class CreateUserTable1686824484359 implements MigrationInterface {
  name = 'CreateUserTable1686824484359';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
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
            name: 'first_name',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'middle_name',
            type: 'varchar',
            isNullable: true,
            length: '50',
          },
          {
            name: 'last_name',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'avatar',
            type: 'varchar',
            length: '250',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '250',
          },
          {
            name: 'password',
            type: 'varchar',
            length: '250',
          },
          {
            name: 'email_verify_at',
            type: 'datetime',
            isNullable: true,
          },
          {
            name: 'is_locked',
            type: 'boolean',
          },
          {
            name: 'status',
            type: 'tinyint',
          },
          ...editorColumns,
        ],
        foreignKeys: editorForeignKeys,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
