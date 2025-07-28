import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DatabaseService } from './database/database.service';
import { RecipeModule } from './recipe/recipe.module';
import { AuthModule } from './auth/auth.module';
import { RatingModule } from './rating/rating.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    RecipeModule,
    AuthModule,
    RatingModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [DatabaseService],
})
export class AppModule {}
