import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards} from '@nestjs/common';
import {CategoryService} from "./category.service";
import {RolesGuard} from "../auth/guards/roles.guard";
import {Roles} from "../auth/decorators/roles.decorator";
import {CreateCategoryDto} from "./dto/create-category.dto";

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}
    @Get()
    async findAll() {
        return this.categoryService.findAll();
    }

    @Post()
    @UseGuards(RolesGuard)
    @Roles('admin')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createCategoryDto: CreateCategoryDto) {
        await this.categoryService.create(createCategoryDto);
    }

    @Put(':id')
    @UseGuards(RolesGuard)
    @Roles('admin')
    @HttpCode(HttpStatus.OK)
    async update(@Param('id') id: string, @Body() createCategoryDto: CreateCategoryDto) {
        await this.categoryService.update(id, createCategoryDto);
    }

    @Delete(':id')
    @UseGuards(RolesGuard)
    @Roles('admin')
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id') id: string) {
        await this.categoryService.delete(id);
    }
}
