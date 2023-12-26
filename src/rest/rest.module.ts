import { FarmMapperProfile } from '@mappers/farm.mapper-profile';
import { WorkerMapperProfile } from '@mappers/worker.mapper-profile';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { FarmRepository } from '@repositories/farm.repository';
import { WorkerRepository } from '@repositories/worker.repository';
import { FarmService } from '@services/farm.service';
import { WorkerService } from '@services/worker.service';

import { FarmController, WorkerController } from './controllers';

@Module({
  imports: [TerminusModule, HttpModule],
  providers: [FarmService, FarmRepository, WorkerService, WorkerRepository, WorkerMapperProfile, FarmMapperProfile],
  exports: [FarmService, WorkerService],
  controllers: [FarmController, WorkerController],
})
export class RestModule {}
