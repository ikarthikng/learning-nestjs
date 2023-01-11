import { ApiProperty } from "@nestjs/swagger"
import { Expose, Transform } from "class-transformer"

export class ReportDto {
  @Expose()
  @ApiProperty({
    description: "Id in the database table",
    example: 1
  })
  id: number

  @Expose()
  @ApiProperty({
    description: "Price of the car",
    example: 25000
  })
  price: number

  @Expose()
  @ApiProperty({
    description: "Make of the car",
    example: "Ford"
  })
  make: string

  @Expose()
  @ApiProperty({
    description: "Model of the car",
    example: "F150"
  })
  model: string

  @Expose()
  @ApiProperty({
    description: "Year the car was made",
    example: 2021
  })
  year: number

  @Expose()
  @ApiProperty({
    description: "Longtitude where the car was brought/available",
    example: 45.12
  })
  lng: number

  @Expose()
  @ApiProperty({
    description: "Latitude where the car was brought/available",
    example: 32.65
  })
  lat: number

  @Expose()
  @ApiProperty({
    description: "Mileage of the car",
    example: 15000
  })
  mileage: number

  @Expose()
  @ApiProperty({
    description: "Car is approved for report or not",
    example: false
  })
  approved: boolean

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  @ApiProperty({
    description: "UserId of the user who approved the report",
    example: 5
  })
  userId: number
}
