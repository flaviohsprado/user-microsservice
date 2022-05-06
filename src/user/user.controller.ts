import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import {
  CreateRequest,
  CreateResponse,
  DeleteRequest,
  DeleteResponse,
  FindAllResponse,
  FindOneRequest,
  FindOneResponse,
  UpdateRequest,
  UpdateResponse,
  USER_SERVICE_NAME,
} from './proto/user.pb';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @GrpcMethod(USER_SERVICE_NAME, 'findOne')
  private async findOne(payload: FindOneRequest): Promise<FindOneResponse> {
    return await this.service.findOne(payload.id);
  }

  @GrpcMethod(USER_SERVICE_NAME, 'findAll')
  private async findAll(): Promise<FindAllResponse> {
    return await this.service.findAll();
  }

  @GrpcMethod(USER_SERVICE_NAME, 'create')
  //@UseInterceptors(FileInterceptor('file'))
  private async create(data: CreateRequest): Promise<CreateResponse> {
    const user = await new CreateUserDto(data).encryptPassword();
    return await this.service.create(user, undefined);
  }

  @GrpcMethod(USER_SERVICE_NAME, 'update')
  //@UseInterceptors(FileInterceptor('file'))
  private async update(payload: UpdateRequest): Promise<UpdateResponse> {
    const user: UpdateUserDto = new UpdateUserDto(payload.user, payload.id);

    console.log('user: ', user);

    return await this.service.update(payload.id, user, undefined);
  }

  @GrpcMethod(USER_SERVICE_NAME, 'delete')
  private async delete(payload: DeleteRequest): Promise<DeleteResponse> {
    return await this.service.destroy(payload.id);
  }
}
