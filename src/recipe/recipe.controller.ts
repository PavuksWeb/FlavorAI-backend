import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  // Post,
  Request,
  // UseGuards,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
// import { Prisma } from 'generated/prisma';
import { RatingValidationPipe } from './pipes/ratingValidationPipe';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  findAll() {
    return this.recipeService.findAll();
  }

  // @Post()
  // create(@Body() createRecipeDto: Prisma.RecipeCreateInput, @Request() req) {
  //   // const userId = req.user.id;
  //   return this.recipeService.createRecipe(createRecipeDto, userId);
  // }

  @Patch(':id/rating')
  updateRating(
    @Param('id', ParseIntPipe) id: number,
    @Body('rating', RatingValidationPipe) rating: number,
  ) {
    return this.recipeService.updateRating(id, rating);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.recipeService.deleteRecipe(id);
  }
}
