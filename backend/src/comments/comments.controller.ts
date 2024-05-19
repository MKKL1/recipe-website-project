import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { GetUser } from '../users/decorators/getuser.decorator';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './schemas/comment.schema';
import { CommentDto } from './dto/comment.dto';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';
import { User } from '../users/schemas/users.schema';

@ApiTags('Comments')
@Controller('recipe/:recipeId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @Get()
  @ApiOperation({ summary: 'Get all comments for recipe' })
  @ApiOkResponse({
    description: 'Comments record',
    type: Comment,
    isArray: true,
  })
  @ApiParam({
    name: 'recipeId',
    required: true,
    description: 'Id of recipe',
  })
  @UseInterceptors(new SerializeInterceptor<CommentDto>(CommentDto))
  async getAll(@Param('recipeId') recipeId: string) {
    return this.commentsService.getAll(recipeId);
  }

  @Get(':commentId')
  @ApiOperation({ summary: 'Get comment with specified id for recipe' })
  @ApiOkResponse({
    description: 'Comment',
    type: CommentDto,
  })
  @ApiParam({
    name: 'recipeId',
    required: true,
    description: 'Id of recipe',
  })
  @ApiParam({
    name: 'commentId',
    required: true,
    description: 'Id of comment',
  })
  @UseInterceptors(new SerializeInterceptor<CommentDto>(CommentDto))
  async getOne(@Param('commentId') commentId: string) {
    return this.commentsService.getOne(commentId);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('user')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create comment' })
  @ApiParam({
    name: 'recipeId',
    required: true,
    description: 'Id of recipe',
  })
  @ApiBearerAuth()
  @ApiOkResponse({})
  @UseInterceptors(new SerializeInterceptor<CommentDto>(CommentDto))
  async create(
    @GetUser() user: User,
    @Param('recipeId') recipeId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return await this.commentsService.create(createCommentDto, user, recipeId);
  }

  @Put(':commentId')
  @UseGuards(RolesGuard)
  @Roles('user')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update comment' })
  @ApiParam({
    name: 'recipeId',
    required: true,
    description: 'Id of recipe',
  })
  @ApiParam({
    name: 'commentId',
    required: true,
    description: 'Id of comment',
  })
  @ApiBearerAuth()
  @ApiOkResponse({})
  @UseInterceptors(new SerializeInterceptor<CommentDto>(CommentDto))
  async update(
    @GetUser() user: User,
    @Param('commentId') commentId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return await this.commentsService.update(commentId, createCommentDto, user);
  }

  @Delete(':commentId')
  @UseGuards(RolesGuard)
  @Roles('user')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete comment' })
  @ApiParam({
    name: 'recipeId',
    required: true,
    description: 'Id of recipe',
  })
  @ApiParam({
    name: 'commentId',
    required: true,
    description: 'Id of comment',
  })
  @ApiBearerAuth()
  @ApiOkResponse({})
  async delete(@GetUser() user: User, @Param('commentId') commentId: string) {
    await this.commentsService.delete(commentId, user);
  }
}
