import {
  Body,
  Controller,
  Param,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { IAuthRequest } from './../interfaces/authRequest.interface';
import { CreateUserDto } from './dto/createUser.dto';
import { FileDto } from './dto/file.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './entities/user.entity';
import { USER_SERVICE_NAME } from './proto/user.pb';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @GrpcMethod(USER_SERVICE_NAME, 'findOne')
  private async findOne(@Req() request: IAuthRequest): Promise<User> {
    return await this.service.findOne(request.user.id);
  }

  @GrpcMethod(USER_SERVICE_NAME, 'findAll')
  private async findAll(): Promise<User[]> {
    return await this.service.findAll();
  }

  @GrpcMethod(USER_SERVICE_NAME, 'create')
  @UseInterceptors(FileInterceptor('file'))
  private async create(
    @UploadedFiles() file: FileDto,
    @Body() user: CreateUserDto,
  ) {
    user = await user.encryptPassword();
    return await this.service.create(user, file);
  }

  @GrpcMethod(USER_SERVICE_NAME, 'update')
  @UseInterceptors(FileInterceptor('file'))
  private async update(
    @Param('id') id: string,
    @UploadedFile() file: FileDto,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    user = new UpdateUserDto(user, id);
    return await this.service.update(id, user, file);
  }

  @GrpcMethod(USER_SERVICE_NAME, 'delete')
  private async delete(@Param('id') id: string): Promise<void> {
    await this.service.destroy(id);
  }
}
