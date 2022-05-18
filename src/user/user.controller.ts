import {
  Body,
  Controller,
  Post,
  Get,
  UsePipes,
  UseGuards,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UserResponseInterface } from './types/userResponse.interface';
import { LoginUserDto } from './dto/login.dto';
import {UserEntity} from "./user.entity";
import { User } from './decorators/user.decoratot';
import { AuthGuard } from './guards/auth.guard';
import { UpdateUserDto } from './dto/updateUser.dto';
import { BackendValidationPipe } from 'src/shared/pipes/backendValidation.pipe';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  @UsePipes(new BackendValidationPipe())
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserEntity> {
    const user = await this.userService.createUser(createUserDto);
    return user;
  }

  @Post('login')
  @UsePipes(new BackendValidationPipe())
  async login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.login(loginUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Get('user')
  @UseGuards(AuthGuard)
  async currentUser(
    @User() user: UserEntity,
    ): Promise<UserResponseInterface> {
    return this.userService.buildUserResponse(user)
  }

  @Put('user')
  @UseGuards(AuthGuard)
  async updateCurrentUser(
   @User('id') currentUserId: number,
   @Body('user') UpdateUserDto: UpdateUserDto,
  ): Promise<UserResponseInterface> {
     const user = await this.userService.updateUser(currentUserId, UpdateUserDto);
     return this.userService.buildUserResponse(user);
  }
}
