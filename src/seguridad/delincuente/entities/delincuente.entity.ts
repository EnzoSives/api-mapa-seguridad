import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { MarcadorSeg } from '../../marcador-seg/entities/marcador-seg.entity';

@Entity()
export class Delincuente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  dni: string;

  @ManyToOne(() => MarcadorSeg, (marcador) => marcador.delincuentes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  marcadorSeg: MarcadorSeg;
}
