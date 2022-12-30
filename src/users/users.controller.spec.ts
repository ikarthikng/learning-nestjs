import { Test, TestingModule } from "@nestjs/testing"
import { UsersController } from "./users.controller"
import { UsersService } from "./users.service"
import { AuthService } from "../auth/auth.service"
import { User } from "./user.entity"

describe("UsersController", () => {
  let controller: UsersController
  let fakeUsersService: Partial<UsersService>
  let fakeAuthService: Partial<AuthService>

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({ id, email: "testing@gmail.com", password: "ajdsaldfas" } as User)
      },
      find: (email: string) => {
        return Promise.resolve([{ id: 4, email, password: "adfadskf" } as User])
      },
      remove: (id: number) => {
        return Promise.resolve({ id, email: "testing@gmail.com", password: "ajdsaldfas" } as User)
      },
      update: (id: number, attrs: Partial<User>) => {
        return Promise.resolve({ id, email: "test@gmail.com", password: "ajdsaldfas" } as User)
      }
    }

    fakeAuthService = {
      signUp: (email: string, password: string) => {
        return Promise.resolve({ id: 10, email, password } as User)
      },
      authenticateEmailandPassword: (email: string, password: string) => {
        return Promise.resolve({ id: 10, email, password } as User)
      }
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService
        },
        {
          provide: AuthService,
          useValue: fakeAuthService
        }
      ]
    }).compile()

    controller = module.get<UsersController>(UsersController)
  })

  it("should be defined", () => {
    expect(controller).toBeDefined()
  })

  it("testing find all users", async () => {
    const user = await controller.findAllUsers("testing@gmail.com")
    expect(user.length).toEqual(1)
    expect(user).toBeDefined()
  })

  it("testing findUser returns a single user with the given id", async () => {
    const user = await controller.findUser("1")
    expect(user.id).toEqual(1)
    expect(user).toBeDefined
  })

  it("findUser throws an error if user with given id is not found", (done) => {
    fakeUsersService.findOne = () => null

    controller
      .findUser("1")
      .then((result) => {
        console.log(result)
      })
      .catch(() => {
        done()
      })
  })

  it("signin updates session object and returns user", async () => {
    const session = { userId: 0 }
    const user = await controller.signin({ email: "testing@gmail.com", password: "adjlkasdf" }, session)
    expect(user.id).toEqual(10)
    expect(session.userId).toEqual(10)
  })
})
