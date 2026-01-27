// src/seguridad/marcador-seg/marcador-seg.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarcadorSeg } from './entities/marcador-seg.entity';
import { CreateMarcadorSegDto } from './dto/create-marcador-seg.dto';
import { UpdateMarcadorSegDto } from './dto/update-marcador-seg.dto';
import { Delito } from '../delito/entities/delito.entity';
import { Delincuente } from '../delincuente/entities/delincuente.entity';

@Injectable()
export class MarcadorSegService {
  constructor(
    @InjectRepository(MarcadorSeg)
    private readonly repository: Repository<MarcadorSeg>,
    @InjectRepository(Delito)
    private readonly delitoRepository: Repository<Delito>,
    @InjectRepository(Delincuente)
    private readonly delincuenteRepository: Repository<Delincuente>,
  ) {}

  async create(dto: CreateMarcadorSegDto) {
    // 1. Extraemos 'delincuentes' del DTO
    const { delitos, delincuentes, ...marcadorData } = dto;

    const marcadorSeg = this.repository.create(marcadorData);

    // 2. Manejo de Delitos
    if (delitos) {
      marcadorSeg.delitos = delitos.map((delitoDto) =>
        this.delitoRepository.create(delitoDto),
      );
    }

    // 3. NUEVA LÓGICA CON CONSEJO PRO: Normalización
    if (delincuentes && delincuentes.length > 0) {
      const listaDelincuentesReales: Delincuente[] = [];

      for (const dDto of delincuentes) {
        // --- CONSEJO PRO: Normalizar nombre ---
        // Quitamos espacios y convertimos a Mayúsculas para evitar duplicados por formato
        const nombreNormalizado = dDto.nombre.trim().toUpperCase();

        // A. Buscamos usando el nombre normalizado
        const existente = await this.delincuenteRepository.findOne({
          where: { nombre: nombreNormalizado },
        });

        if (existente) {
          // B. Si existe, lo usamos
          listaDelincuentesReales.push(existente);
        } else {
          // C. Si no existe, creamos uno nuevo FORZANDO el nombre normalizado
          const nuevo = this.delincuenteRepository.create({
            ...dDto,
            nombre: nombreNormalizado, // Sobrescribimos con el limpio
          });
          listaDelincuentesReales.push(nuevo);
        }
      }

      marcadorSeg.delincuentes = listaDelincuentesReales;
    }

    return this.repository.save(marcadorSeg);
  }

  findAll() {
    return this.repository.find({ relations: ['delitos', 'delincuentes'] });
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: ['delitos', 'delincuentes'],
    });
  }

  async update(id: number, dto: UpdateMarcadorSegDto) {
    // 1. Buscamos el marcador con sus relaciones
    const marcador = await this.repository.findOne({
      where: { id },
      relations: ['delitos', 'delincuentes'],
    });

    if (!marcador) {
      throw new NotFoundException(`MarcadorSeg with ID ${id} not found`);
    }

    const { delitos, delincuentes, ...marcadorData } = dto;

    // Actualiza propiedades simples
    this.repository.merge(marcador, marcadorData);

    // 2. Lógica de Delitos
    if (delitos) {
      if (marcador.delitos) {
        await this.delitoRepository.remove(marcador.delitos);
      }
      marcador.delitos = delitos.map((delitoDto) =>
        this.delitoRepository.create(delitoDto),
      );
    }

    // 3. NUEVA LÓGICA CON CONSEJO PRO EN UPDATE
    if (delincuentes) {
      const listaDelincuentesActualizados: Delincuente[] = [];

      for (const dDto of delincuentes) {
        // --- CONSEJO PRO: Normalizar nombre ---
        const nombreNormalizado = dDto.nombre.trim().toUpperCase();

        const existente = await this.delincuenteRepository.findOne({
          where: { nombre: nombreNormalizado },
        });

        if (existente) {
          // B. Existe: lo reutilizamos
          // Opcional: Si quisieras actualizar datos extra (ej. DNI)
          // if (dDto.dni) existente.dni = dDto.dni; 
          listaDelincuentesActualizados.push(existente);
        } else {
          // C. No existe: creamos uno nuevo normalizado
          const nuevo = this.delincuenteRepository.create({
            ...dDto,
            nombre: nombreNormalizado,
          });
          listaDelincuentesActualizados.push(nuevo);
        }
      }

      marcador.delincuentes = listaDelincuentesActualizados;
    }

    return this.repository.save(marcador);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}