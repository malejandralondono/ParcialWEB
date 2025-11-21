/* eslint-disable prettier/prettier */
/* archivo: src/asistente/asistente.service.ts */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { AsistenteEntity } from './asistente.entity/asistente.entity';
import { EventoEntity } from '../evento/evento.entity/evento.entity';

@Injectable()
export class AsistenteService {
   constructor(
       @InjectRepository(AsistenteEntity)
       private readonly asistenteRepository: Repository<AsistenteEntity>,

       @InjectRepository(EventoEntity)
       private readonly eventoRepository: Repository<EventoEntity>
   ){}

   async registrarAsistente(eventoId: string, asistente: AsistenteEntity): Promise<AsistenteEntity> {

       const evento: EventoEntity | null = await this.eventoRepository.findOne({
           where: { id: eventoId },
           relations: ["asistentes", "auditorio"]
       });

       if (!evento) {
           throw new BusinessLogicException(
               "EL evento con el id dado no fue encontrado",
               BusinessError.NOT_FOUND
           );
       }

       const existe = evento.asistentes.find(a => a.email === asistente.email);

       if (existe) {
           throw new BusinessLogicException(
               "No puede haber dos asistentes con el mismo email en un mismo evento.",
               BusinessError.PRECONDITION_FAILED
           );
       }

       if (evento.auditorio && evento.asistentes.length >= evento.auditorio.capacidad) {
           throw new BusinessLogicException(
               "No puede superarse la capacidad del auditorio del evento.",
               BusinessError.PRECONDITION_FAILED
           );
       }

       asistente.evento = evento;

       return await this.asistenteRepository.save(asistente);
   }

   async findAsistentesByEvento(eventoId: string): Promise<AsistenteEntity[]> {

       const evento: EventoEntity | null = await this.eventoRepository.findOne({
           where: { id: eventoId },
           relations: ["asistentes"]
       });

       if (!evento) {
           throw new BusinessLogicException(
               "EL evento con el id dado no fue encontrado",
               BusinessError.NOT_FOUND
           );
       }

       return evento.asistentes;
   }
}
/* archivo: src/asistente/asistente.service.ts */
