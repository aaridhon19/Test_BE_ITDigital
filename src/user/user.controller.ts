import {
  Controller,
  Body,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
  Query,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from './auth/jwt.auth.guard';
import { CreateUserDto } from './dto/create.user.dto';
import { RegisterUserDto } from './dto/register.user.dto';
import { LoginUserDto } from './dto/login.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query('role') role: string) {
    return this.userService.findAll(role);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.register(registerUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @Get(':user_id')
  findOne(@Param('user_id') userId: string) {
    return this.userService.findOne(userId);
  }

  @Put(':user_id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('user_id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(userId, updateUserDto);
  }

  @Delete(':user_id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('user_id') userId: string) {
    return this.userService.remove(userId);
  }
}
