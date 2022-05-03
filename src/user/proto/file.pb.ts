/* eslint-disable */
import * as Long from 'long';
import * as _m0 from 'protobufjs/minimal';

export const protobufPackage = 'file';

export interface File {
  id: string;
  originalName: string;
  ownerId: string;
  ownerType: string;
  key: string;
  url: string;
  data: number | undefined;
}

export const FILE_PACKAGE_NAME = 'file';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
