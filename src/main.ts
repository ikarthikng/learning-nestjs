import { NestFactory } from "@nestjs/core"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle("Learning NestJS")
    .setDescription(
      "Build full featured backend APIs incredibly quickly with Nest, TypeORM, and Typescript. Includes testing and deployment!"
    )
    .setVersion("2022.12.15")
    .addTag("Users", "All endpoints related to users")
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("documentation", app, document)

  await app.listen(3000)
}
bootstrap()
