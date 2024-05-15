import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { Comment, CommentSchema } from './schemas/comment.schema';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    SerializeInterceptor,
  ],
  exports: [CommentsService],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
