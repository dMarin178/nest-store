import { ApiProperty, PartialType, OmitType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdateCategoryDto extends PartialType(
  OmitType(CreateCategoryDto, ['name'])
) {}
