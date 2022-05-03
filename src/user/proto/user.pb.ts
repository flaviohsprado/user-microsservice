/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import * as Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';
import { Timestamp } from './google/protobuf/timestamp.pb';

export const protobufPackage = 'user';

export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  createdAt: Timestamp | undefined;
  updatedAt: Timestamp | undefined;
  emailVerified: boolean;
  phoneVerified: boolean;
  accessToken: string;
  file: File | undefined;
  role: Role | undefined;
}

export interface UserBody {
  username: string;
  password: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  roleId: string;
}

export interface File {
  id: string;
  originalName: string;
  ownerId: string;
  ownerType: string;
  key: string;
  url: string;
  data: number | undefined;
}

export interface FileBody {
  id: string;
  ownerId: string;
  ownerType: string;
  fieldname: string;
  originalName: string;
  encoding: string;
  mimetype: string;
  buffer: number | undefined;
  key: string;
  url: string;
}

export interface Role {
  id: string;
  name: string;
  permissions: string;
}

export interface FindOneRequest {
  id: string;
}

export interface FindOneResponse {
  user: User | undefined;
}

export interface FindAllRequest {}

export interface FindAllResponse {
  user: User[];
}

export interface CreateRequest {
  user: UserBody | undefined;
  file: FileBody | undefined;
}

export interface CreateResponse {
  user: User | undefined;
}

export interface UpdateRequest {
  user: UserBody | undefined;
  file: FileBody | undefined;
}

export interface UpdateResponse {
  user: User | undefined;
}

export interface DeleteRequest {
  id: string;
}

export interface DeleteResponse {
  success: boolean;
}

export const USER_PACKAGE_NAME = 'user';

export interface UserServiceClient {
  findOne(request: FindOneRequest): Observable<FindOneResponse>;

  findAll(request: FindAllRequest): Observable<FindAllResponse>;

  create(request: CreateRequest): Observable<CreateResponse>;

  update(request: UpdateRequest): Observable<UpdateResponse>;

  delete(request: DeleteRequest): Observable<DeleteResponse>;
}

export interface UserServiceController {
  findOne(
    request: FindOneRequest,
  ): Promise<FindOneResponse> | Observable<FindOneResponse> | FindOneResponse;

  findAll(
    request: FindAllRequest,
  ): Promise<FindAllResponse> | Observable<FindAllResponse> | FindAllResponse;

  create(
    request: CreateRequest,
  ): Promise<CreateResponse> | Observable<CreateResponse> | CreateResponse;

  update(
    request: UpdateRequest,
  ): Promise<UpdateResponse> | Observable<UpdateResponse> | UpdateResponse;

  delete(
    request: DeleteRequest,
  ): Promise<DeleteResponse> | Observable<DeleteResponse> | DeleteResponse;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'findOne',
      'findAll',
      'create',
      'update',
      'delete',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('UserService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('UserService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const USER_SERVICE_NAME = 'UserService';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
