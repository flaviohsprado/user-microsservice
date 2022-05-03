import { PartialType } from '@nestjs/swagger';
import { File } from '../entities/file.entity';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';
import { IsRequiredString } from './../../commons/decorators/validation/isRequiredString.decorator';

export class UpdateUserDto extends PartialType(User) {
  @IsRequiredString()
  public id: string;

  public file?: File;
  public role?: Role;
}
