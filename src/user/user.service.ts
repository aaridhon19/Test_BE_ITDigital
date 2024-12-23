import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LoginUserDto } from './dto/login.user.dto';
import { CreateUserDto } from './dto/create.user.dto';
import { RegisterUserDto } from './dto/register.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UserService {
  private readonly prisma = new PrismaClient();

  async findAll(role?: string) {
    return this.prisma.user.findMany({
      where: role
        ? { role: role as 'admin' | 'customer' | 'seller' }
        : undefined,
    });
  }

  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }

  async register(registerUserDto: RegisterUserDto) {
    return this.prisma.user.create({ data: registerUserDto });
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginUserDto.email },
    });
    if (!user || user.password !== loginUserDto.password) {
      throw new NotFoundException('Invalid email or password');
    }
    return { accessToken: 'fake-token', refreshToken: 'fake-refresh-token' };
  }

  async findOne(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: updateUserDto,
    });
  }

  async remove(userId: string) {
    return this.prisma.user.delete({ where: { id: userId } });
  }
}
