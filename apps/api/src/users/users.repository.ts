import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@libs/prisma';
import { CreateUserDto } from '@/apps/api/src/users/dto/create-user.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  findByEmailOrLogin(email: string, login:string) {
    return this.prisma.user.findFirst({  where: { OR: [{ email }, { login }] } });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async createUser(data: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findFirst({
      where: { id },
    });
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   let data = {
  //     ...updateUserDto,
  //   };
  //
  //
  //   return this.prisma.user.update({
  //     where: {
  //       id,
  //     },
  //     data,
  //   });
  // }

  remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
