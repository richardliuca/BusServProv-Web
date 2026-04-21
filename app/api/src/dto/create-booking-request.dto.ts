import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateBookingRequestDto {
  @IsString()
  @MinLength(1)
  @MaxLength(2000)
  details!: string;
}
