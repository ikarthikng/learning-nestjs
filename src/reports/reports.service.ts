import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "../users/user.entity"
import { Repository } from "typeorm"
import { CreateReportDto } from "./dtos/create-report.dto"
import { Report } from "./report.entity"
import { GetEstimateDto } from "./dtos/get-estimate.dto"

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private reportRepo: Repository<Report>) {}

  create(body: CreateReportDto, user: User) {
    const report = this.reportRepo.create(body)
    report.user = user
    return this.reportRepo.save(report)
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.reportRepo.findOne({ where: { id: parseInt(id) } })
    if (!report) {
      throw new NotFoundException("report not found")
    }

    report.approved = approved
    return await this.reportRepo.save(report)
  }

  async getEstimate(query: GetEstimateDto) {
    return this.reportRepo
      .createQueryBuilder()
      .select("AVG(price)", "price")
      .where("make = :make", { make: query.make })
      .andWhere("model = :model", { model: query.model })
      .andWhere("lng - :lng BETWEEN -5 and 5", { lng: query.lng })
      .andWhere("lat - :lat BETWEEN -5 and 5", { lat: query.lat })
      .andWhere("year - :year BETWEEN -3 and 3", { year: query.year })
      .andWhere("approved IS TRUE")
      .orderBy("ABS(mileage - :mileage)", "DESC")
      .setParameters({ mileage: query.mileage })
      .limit(3)
      .getRawOne()
  }
}
