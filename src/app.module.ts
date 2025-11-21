/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventoModule } from './evento/evento.module';
import { AsistenteModule } from './asistente/asistente.module';
import { AuditorioModule } from './auditorio/auditorio.module';
import { PonenteModule } from './ponente/ponente.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PonenteEntity } from './ponente/ponente.entity/ponente.entity';
import { EventoEntity } from './evento/evento.entity/evento.entity';
import { AsistenteEntity } from './asistente/asistente.entity/asistente.entity';
import { AuditorioEntity } from './auditorio/auditorio.entity/auditorio.entity';

@Module({
  imports: [PonenteModule, AuditorioModule, AsistenteModule, EventoModule,
    TypeOrmModule.forRoot({
     type: 'postgres',
     host: 'localhost',
     port: 5432,
     username: 'postgres',
     password: '123456',
     database: 'parcial',
     entities: [AuditorioEntity, AsistenteEntity, EventoEntity, PonenteEntity],
     dropSchema: true,
     synchronize: true//,
     //keepConnectionAlive: true
   }),
 ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
