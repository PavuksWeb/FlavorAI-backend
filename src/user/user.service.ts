import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private databaseService: DatabaseService,
    private readonly config: ConfigService,
  ) {}

  async findAllUsers(): Promise<User[]> {
    return this.databaseService.user.findMany();
  }

  async findUserById(id: number): Promise<User | null> {
    return this.databaseService.user.findUnique({ where: { id } });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const rounds = Number(this.config.get('ROUNDS_OF_HASHING'));
    const hashedPassword = await bcrypt.hash(data.password, rounds);

    data.password = hashedPassword;

    return this.databaseService.user.create({
      data,
    });
  }

  async updateUser(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    const updatedData: Prisma.UserUpdateInput = { ...data };
    const rounds = Number(this.config.get('ROUNDS_OF_HASHING'));

    if (data.password && typeof data.password === 'string') {
      updatedData.password = await bcrypt.hash(data.password, rounds);
    }

    return this.databaseService.user.update({
      where: { id },
      data: updatedData,
    });
  }

  async deleteUser(id: number): Promise<User> {
    return this.databaseService.user.delete({ where: { id } });
  }
}
