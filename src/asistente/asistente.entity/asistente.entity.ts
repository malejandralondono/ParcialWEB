/* eslint-disable prettier/prettier */
import { EventoEntity } from 'src/evento/evento.entity/evento.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AsistenteEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;
    
    @Column()
    códigoEstudiante: string;

    @Column()
    email: string;
    
    @ManyToOne(() => EventoEntity, evento => evento.asistentes)
    evento: EventoEntity;

}