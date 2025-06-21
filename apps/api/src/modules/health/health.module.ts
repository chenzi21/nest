import { Module } from '@nestjs/common';
import { HealthController } from '@api/modules/health/health.controller';
import { PrismaModule } from '@api/modules/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HealthController],
})
export class HealthModule {}
