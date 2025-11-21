import { Module } from '@nestjs/common';
import { EventoService } from './evento.service';

@Module({
  providers: [EventoService]
})
export class EventoModule {}
