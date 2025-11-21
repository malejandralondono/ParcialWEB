/* eslint-disable prettier/prettier */
/* archivo: src/evento/evento.service.ts */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { AuditorioEntity } from './auditorio.entity/auditorio.entity';

@Injectable()
export class AuditorioService {
   constructor(
       @InjectRepository(AuditorioEntity)
       private readonly auditorioRepository: Repository<AuditorioEntity>,

   ){}

   async crear(auditorio: AuditorioEntity): Promise<AuditorioEntity> {

       if (auditorio.capacidad < 0) {
           throw new BusinessLogicException(
               "La capacidad debe ser mayor a cero.",
               BusinessError.PRECONDITION_FAILED
           );
       }

       return await this.auditorioRepository.save(auditorio);
   }

   }
/* archivo: src/evento/evento.service.ts */
