// src/seguridad/marcador-seg/entities/marcador-seg.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable, ManyToMany } from 'typeorm';
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

  @Column({
    type: 'enum',
    enum: ['esclarecido', 'no_esclarecido'],
    nullable: true,
  })
  estado_causa: 'esclarecido' | 'no_esclarecido';

  @OneToMany(() => Delito, (delito) => delito.marcadorSeg, {
    cascade: true,
  })
  delitos: Delito[];

@ManyToMany(() => Delincuente, (delincuente) => delincuente.marcadores, {
    cascade: ['insert', 'update'], // Opcional: para guardar delincuentes al guardar el marcador
  })
  @JoinTable({
    name: 'marcador_seg_delincuentes', // Nombre explícito para la tabla intermedia
    joinColumn: { name: 'marcadorSegId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'delincuenteId', referencedColumnName: 'id' },
  })
  delincuentes: Delincuente[];
}