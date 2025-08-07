import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Prisma, User } from '@prisma/client';
import { Request } from 'express';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createRecipe(
    @Body() createRecipeDto: Prisma.RecipeCreateInput,
    @Req() req: Request,
  ) {
    const user = req.user as User;
    return this.recipeService.createRecipe(createRecipeDto, user.id);
  }

  @Get()
  findAllRecipes() {
    return this.recipeService.findAllRecipes();
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findRecipeByUserId(@Req() req: Request) {
    const user = req.user as User;
    return this.recipeService.findRecipeByUserId(user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findRecipe(@Param('id') id: string) {
    return this.recipeService.findRecipeById(Number(id));
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  updateRecipe(
    @Param('id') id: string,
    @Body() data: Prisma.RecipeUpdateInput,
    @Req() req: Request,
  ) {
    const user = req.user as User;
    return this.recipeService.updateRecipe(Number(id), user.id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteRecipe(@Param('id') id: string) {
    return this.recipeService.deleteRecipe(Number(id));
  }
}
