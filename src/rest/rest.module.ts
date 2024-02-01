import { TaskController } from '@controllers/task.controller';
import { FarmMapperProfile } from '@mappers/farm.mapper-profile';
import { WorkerMapperProfile } from '@mappers/worker.mapper-profile';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { FarmRepository } from '@repositories/farm.repository';
import { TaskRepository } from '@repositories/task.repository';
import { WorkerRepository } from '@repositories/worker.repository';
import { FarmService } from '@services/farm.service';
import { FirestoreTriggerService } from '@services/firestore-trigger.service';
import { TaskService } from '@services/task.service';
import { WorkerService } from '@services/worker.service';

import { FarmController, WorkerController } from './controllers';

@Module({
  imports: [TerminusModule, HttpModule],
  providers: [
    FarmService,
    TaskService,
    FarmRepository,
    TaskRepository,
    WorkerService,
    WorkerRepository,
    WorkerMapperProfile,
    FarmMapperProfile,
    FirestoreTriggerService,
  ],
  exports: [FarmService, WorkerService, TaskService, FirestoreTriggerService],
  controllers: [FarmController, WorkerController, TaskController],
})
export class RestModule {}
