/* eslint-disable prettier/prettier */
/* archivo: src/ponente/ponente.service.ts */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';
import { PonenteEntity } from './ponente.entity/ponente.entity';

@Injectable()
export class PonenteService {
   constructor(
       @InjectRepository(PonenteEntity)
       private readonly ponenteRepository: Repository<PonenteEntity>
   ){}

   async crearPonente(ponente: PonenteEntity): Promise<PonenteEntity> {

       if (ponente.tipoPonente === "Interno") {
           if (!ponente.email.endsWith(".edu")) {
               throw new BusinessLogicException(
                   "Si es Interno, el email debe terminar en .edu",
                   BusinessError.PRECONDITION_FAILED
               );
           }
       }

       if (ponente.tipoPonente === "Invitado") {
           if (!ponente.email.includes("@") || !ponente.email.split("@")[1]?.includes(".")) {
               throw new BusinessLogicException(
                   "Si es Invitado, el email debe ser válido (contener \"@\" y dominio)",
                   BusinessError.PRECONDITION_FAILED
               );
           }
       }

       return await this.ponenteRepository.save(ponente);
   }

   async findPonenteById(id: string): Promise<PonenteEntity> {
       const ponente: PonenteEntity | null = await this.ponenteRepository.findOne({
           where: { id },
           relations: ["eventos"]
       });

       if (!ponente)
           throw new BusinessLogicException(
               "No se encontro el ponente con el id dado",
               BusinessError.NOT_FOUND
           );

       return ponente;
   }

   async eliminarPonente(id: string) {
       const ponente: PonenteEntity | null = await this.ponenteRepository.findOne({
           where: { id },
           relations: ["eventos"]
       });

       if (!ponente)
           throw new BusinessLogicException(
               "No se encontro el ponente con el id dado",
               BusinessError.NOT_FOUND
           );

       if (ponente.eventos && ponente.eventos.length > 0) {
           throw new BusinessLogicException(
               "El ponente no puede ser eliminado porque tiene eventos asociados",
               BusinessError.PRECONDITION_FAILED
           );
       }

       await this.ponenteRepository.remove(ponente);
   }
}
/* archivo: src/ponente/ponente.service.ts */
