import { PartialType } from '@nestjs/mapped-types';
import { CreateDelincuenteDto } from './create-delincuente.dto';

export class UpdateDelincuenteDto extends PartialType(CreateDelincuenteDto) {}
