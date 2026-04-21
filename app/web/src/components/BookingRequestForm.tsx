'use client';

import { useState } from 'react';

export function BookingRequestForm() {
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(
    null,
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/booking-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ details }),
      });
      const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
      if (!res.ok) {
        const msg =
          typeof data.message === 'string'
            ? data.message
            : typeof (data as { error?: string }).error === 'string'
              ? (data as { error: string }).error
              : `Request failed (${res.status})`;
        setMessage({ type: 'err', text: msg });
        return;
      }
      const wf = (data as { workflowId?: string }).workflowId;
      const run = (data as { runId?: string }).runId;
      setMessage({
        type: 'ok',
        text: wf
          ? `Workflow started. ID: ${wf}${run ? ` · run: ${run}` : ''}`
          : 'Workflow started.',
      });
      setDetails('');
    } catch (err) {
      setMessage({
        type: 'err',
        text: err instanceof Error ? err.message : 'Network error',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="rounded-lg border border-gray-300 bg-gray-50 p-6 text-left shadow-sm"
      onSubmit={onSubmit}
    >
      <label className="mb-2 block text-sm font-semibold text-gray-800" htmlFor="details">
        What do you need?
      </label>
      <textarea
        className="w-full min-h-[8rem] rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        id="details"
        name="details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        placeholder="Describe the service or appointment you are looking for."
        required
        minLength={1}
        maxLength={2000}
      />
      <button
        className="mt-4 inline-flex w-full justify-center rounded-md bg-primary-500 px-4 py-3 font-semibold text-white transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        type="submit"
        disabled={loading}
      >
        {loading ? 'Sending…' : 'Create booking request'}
      </button>
      {message ? (
        <p
          className={`mt-3 text-sm ${message.type === 'ok' ? 'text-green-600' : 'text-red-600'}`}
        >
          {message.text}
        </p>
      ) : null}
    </form>
  );
}
