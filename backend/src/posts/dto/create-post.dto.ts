import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreatePostDto {
  @IsUrl()
  @IsNotEmpty()
  imageUrl: string;

  @IsString()
  @IsOptional()
  caption?: string;
}
