import { Injectable } from '@nestjs/common';
import {Model} from "mongoose";
import {Category} from "./schemas/category.schema";
import {InjectModel} from "@nestjs/mongoose";
import {CreateCategoryDto} from "./dto/create-category.dto";

@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

    async findAll() {
        return this.categoryModel.find();
    }

    async create(createCategoryDto: CreateCategoryDto) {
        return this.categoryModel.create(createCategoryDto);
    }

    async update(id: string, createCategoryDto: CreateCategoryDto) {
        return this.categoryModel.updateOne({ _id: id }, createCategoryDto).exec();
    }

    async delete(id: string) {
        return this.categoryModel.findByIdAndDelete(id);
    }
}
