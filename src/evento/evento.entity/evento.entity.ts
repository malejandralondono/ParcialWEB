/* eslint-disable prettier/prettier */
import { AsistenteEntity } from 'src/asistente/asistente.entity/asistente.entity';
import { AuditorioEntity } from 'src/auditorio/auditorio.entity/auditorio.entity';
import { PonenteEntity } from 'src/ponente/ponente.entity/ponente.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EventoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    titulo: string;

    @Column()
    descripción: string;

    @Column()
    fecha: Date;
    
    @Column()
    duraciónHoras: number;
    
    @Column()
    estado: string;
    
    @ManyToOne(() => PonenteEntity, ponente => ponente.eventos)
    ponente: PonenteEntity;

    @OneToMany(() => AsistenteEntity, asistente => asistente.evento)
    asistentes: AsistenteEntity[];

    @ManyToOne(() => AuditorioEntity, auditorio => auditorio.eventos)
    auditorio: AuditorioEntity;

}
