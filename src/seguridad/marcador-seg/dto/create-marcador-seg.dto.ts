// src/seguridad/marcador-seg/dto/create-marcador-seg.dto.ts
import { CreateDelincuenteDto } from 'src/seguridad/delincuente/dto/create-delincuente.dto';
import { CreateDelitoDto } from '../../delito/dto/create-delito.dto';

export class CreateMarcadorSegDto {
  nombre: string;
  apellido: string;
  direccion: string;
  telefono: string;
  dni: string;
  notas?: string;
  latitud: number;
  longitud: number;
  icono: string;
  fechaCreacion: Date;
  delitos?: CreateDelitoDto[];
  numero_denuncia?: string;
  fiscal?: string;
  barrio?: string;
  estado_causa?: 'esclarecido' | 'no_esclarecido';
  delincuentes?: CreateDelincuenteDto[];
}