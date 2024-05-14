import { Injectable, NotFoundException, UploadedFile, UseInterceptors } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image } from './schemas/image.schema';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class ImageService {

  constructor(@InjectModel(Image.name) private imageModel: Model<Image>) {}

  async getFile(id: string) {
    const image = await this.imageModel.findById(id).exec();
    const filepath = path.join(process.cwd(), image.location);
    const stream = fs.createReadStream(filepath);
    stream.on('error', err => {throw new NotFoundException()});
    return stream;
  }

  async saveFile(file: Express.Multer.File) {
    const img = new this.imageModel({
      location: file.path
    });
    return img.save();
  }
}