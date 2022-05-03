import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { CountryCode } from './../../../../node_modules/libphonenumber-js/types.d';

export const IsPhoneNumberCustom = (
  region?: CountryCode,
  options?: ApiPropertyOptions,
) => {
  return applyDecorators(
    IsOptional(),
    IsString(),
    IsPhoneNumber(region),
    ApiProperty({ ...options }),
  );
};
