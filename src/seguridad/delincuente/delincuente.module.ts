import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delincuente } from './entities/delincuente.entity';
import { DelincuenteService } from './delincuente.service';
import { DelincuenteController } from './delincuente.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Delincuente])],
  providers: [DelincuenteService],
  controllers: [DelincuenteController],
  exports: [DelincuenteService],
})
export class DelincuenteModule {}
