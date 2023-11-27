import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './farm/todo/todo.module';

@Module({
  imports: [AuthModule, TodoModule],
})
export class AppModule {
}
