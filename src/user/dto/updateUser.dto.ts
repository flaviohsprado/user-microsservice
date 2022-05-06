import { CreateUserDto } from './createUser.dto';

export class UpdateUserDto extends CreateUserDto {
  constructor(props: UpdateUserDto, id: string) {
    super(props, id);

    Object.assign(this, props);

    if (this.password) this.encryptPassword();

    this.id = id;
  }
}
