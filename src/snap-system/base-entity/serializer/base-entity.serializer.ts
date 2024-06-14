import { Exclude } from 'class-transformer';

export class BaseEntitySerializer {
  public id: number;

  public createdAt: Date;

  public updatedAt: Date;

  @Exclude({ toPlainOnly: true })
  public deletedAt: Date;

  @Exclude({ toPlainOnly: true })
  public createdBy: number;

  @Exclude({ toPlainOnly: true })
  public updatedBy: number;

  @Exclude({ toPlainOnly: true })
  public deletedBy: number;

  [key: string]: any;
}
