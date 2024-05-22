import { PaginateModel } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { PaginationOptionsDto } from './pagination-options.dto';

export function paginateTool<T>(paginateModel: PaginateModel<T>, paginationOptionsDto: PaginationOptionsDto) {

  return new Promise(resolve => {
    paginateModel.paginate({}, {
      page: paginationOptionsDto.page,
      limit: paginationOptionsDto.limit,
      sort: paginationOptionsDto.sort,
      populate: ["category_id"],
      lean: true,
      customLabels: { meta: 'paginator' },
    }, (err, result) => {
      if(err) {
        throw new NotFoundException();
      }
      resolve(result);
    })
  });
}