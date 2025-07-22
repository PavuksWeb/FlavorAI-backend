import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class RatingValidationPipe implements PipeTransform {
  transform(value: string) {
    const rating = parseInt(value);

    if (isNaN(rating)) {
      throw new BadRequestException('Rating must be an integer');
    }

    if (rating < 1 || rating > 5) {
      throw new BadRequestException('Rating must be from 1 to 5');
    }

    return rating;
  }
}
