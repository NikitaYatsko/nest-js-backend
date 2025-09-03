import { IsOptional } from 'class-validator';

export class PatchPostDto {
  @IsOptional()
  title: string;
  @IsOptional()
  content: string;
}