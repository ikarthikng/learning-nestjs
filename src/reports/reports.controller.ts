import { Controller, Post, Body, UseGuards, Patch, Param, Get, Query } from "@nestjs/common"
import { AuthGuard } from "../guards/auth.guard"
import { CreateReportDto } from "./dtos/create-report.dto"
import { ReportsService } from "./reports.service"
import { CurrentUser } from "../users/decorators/current-user.decorator"
import { User } from "../users/user.entity"
import { ReportDto } from "./dtos/report.dto"
import { Serialize } from "../interceptors/serialize.interceptor"
import { ApprovedReportDto } from "./dtos/approved-report.dto"
import { AdminGuard } from "../guards/admin.guard"
import { GetEstimateDto } from "./dtos/get-estimate.dto"
import { ApiBody, ApiParam, ApiProperty, ApiResponse, ApiTags } from "@nestjs/swagger"
import { Report } from "./report.entity"

@Controller("reports")
@ApiTags("Reports")
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  @ApiBody({ description: "This is used to create a report", type: CreateReportDto })
  @ApiResponse({ status: 201, description: "The report has been successfully created." })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @ApiResponse({ status: 500, description: "Fatal error." })
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user)
  }

  @Patch("/:id")
  @UseGuards(AdminGuard)
  @ApiParam({ description: "Id of the report which needs to be patched/updated", name: "id" })
  @ApiBody({ description: "This is used to patch/update the report for approval", type: ApprovedReportDto })
  @ApiResponse({ status: 200, description: "The report has been successfully created.", type: ReportDto })
  @ApiResponse({ status: 403, description: "Forbidden. Need admin privileges to do so" })
  @ApiResponse({ status: 500, description: "Fatal error." })
  async approvedReport(@Param("id") id: string, @Body() body: ApprovedReportDto) {
    return await this.reportsService.changeApproval(id, body.approved)
  }

  @Get()
  @ApiResponse({ status: 200, description: "To get the estimate of the report" })
  getEstimate(@Query() query: GetEstimateDto) {
    return this.reportsService.getEstimate(query)
  }
}
