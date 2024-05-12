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
  ApiTags,
} from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { GetUser } from '../users/decorators/getuser.decorator';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './schemas/comment.schema';
import { CommentDto } from './dto/comment.dto';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';
import { plainToInstance } from 'class-transformer';

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
  @UseInterceptors(new SerializeInterceptor<CommentDto>(CommentDto))
  async getAll(@Param('recipeId') recipeId) {
    return this.commentsService.getAll(recipeId);
  }

  @Get(':commentId')
  @ApiOperation({ summary: 'Get comment with specified id for recipe' })
  @ApiOkResponse({
    description: 'Comment',
    type: CommentDto,
  })
  @UseInterceptors(new SerializeInterceptor<CommentDto>(CommentDto))
  async getOne(@Param('commentId') commentId) {
    return this.commentsService.getOne(commentId);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('user')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create comment' })
  @ApiBearerAuth()
  @ApiOkResponse({})
  async create(
    @GetUser() user,
    @Param('recipeId') recipeId,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    await this.commentsService.create(createCommentDto, user, recipeId);
  }

  @Put(':commentId')
  @UseGuards(RolesGuard)
  @Roles('user')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update comment' })
  @ApiBearerAuth()
  @ApiOkResponse({})
  async update(
    @GetUser() user,
    @Param('commentId') commentId,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    await this.commentsService.update(commentId, createCommentDto, user);
  }

  @Delete(':commentId')
  @UseGuards(RolesGuard)
  @Roles('user')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete comment' })
  @ApiBearerAuth()
  @ApiOkResponse({})
  async delete(@GetUser() user, @Param('commentId') commentId) {
    await this.commentsService.delete(commentId, user);
  }
}
