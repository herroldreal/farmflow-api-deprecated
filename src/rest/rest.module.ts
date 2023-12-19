import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { FarmRepository } from '@repositories/farm.repository';

import { FarmController } from './controllers';
import { FarmService } from '../core/services/farm.service';

@Module({
  imports: [TerminusModule, HttpModule],
  providers: [FarmService, FarmRepository],
  exports: [FarmService],
  controllers: [FarmController],
})
export class RestModule {}
