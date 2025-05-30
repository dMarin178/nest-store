import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const newVal = parseInt(value, 10);
    if (isNaN(newVal)) {
      throw new BadRequestException(`${value} is not a number`);
    }
    return newVal;
  }
}
