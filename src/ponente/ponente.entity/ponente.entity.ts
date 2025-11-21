/* eslint-disable prettier/prettier */
/* archivo: src/ponente/ponente.entity/ponente.entity.ts */

import { EventoEntity } from 'src/evento/evento.entity/evento.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum TipoPonente {
    INTERNO = "Interno",
    INVITADO = "Invitado"
}

@Entity()
export class PonenteEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nCedula: number;

    @Column()
    nombre: string;
    
    @Column()
    email: string;

    @Column({
        type: 'enum',
        enum: TipoPonente,
    })
    tipoPonente: TipoPonente;

    @Column()
    especialidad: string;

    @OneToMany(() => EventoEntity, evento => evento.ponente)
    eventos: EventoEntity[];
}
