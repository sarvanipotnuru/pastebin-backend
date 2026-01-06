import {IsString,IsNotEmpty,IsOptional,IsInt,Min,} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePasteDto {
  @IsString()
  @IsNotEmpty({ message: 'content is required' })
  content: string;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt({ message: 'expiresInMinutes must be an integer' })
  @Min(1, { message: 'expiresInMinutes must be at least 1 minute' })
  expiresInMinutes?: number;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt({ message: 'maxViews must be an integer' })
  @Min(1, { message: 'maxViews must be at least 1' })
  maxViews?: number;
}
