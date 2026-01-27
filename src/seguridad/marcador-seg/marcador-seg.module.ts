import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarcadorSeg } from './entities/marcador-seg.entity';
import { MarcadorSegService } from './marcador-seg.service';
import { MarcadorSegController } from './marcador-seg.controller';
import { Delito } from '../delito/entities/delito.entity';
import { Delincuente } from '../delincuente/entities/delincuente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MarcadorSeg, Delito, Delincuente])],
  providers: [MarcadorSegService],
  controllers: [MarcadorSegController],
})
export class MarcadorSegModule {}