import { DataSource } from "typeorm"
/**
 * https://github.com/typeorm/typeorm/issues/8810#issuecomment-1082299404
 */

var dbConfig = {
  synchronize: false,
  migrations: ["migrations/*.js"],
  cli: {
    migrationsDir: "migrations"
  }
}

switch (process.env.NODE_ENV) {
  case "development":
    Object.assign(dbConfig, {
      type: "sqlite",
      database: "db.sqlite",
      entities: ["**/*.entity.js"]
    })
    break
  case "test":
    Object.assign(dbConfig, {
      type: "sqlite",
      database: "test.sqlite",
      entities: ["**/*.entity.ts"],
      migrationsRun: true
    })
    break
  case "production":
    Object.assign(dbConfig, {
      type: "sqlite",
      url: process.env.DATABASE_URL,
      database: "db.sqlite",
      entities: ["**/*.entity.js"],
      migrationsRun: true,
      ssl: {
        rejectUnauthorized: false
      }
    })
    break
  default:
    throw new Error("unknown environment")
}

// @ts-ignore
export default new DataSource(dbConfig)
