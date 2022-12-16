import { IsEmail, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {
  @ApiProperty({
    description: "User email",
    example: "testing@gmail.com"
  })
  @IsEmail()
  email: string

  @ApiProperty({
    description:
      "User password, this should a minimum of 8 characters with atleast one capital letter, one digit and one symbol",
    example: "w46BW52^"
  })
  @IsString()
  password: string
}
