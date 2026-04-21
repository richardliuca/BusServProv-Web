import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { NativeConnection, Worker, bundleWorkflowCode } from '@temporalio/worker';
import { recordBookingRequest } from '@bsp/temporal/activities';
import { BOOKING_TASK_QUEUE, TEMPORAL_NAMESPACE } from '@bsp/temporal';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function resolveWorkflowsPath(): string {
  const envPath = process.env.WORKFLOWS_PATH;
  if (envPath) {
    return path.isAbsolute(envPath) ? envPath : path.resolve(process.cwd(), envPath);
  }
  return path.resolve(__dirname, '../../../packages/temporal/src/workflows.ts');
}

async function run() {
  const workflowsPath = resolveWorkflowsPath();
  const workflowBundle = await bundleWorkflowCode({ workflowsPath });

  const address = process.env.TEMPORAL_ADDRESS ?? 'temporal:7233';
  const connection = await NativeConnection.connect({ address });

  const worker = await Worker.create({
    connection,
    namespace: process.env.TEMPORAL_NAMESPACE ?? TEMPORAL_NAMESPACE,
    taskQueue: process.env.TEMPORAL_TASK_QUEUE ?? BOOKING_TASK_QUEUE,
    workflowBundle,
    activities: {
      recordBookingRequest,
    },
  });

  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
