/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import * as Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';

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
  createdAt: string;
  updatedAt: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  accessToken: string;
  file?: File | undefined;
  fileId?: string | undefined;
  role?: Role | undefined;
  roleId?: string | undefined;
}

export interface UserBody {
  username: string;
  password: string;
  email: string;
  dateOfBirth?: string | undefined;
  phoneNumber?: string | undefined;
  address?: string | undefined;
  neighborhood?: string | undefined;
  city?: string | undefined;
  state?: string | undefined;
  country?: string | undefined;
  zipCode?: string | undefined;
  roleId?: string | undefined;
}

export interface File {
  id: string;
  originalName?: string | undefined;
  ownerId: string;
  ownerType: string;
  key: string;
  url: string;
  data?: Uint8Array | undefined;
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
  status: number;
  message: string;
  data: User | undefined;
}

export interface FindAllRequest {}

export interface FindAllResponse {
  status: number;
  message: string;
  data: User[];
}

export interface CreateRequest {
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

export interface CreateResponse {
  status: number;
  message: string;
  data: User | undefined;
}

export interface UpdateRequest {
  id: string;
  user: UserBody | undefined;
}

export interface UpdateResponse {
  status: number;
  message: string;
  data: User | undefined;
}

export interface DeleteRequest {
  id: string;
}

export interface DeleteResponse {
  status: number;
  message: string;
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
