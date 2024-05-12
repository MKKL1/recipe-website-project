import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { RecipeModule } from './recipe/recipe.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { IsUniqueConstraint } from './validators/unique.validator';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/chleb'),
    RecipeModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, IsUniqueConstraint],
})
export class AppModule {}
