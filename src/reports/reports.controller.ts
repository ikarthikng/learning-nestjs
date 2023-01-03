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

@Controller("reports")
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user)
  }

  @Patch("/:id")
  @UseGuards(AdminGuard)
  async approvedReport(@Param("id") id: string, @Body() body: ApprovedReportDto) {
    return await this.reportsService.changeApproval(id, body.approved)
  }

  @Get()
  getEstimate(@Query() query: GetEstimateDto) {
    return this.reportsService.getEstimate(query)
  }
}
