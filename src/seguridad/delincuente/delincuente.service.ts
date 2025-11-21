import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Delincuente } from './entities/delincuente.entity';
import { CreateDelincuenteDto } from './dto/create-delincuente.dto';
import { UpdateDelincuenteDto } from './dto/update-delincuente.dto';

@Injectable()
export class DelincuenteService {
  constructor(
    @InjectRepository(Delincuente)
    private readonly repository: Repository<Delincuente>,
  ) {}

  create(dto: CreateDelincuenteDto) {
    return this.repository.save(dto);
  }

  findAll() {
    return this.repository.find({ relations: ['marcadorSeg'] });
  }

  findOne(id: number) {
    return this.repository.findOne({ where: { id }, relations: ['marcadorSeg'] });
  }

  update(id: number, dto: UpdateDelincuenteDto) {
    return this.repository.update(id, dto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
