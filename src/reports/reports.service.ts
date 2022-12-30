import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "../users/user.entity"
import { Repository } from "typeorm"
import { CreateReportDto } from "./dtos/create-report.dto"
import { Report } from "./report.entity"

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private reportRepo: Repository<Report>) {}

  create(body: CreateReportDto, user: User) {
    const report = this.reportRepo.create(body)
    report.user = user
    return this.reportRepo.save(report)
  }
}
