import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
