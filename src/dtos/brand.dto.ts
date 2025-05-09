import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateBrandDto {
  @IsString()
  name: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
