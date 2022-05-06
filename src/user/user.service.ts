import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import StandardGrpcError from 'src/utils/grpcError.utils';
import { Repository } from 'typeorm';
import StandardError from '../utils/error.utils';
import { CreateUserDto } from './dto/createUser.dto';
import { FileDto } from './dto/file.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './entities/user.entity';
import {
  CreateResponse,
  DeleteResponse,
  FindAllResponse,
  FindOneResponse,
  UpdateResponse,
} from './proto/user.pb';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    //private readonly fileRepository: FileService,
    private readonly jwtService: JwtService,
  ) {}

  public async findOne(id: string): Promise<FindOneResponse> {
    const user = await this.repository.findOne({
      where: { id },
      relations: ['role', 'file'],
    });

    user.accessToken = this.jwtService.sign({
      id,
      username: user.username,
      role: user.role ? user.role.permissions : '',
    });

    return {
      status: HttpStatus.OK,
      message: 'User found successfully',
      data: user,
    };
  }

  public async findAll(): Promise<FindAllResponse> {
    const users = await this.repository.find({
      relations: ['role', 'file'],
    });

    return {
      status: HttpStatus.OK,
      message: 'Users found successfully',
      data: users,
    };
  }

  public async findByKey(key: string, value: string): Promise<User> {
    const user = await this.repository.findOne({
      where: { [key]: value },
      relations: ['role', 'file'],
    });

    if (!user) throw new StandardError(404, 'User not found');

    return user;
  }

  public async create(
    user: CreateUserDto,
    file: FileDto,
  ): Promise<CreateResponse> {
    console.log('init');
    await this.alreadyExists('email', user.email);

    /*if (file)
      user.file = await this.fileRepository.create(
        file,
        user.id,
        OwnerType.USER,
      );*/
    console.log('passed email');

    const createdUser = await this.repository.save(user);

    createdUser.accessToken = this.jwtService.sign({
      id: user.id,
      username: user.username,
      role: user.role ? user.role.permissions : '',
    });

    return {
      status: HttpStatus.CREATED,
      message: 'User created successfully',
      data: createdUser,
    };
  }

  public async update(
    id: string,
    user: UpdateUserDto,
    file: FileDto,
  ): Promise<UpdateResponse> {
    await this.alreadyExists('email', user.email, id);

    /*if (file)
      user.file = await this.fileRepository.update(
        file,
        user.id,
        OwnerType.USER,
      );*/

    await this.repository.save({ ...user, id });

    return this.findOne(id);
  }

  public async updateField(id: string, key: string, value: any): Promise<void> {
    await this.repository.update(id, { [key]: value });
  }

  public async destroy(id: string): Promise<DeleteResponse> {
    //await this.fileRepository.destroy(id);
    await this.repository.delete(id);

    return {
      status: HttpStatus.OK,
      message: 'User deleted successfully',
    };
  }

  private async alreadyExists(
    key: string,
    value: string,
    id?: string,
  ): Promise<void> {
    const alreadyExists = await this.repository.findOne({
      where: { [key]: value },
    });

    if (alreadyExists && alreadyExists.id !== id) {
      throw new StandardGrpcError(409, `${key} already exists`);
    }
  }
}
