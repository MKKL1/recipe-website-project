import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { Recipe, RecipeSchema } from './schemas/recipe.schema';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';
import { ImageModule } from '../image/image.module';
import { CommentsModule } from '../comments/comments.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
    SerializeInterceptor,
    ImageModule,
    CommentsModule
  ],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {}
