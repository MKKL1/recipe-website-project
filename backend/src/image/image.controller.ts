import { Controller, Post, Headers, UploadedFile, UseInterceptors, Get, Param, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { storage } from './file-storage';
import { ApiOperation } from '@nestjs/swagger';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get image' })
  async getImage(@Param('id') id, @Res() res) {
    (await this.imageService.getFile(id)).pipe(res);
  }

  //pain
  //TODO create our own file saving process
  @Post()
  @UseInterceptors(FileInterceptor('file', {storage: storage}))
  @ApiOperation({ summary: 'Get all recipes' })
  async saveImage(@Headers() headers, @UploadedFile() file: Express.Multer.File) {
    const imageModel = await this.imageService.saveFile(file)
    return {
      success: 1,
      file: {
        url: `http://${headers.host}/image/${imageModel._id.toString()}`
      }
    };
  }
}
