import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsOptionalStringColumn } from './../../commons/decorators/column/isOptionalStringColumn.decorator';
import { User } from './user.entity';

@Entity()
export class File {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @IsOptionalStringColumn()
  public originalname?: string;

  @IsOptionalStringColumn()
  public ownerId: string;

  @IsOptionalStringColumn()
  public ownerType: string;

  @IsOptionalStringColumn()
  public key: string;

  @IsOptionalStringColumn()
  public url: string;

  @Column({ type: 'bytea', nullable: true })
  public buffer?: Uint8Array;

  @OneToMany(() => User, (User) => User.role)
  public users?: User[];
}
