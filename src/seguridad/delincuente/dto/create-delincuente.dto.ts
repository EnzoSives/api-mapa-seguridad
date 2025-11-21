import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDelincuenteDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  dni: string;
}
