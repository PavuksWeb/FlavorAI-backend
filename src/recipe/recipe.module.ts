import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [RecipeController],
  providers: [RecipeService, DatabaseService],
  exports: [RecipeService],
})
export class RecipeModule {}
