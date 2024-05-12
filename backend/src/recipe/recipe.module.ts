import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { Recipe, RecipeSchema } from './schemas/recipe.schema';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
    SerializeInterceptor,
  ],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {}
