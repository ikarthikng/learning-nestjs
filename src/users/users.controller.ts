import { Controller, Post, Body, Get, Param, Query, Delete, Patch, NotFoundException } from "@nestjs/common"
import { ApiResponse, ApiTags, ApiBody } from "@nestjs/swagger"
import { CreateUserDto } from "./dtos/create-user.dto"
import { UpdateUserDto } from "./dtos/update-user.dto"
import { UsersService } from "./users.service"
import { Serialize } from "../interceptors/serialize.interceptor"
import { UserDto } from "./dtos/user.dto"
import { AuthService } from "../auth/auth.service"

@Controller("auth")
@Serialize(UserDto)
@ApiTags("Users")
export class UsersController {
  constructor(private usersService: UsersService, private authService: AuthService) {}
  @Post("/signup")
  @ApiBody({ description: "This is used to create a user", type: CreateUserDto })
  @ApiResponse({ status: 201, description: "The record has been successfully created." })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @ApiResponse({ status: 500, description: "Fatal error." })
  createUser(@Body() body: CreateUserDto) {
    this.authService.signUp(body.email, body.password)
  }

  @Post("/signin")
  signin(@Body() body: CreateUserDto) {
    return this.authService.authenticateEmailandPassword(body.email, body.password)
  }

  @Get("/:id")
  async findUser(@Param("id") id: string) {
    const user = await this.usersService.findOne(parseInt(id))
    if (!user) {
      throw new NotFoundException("user not found")
    }
    return user
  }

  @Get()
  findAllUsers(@Query("email") email: string) {
    return this.usersService.find(email)
  }

  @Delete("/:id")
  removeUser(@Param("id") id: string) {
    return this.usersService.remove(parseInt(id))
  }

  @Patch("/:id")
  updateUser(@Param("id") id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body)
  }
}
