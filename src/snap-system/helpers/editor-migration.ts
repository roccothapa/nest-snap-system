export const editorColumns = [
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
  { name: 'deleted_at', type: 'datetime', isNullable: true },
  {
    name: 'created_by',
    type: 'integer',
    unsigned: true,
    isNullable: true,
  },
  {
    name: 'updated_by',
    type: 'integer',
    unsigned: true,
    isNullable: true,
  },
  {
    name: 'deleted_by',
    type: 'integer',
    unsigned: true,
    isNullable: true,
  },
];

export const editorForeignKeys = [
  {
    columnNames: ['created_by'],
    referencedTableName: 'users',
    referencedColumnNames: ['id'],
    onDelete: 'restrict',
    onUpdate: 'cascade',
  },
  {
    columnNames: ['updated_by'],
    referencedTableName: 'users',
    referencedColumnNames: ['id'],
    onDelete: 'restrict',
    onUpdate: 'cascade',
  },
  {
    columnNames: ['deleted_by'],
    referencedTableName: 'users',
    referencedColumnNames: ['id'],
    onDelete: 'restrict',
    onUpdate: 'cascade',
  },
];
