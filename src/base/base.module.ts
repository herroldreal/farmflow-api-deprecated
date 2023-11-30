import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { AuthController, HealthController } from './controllers';

@Module({
  imports: [TerminusModule, HttpModule], // Authentication
  controllers: [AuthController, HealthController],
})
export class BaseModule {}
