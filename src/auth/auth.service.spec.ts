import { Test } from "@nestjs/testing"
import { AuthService } from "./auth.service"
import { UsersService } from "../users/users.service"
import { User } from "../users/user.entity"
import { BadRequestException } from "@nestjs/common"

describe("AuthService", () => {
  let service: AuthService
  let fakeUsersService: Partial<UsersService>

  beforeEach(async () => {
    //create a fake copy of the users service
    fakeUsersService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) => Promise.resolve({ id: 1, email, password } as User)
    }

    const module = await Test.createTestingModule({
      providers: [AuthService, { provide: UsersService, useValue: fakeUsersService }]
    }).compile()

    service = module.get(AuthService)
  })

  it("can create an instance of auth service", async () => {
    expect(service).toBeDefined()
  })

  it("creates a new user with a salted and hashed password", async () => {
    const user = await service.signUp("testing.852@gmail.com", "adlfjajsdfadf")
    expect(user.password).not.toEqual("adlfjajsdfadf")
    const [salt, hash] = user.password.split(".")
    expect(salt).toBeDefined()
    expect(hash).toBeDefined()
  })

  it("get a bad request error when user exists", async () => {
    fakeUsersService.find = () => Promise.resolve([{ id: 1, email: "a", password: "1" } as User])
    await expect(service.signUp("asdf@asdf.com", "asdf")).rejects.toThrow(BadRequestException)
  })

  it("get signin", async () => {
    fakeUsersService.find = () =>
      Promise.resolve([
        {
          id: 4,
          email: "testing.952@gmail.com",
          password: "44a59fee7702ef17.89bd7ef091c7ca5b2d41efc52b15b10dbc3ac94325c0aa0930c04142e466f30e"
        } as User
      ])
    const user = await service.authenticateEmailandPassword("testing.952@gmail.com", "aldfjasjkldfjsaaa")
    expect(user).toBeDefined()
    expect(user.password).not.toEqual("aldfjasjkldfjsaaa")
    const [salt, hash] = user.password.split(".")
    expect(salt).toBeDefined()
    expect(hash).toBeDefined()
  })

  it("get signin throws bad request with invalid password", async () => {
    fakeUsersService.find = () => Promise.resolve([{ id: 1, email: "asdf@test.com", password: "adfadfad" } as User])
    await expect(service.authenticateEmailandPassword("asdf@asdf.com", "asdf")).rejects.toThrow(BadRequestException)
  })
})
