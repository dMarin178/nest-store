import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly description: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly price: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly stock: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  readonly image: string;
}

/* PartialTypes allow us to use the CreateProductDto and set the atributes to optional */
export class UpdateProductDto extends PartialType(CreateProductDto) {}
