/* eslint-disable prettier/prettier */
/* archivo: src/evento/evento.service.ts */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { EventoEntity } from './evento.entity/evento.entity';
import { PonenteEntity } from '../ponente/ponente.entity/ponente.entity';

@Injectable()
export class EventoService {
   constructor(
       @InjectRepository(EventoEntity)
       private readonly eventoRepository: Repository<EventoEntity>,

       @InjectRepository(PonenteEntity)
       private readonly ponenteRepository: Repository<PonenteEntity>
   ){}

   async crearEvento(evento: EventoEntity): Promise<EventoEntity> {

       if (evento.duraciónHoras <= 0) {
           throw new BusinessLogicException(
               "Debe ser positivo",
               BusinessError.PRECONDITION_FAILED
           );
       }

       const ponente: PonenteEntity | null = await this.ponenteRepository.findOne({
           where: { id: evento.ponente?.id }
       });

       if (!ponente) {
           throw new BusinessLogicException(
               "No se encontró el ponente asociado al evento",
               BusinessError.NOT_FOUND
           );
       }

       if (ponente.tipoPonente === "Invitado") {
           if (!evento.descripción || evento.descripción.length < 50) {
               throw new BusinessLogicException(
                   "Si el ponente es Invitado, la descripción debe tener al menos 50 caracteres.",
                   BusinessError.PRECONDITION_FAILED
               );
           }
       }

       return await this.eventoRepository.save(evento);
   }

   async aprobarEvento(id: string): Promise<EventoEntity> {
       const evento: EventoEntity | null = await this.eventoRepository.findOne({
           where: { id },
           relations: ["auditorio"]
       });

       if (!evento) {
           throw new BusinessLogicException(
               "El evento con el id dado no fue encontrado",
               BusinessError.NOT_FOUND
           );
       }

       if (!evento.auditorio) {
           throw new BusinessLogicException(
               "Solo puede aprobarse si tiene auditorio asignado.",
               BusinessError.PRECONDITION_FAILED
           );
       }

         evento.estado = 'Aprobado';


       return await this.eventoRepository.save(evento);
   }

   async eliminarEvento(id: string) {
       const evento: EventoEntity | null = await this.eventoRepository.findOne({
           where: { id }
       });

       if (!evento) {
           throw new BusinessLogicException(
               "The event with the given id was not found",
               BusinessError.NOT_FOUND
           );
       }

       if (evento.estado == 'Aprobado') {
           throw new BusinessLogicException(
               "El evento no puede ser eliminado porque ya está aprobado",
               BusinessError.PRECONDITION_FAILED
           );
       }

       await this.eventoRepository.remove(evento);
   }

   async findEventoById(id: string): Promise<EventoEntity> {
       const evento: EventoEntity | null = await this.eventoRepository.findOne({
           where: { id },
           relations: ["ponente", "auditorio"]
       });

       if (!evento) {
           throw new BusinessLogicException(
               "El evento con el id dado no fue encontrado",
               BusinessError.NOT_FOUND
           );
       }

       return evento;
   }
}
/* archivo: src/evento/evento.service.ts */
