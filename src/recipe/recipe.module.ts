import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [RecipeController],
  providers: [RecipeService],
  imports: [DatabaseModule],
})
export class RecipeModule {}
