import { Injectable } from '@nestjs/common';
import { Prisma, Recipe } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class RecipeService {
  constructor(private databaseService: DatabaseService) {}

  async findAllRecipes(): Promise<Recipe[]> {
    return this.databaseService.recipe.findMany();
  }

  async findRecipeById(id: number): Promise<Recipe | null> {
    return this.databaseService.recipe.findUnique({ where: { id } });
  }

  async findRecipeByUserId(authorId: number): Promise<Recipe[]> {
    return this.databaseService.recipe.findMany({ where: { authorId } });
  }

  async createRecipe(
    data: Omit<Prisma.RecipeCreateInput, 'author'>,
    userId: number,
  ): Promise<Recipe> {
    return this.databaseService.recipe.create({
      data: {
        ...data,
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async updateRecipe(
    id: number,
    data: Prisma.RecipeUpdateInput,
  ): Promise<Recipe> {
    return this.databaseService.recipe.update({ where: { id }, data });
  }

  async deleteRecipe(id: number): Promise<Recipe> {
    return this.databaseService.recipe.delete({ where: { id } });
  }
}
