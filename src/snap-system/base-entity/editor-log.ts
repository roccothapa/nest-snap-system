import {
  BaseEntity,
  BeforeInsert,
  BeforeSoftRemove,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  TableInheritance,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@TableInheritance()
export abstract class EditorLog extends BaseEntity {
  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true, select: false })
  public deletedAt: Date;

  @Column({ name: 'created_by', nullable: true, select: false })
  public createdBy: number;

  @Column({ name: 'updated_by', nullable: true, select: false })
  public updatedBy: number;

  @Column({ name: 'deleted_by', nullable: true, select: false })
  public deletedBy: number;

  @BeforeInsert()
  onCreateInsertEditorDates() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  onUpdateEditorDates() {
    this.updatedAt = new Date();
  }
}
