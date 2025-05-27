import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

export class CreateBrandDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdateBrandDto extends PartialType(
  OmitType(CreateBrandDto, ['name'])
) {}
