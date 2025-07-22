import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
  constructor(private db: DatabaseService) {}

  async createUser(data: Prisma.UserCreateInput) {
    return this.db.user.create({ data });
  }

  async findAll() {
    return this.db.user.findMany();
  }

  async findOne(email: string) {
    return this.db.user.findUnique({ where: { email } });
  }
}
