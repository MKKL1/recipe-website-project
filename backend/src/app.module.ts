import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { RecipeModule } from './recipe/recipe.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { IsUniqueConstraint } from './validators/unique.validator';
import { CommentsModule } from './comments/comments.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [
    // localhost don't work with node version 17 and higher
    // so I changed it to 127.0.0.1
    MongooseModule.forRoot('mongodb://127.0.0.1/chleb'),
    RecipeModule,
    UsersModule,
    AuthModule,
    CommentsModule,
    ImageModule,
  ],
  controllers: [AppController],
  providers: [AppService, IsUniqueConstraint],
})
export class AppModule {}
