import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm'; //
import { MarcadorSeg } from '../../marcador-seg/entities/marcador-seg.entity';

@Entity()
export class Delincuente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true }) // Hacemos el nombre único
  nombre: string;

  @Column({ nullable: true })
  dni: string;

 // Relación inversa: Un delincuente puede aparecer en muchos marcadores
  @ManyToMany(() => MarcadorSeg, (marcador) => marcador.delincuentes)
  marcadores: MarcadorSeg[];
}