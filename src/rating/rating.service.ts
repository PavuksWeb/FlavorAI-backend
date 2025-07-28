import { BadRequestException, Injectable } from '@nestjs/common';
import { Rating } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class RatingService {
  constructor(private databaseService: DatabaseService) {}

  async addRating(
    recipeId: number,
    userId: number,
    value: number,
  ): Promise<Rating> {
    if (value < 1 || value > 5) {
      throw new BadRequestException('Rating must be between 1 and 5');
    }

    return this.databaseService.rating.upsert({
      where: {
        userId_recipeId: { userId, recipeId },
      },
      create: {
        value,
        user: { connect: { id: userId } },
        recipe: { connect: { id: recipeId } },
      },
      update: {
        value,
      },
    });
  }

  async getAverageRating(recipeId: number): Promise<number> {
    const ratings: { value: number }[] =
      await this.databaseService.rating.findMany({
        where: { recipeId },
        select: { value: true },
      });

    const total = ratings.reduce((sum: number, red) => sum + red.value, 0);

    return ratings.length ? total / ratings.length : 0;
  }

  async deleteRating(userId: number, recipeId: number) {
    await this.databaseService.rating.delete({
      where: {
        userId_recipeId: {
          userId,
          recipeId,
        },
      },
    });
  }
}
