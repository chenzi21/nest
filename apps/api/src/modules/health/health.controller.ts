import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PrismaService } from '@api/modules/prisma/prisma.service';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: 'Basic health check' })
  async healthCheck() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
    };
  }

  @Get('db')
  @ApiOperation({ summary: 'Database health check' })
  async databaseHealthCheck() {
    const isHealthy = await this.prisma.healthCheck();

    return {
      status: isHealthy ? 'ok' : 'error',
      database: isHealthy ? 'connected' : 'disconnected',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('detailed')
  @ApiOperation({ summary: 'Detailed health check' })
  async detailedHealthCheck() {
    const dbHealthy = await this.prisma.healthCheck();

    return {
      status: dbHealthy ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      memory: {
        used: process.memoryUsage().heapUsed,
        total: process.memoryUsage().heapTotal,
        external: process.memoryUsage().external,
      },
      database: {
        status: dbHealthy ? 'connected' : 'disconnected',
      },
    };
  }
}
