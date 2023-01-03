import { IsString, IsNumber, Min, Max, IsLongitude, IsLatitude } from "class-validator"
import { Transform } from "class-transformer"

export class GetEstimateDto {
  @IsString()
  make: string

  @IsString()
  model: string

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1950)
  @Max(2023)
  year: number

  @Transform(({ value }) => parseFloat(value))
  @IsLongitude()
  lng: number

  @Transform(({ value }) => parseFloat(value))
  @IsLatitude()
  lat: number

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  mileage: number
}
