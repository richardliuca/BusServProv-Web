import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Connection, Client } from '@temporalio/client';
import {
  BOOKING_REQUEST_WORKFLOW_TYPE,
  BOOKING_TASK_QUEUE,
  TEMPORAL_NAMESPACE,
} from '@bsp/temporal';

@Injectable()
export class TemporalClientService implements OnModuleInit, OnModuleDestroy {
  private connection: Connection | null = null;
  private client: Client | null = null;

  async onModuleInit() {
    const address = process.env.TEMPORAL_ADDRESS ?? 'temporal:7233';
    const attempts = Number(process.env.TEMPORAL_CONNECT_ATTEMPTS ?? '40');
    const delayMs = Number(process.env.TEMPORAL_CONNECT_DELAY_MS ?? '2000');
    let lastErr: unknown;
    for (let i = 1; i <= attempts; i++) {
      try {
        this.connection = await Connection.connect({ address });
        lastErr = undefined;
        break;
      } catch (e) {
        lastErr = e;
        if (i === attempts) {
          break;
        }
        await new Promise((r) => setTimeout(r, delayMs));
      }
    }
    if (!this.connection) {
      throw lastErr instanceof Error ? lastErr : new Error(String(lastErr));
    }
    this.client = new Client({
      connection: this.connection,
      namespace: process.env.TEMPORAL_NAMESPACE ?? TEMPORAL_NAMESPACE,
    });
  }

  async onModuleDestroy() {
    if (this.connection) {
      await this.connection.close();
      this.connection = null;
      this.client = null;
    }
  }

  getClient(): Client {
    if (!this.client) {
      throw new Error('Temporal client not initialized');
    }
    return this.client;
  }

  getTaskQueue(): string {
    return process.env.TEMPORAL_TASK_QUEUE ?? BOOKING_TASK_QUEUE;
  }

  getWorkflowType(): string {
    return BOOKING_REQUEST_WORKFLOW_TYPE;
  }
}
