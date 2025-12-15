// src/seguridad/marcador-seg/entities/marcador-seg.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Delito } from '../../delito/entities/delito.entity';
import { Delincuente } from '../../delincuente/entities/delincuente.entity';

@Entity()
export class MarcadorSeg {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  nombre: string;

  @Column({nullable: true})
  apellido: string;

  @Column({nullable: true})
  direccion: string;

  @Column({nullable: true})
  telefono: string;

  @Column({nullable: true})
  dni: string;

  @Column({ nullable: true })
  notas?: string;

  @Column('double', { nullable: true })
  latitud: number;

  @Column('double', { nullable: true })
  longitud: number;

  @Column({nullable: true})
  icono: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_inicio: Date;

  // @Column({ type: 'timestamp', nullable: true })
  // fecha_fin: Date;

  @Column({ unique: true, nullable: true })
  numero_denuncia: string;

  @Column({ nullable: true })
  fiscal: string;

  @Column({ nullable: true })
  barrio: string;

  @OneToMany(() => Delito, (delito) => delito.marcadorSeg, {
    cascade: true,
  })
  delitos: Delito[];

  @OneToMany(() => Delincuente, (delincuente) => delincuente.marcadorSeg, {
    cascade: true,
  })
  delincuentes: Delincuente[];
}