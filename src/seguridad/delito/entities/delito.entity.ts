import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { MarcadorSeg } from '../../marcador-seg/entities/marcador-seg.entity';

@Entity()
export class Delito {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  articulo: string;

  @Column({ nullable: true })
  inciso: string;

  @Column({ nullable: true })
  tipoDelito: string;

  @ManyToOne(() => MarcadorSeg, (marcador) => marcador.delitos, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  marcadorSeg: MarcadorSeg;
}