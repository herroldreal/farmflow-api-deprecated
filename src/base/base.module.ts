import { HeaderService } from '@base/services/header.service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { AuthController, HealthController } from './controllers';

@Module({
  imports: [TerminusModule, HttpModule], // Authentication
  providers: [HeaderService],
  controllers: [AuthController, HealthController],
})
export class BaseModule {}
