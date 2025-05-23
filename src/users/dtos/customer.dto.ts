import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsPhoneNumber, IsString } from "class-validator";

export class CreateCustomerDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phone: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
