import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { RecipeModule } from './recipe/recipe.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, UserModule, RecipeModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
