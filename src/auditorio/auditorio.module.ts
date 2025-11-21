import { Module } from '@nestjs/common';
import { AuditorioService } from './auditorio.service';

@Module({
  providers: [AuditorioService]
})
export class AuditorioModule {}
