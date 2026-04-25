import { proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';

const { recordBookingRequest } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

export async function bookingRequestWorkflow(details: string): Promise<string> {
  const recorded = await recordBookingRequest(details);
  return recorded;
}
