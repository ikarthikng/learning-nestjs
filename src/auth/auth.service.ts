import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common"
import { UsersService } from "../users/users.service"
import { randomBytes, scrypt as _scrypt } from "crypto"
import { promisify } from "util"
import { User } from "src/users/user.entity"

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp(email: string, password: string): Promise<User> {
    //check if email is in use
    const users = await this.usersService.find(email)
    if (users && users.length > 0) {
      throw new BadRequestException("Email is already in use")
    }

    //hash the users password
    //generate a salt
    const salt = randomBytes(8).toString("hex")

    //hash the salt and password together
    const hash = (await scrypt(password, salt, 32)) as Buffer

    //join the hashed result and the salt together
    const result = `${salt}.${hash.toString("hex")}`

    //create a new user and save it
    const user = await this.usersService.create(email, result)

    //return the user
    return user
  }

  async authenticateEmailandPassword(email: string, password: string) {
    const [user] = await this.usersService.find(email)
    if (!user) {
      throw new NotFoundException("user not found")
    }

    const [salt, storedHash] = user.password.split(".")

    // compare the hash with the given password
    const hash = (await scrypt(password, salt, 32)) as Buffer

    if (storedHash !== hash.toString("hex")) {
      throw new BadRequestException("password is incorrect")
    }
    return user
  }
}
