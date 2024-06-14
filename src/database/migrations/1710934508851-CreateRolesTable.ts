import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import {
  editorColumns,
  editorForeignKeys,
} from '../../snap-system/helpers/editor-migration';

export class CreateRolesTable1710934508851 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'roles',
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
            name: 'name',
            type: 'varchar',
            length: '50',
          },
          ...editorColumns,
        ],
        foreignKeys: editorForeignKeys,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('roles');
  }
}
