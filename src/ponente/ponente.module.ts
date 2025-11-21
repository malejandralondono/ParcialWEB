import { Module } from '@nestjs/common';
import { PonenteService } from './ponente.service';

@Module({
  providers: [PonenteService]
})
export class PonenteModule {}
