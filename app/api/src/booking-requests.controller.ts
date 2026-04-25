import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  ServiceUnavailableException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateBookingRequestDto } from './dto/create-booking-request.dto';
import { TemporalClientService } from './temporal-client.service';

@Controller('booking-requests')
export class BookingRequestsController {
  constructor(private readonly temporal: TemporalClientService) {}

  @Post()
  async create(@Body() body: CreateBookingRequestDto) {
    if (!this.temporal.isTemporalReady()) {
      throw new ServiceUnavailableException(
        'Temporal is disabled or not connected; booking requests are unavailable.',
      );
    }
    const client = this.temporal.getClient();
    const workflowId = `booking-request-${randomUUID()}`;
    const taskQueue = this.temporal.getTaskQueue();
    const workflowType = this.temporal.getWorkflowType();

    try {
      const handle = await client.workflow.start(workflowType, {
        taskQueue,
        workflowId,
        args: [body.details],
      });
      return {
        workflowId: handle.workflowId,
        runId: handle.firstExecutionRunId,
      };
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      throw new InternalServerErrorException(
        `Failed to start workflow: ${message}`,
      );
    }
  }
}
