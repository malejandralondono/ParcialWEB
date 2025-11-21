import { Module } from '@nestjs/common';
import { AsistenteService } from './asistente.service';

@Module({
  providers: [AsistenteService]
})
export class AsistenteModule {}
