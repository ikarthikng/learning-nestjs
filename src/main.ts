import { NestFactory } from "@nestjs/core"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import { AppModule } from "./app.module"
import * as basicAuth from "express-basic-auth"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  if (process.env.NODE_ENV === "development") {
    app.use(
      ["/docs", "/docs-json"],
      basicAuth({
        challenge: true,
        users: {
          [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD
        }
      })
    )

    const config = new DocumentBuilder()
      .setTitle("Learning NestJS")
      .setDescription(
        "Build full featured backend APIs incredibly quickly with Nest, TypeORM, and Typescript. Includes testing and deployment!"
      )
      .setVersion("2022.12.15")
      .addTag("Users", "All endpoints related to users")
      .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup("docs", app, document, {
      customSiteTitle: "Learning NestJS"
    })
  }

  await app.listen(3000)
}
bootstrap()
