import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { RecipeModule } from './recipe/recipe.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/chleb'), RecipeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
