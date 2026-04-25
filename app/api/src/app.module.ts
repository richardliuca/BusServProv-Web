import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { BookingRequestsController } from './booking-requests.controller';
import { TemporalClientService } from './temporal-client.service';

@Module({
  controllers: [HealthController, BookingRequestsController],
  providers: [TemporalClientService],
})
export class AppModule {}
