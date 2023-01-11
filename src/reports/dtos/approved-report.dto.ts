import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean } from "class-validator"

export class ApprovedReportDto {
  @IsBoolean()
  @ApiProperty({
    description: "Indicates whether report was approved or not",
    example: true
  })
  approved: boolean
}
