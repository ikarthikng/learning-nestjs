import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNumber, Min, Max, IsLongitude, IsLatitude } from "class-validator"

export class CreateReportDto {
  @IsNumber()
  @Min(0)
  @Max(1000000)
  @ApiProperty({
    description: "Price of the car",
    example: "27000"
  })
  price: number

  @IsString()
  @ApiProperty({
    description: "Make of the car",
    example: "Ford"
  })
  make: string

  @IsString()
  @ApiProperty({
    description: "Model of the car",
    example: "F150"
  })
  model: string

  @IsNumber()
  @Min(1950)
  @Max(2023)
  @ApiProperty({
    description: "Year the car was made",
    example: "2021",
    maximum: 2023,
    minimum: 1950
  })
  year: number

  @IsLongitude()
  @ApiProperty({
    description: "Longitude where car was brought/available",
    example: "45.15"
  })
  lng: number

  @IsLatitude()
  @ApiProperty({
    description: "Latitude where car was brought/available",
    example: "32.16"
  })
  lat: number

  @IsNumber()
  @ApiProperty({
    description: "Mileage of the car",
    example: "10000"
  })
  mileage: number
}
