import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class RecipeService {
  constructor(private db: DatabaseService) {}

  async createRecipe(data: Prisma.RecipeCreateInput, userId: number) {
    return this.db.recipe.create({
      data: {
        ...data,
        user: { connect: { id: userId } },
      },
    });
  }

  async findAll() {
    return this.db.recipe.findMany();
  }

  async updateRating(recipeId: number, rating: number) {
    return this.db.recipe.update({
      where: { id: recipeId },
      data: { rating },
    });
  }

  async deleteRecipe(id: number) {
    const recipe = await this.db.recipe.findUnique({ where: { id } });
    if (!recipe) {
      throw new NotFoundException('Recipe with this Id not found');
    }

    return this.db.recipe.delete({
      where: { id },
    });
  }
}
