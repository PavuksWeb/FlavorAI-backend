import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post(':recipeId')
  @UseGuards(JwtAuthGuard)
  rateRecipe(
    @Param('recipeId') recipeId: string,
    @Body('value') value: number,
    @Req() req: Request,
  ) {
    const user = req.user as { id: number };
    return this.ratingService.addRating(Number(recipeId), user.id, value);
  }

  @Get(':recipeId')
  @UseGuards(JwtAuthGuard)
  getAverageRating(@Param('recipeId') recipeId: string) {
    return this.ratingService.getAverageRating(Number(recipeId));
  }

  @Delete(':recipeId')
  @UseGuards(JwtAuthGuard)
  deleteRating(@Param('recipeId') recipeId: string, @Req() req: Request) {
    const user = req.user as { id: number };
    return this.ratingService.deleteRating(user.id, Number(recipeId));
  }
}
