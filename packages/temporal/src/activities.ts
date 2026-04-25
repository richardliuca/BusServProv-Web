/**
 * Activity implementations run in the worker process.
 * Keep side effects (DB, email) here — not in workflows.
 */
export async function recordBookingRequest(details: string): Promise<string> {
  return `booking-recorded:${details.trim()}`;
}
