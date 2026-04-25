'use client';

import { useEffect, useState } from 'react';

type ApiHealth = 'checking' | 'ok' | 'unavailable';

export function BookingRequestForm() {
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiHealth, setApiHealth] = useState<ApiHealth>('checking');
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(
    null,
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/health', { method: 'GET' });
        if (!cancelled) {
          setApiHealth(res.ok ? 'ok' : 'unavailable');
        }
      } catch {
        if (!cancelled) {
          setApiHealth('unavailable');
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (apiHealth !== 'ok') {
      return;
    }
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

  const apiOffline = apiHealth === 'unavailable';
  const apiChecking = apiHealth === 'checking';

  return (
    <form
      className="rounded-lg border border-border bg-primary-50 p-6 text-left text-primary-900 shadow-sm"
      onSubmit={onSubmit}
    >
      {apiOffline ? (
        <p className="mb-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-950">
          The booking API is not reachable at the moment. Please try again later.
        </p>
      ) : null}
      {apiChecking ? (
        <p className="mb-4 text-sm text-primary-700">Checking API availability…</p>
      ) : null}
      <label className="mb-2 block text-sm font-semibold text-black-forest" htmlFor="details">
        What do you need?
      </label>
      <textarea
        className="w-full min-h-[8rem] rounded-md border border-border bg-white px-3 py-2 text-primary-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        id="details"
        name="details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        placeholder="Describe the service or appointment you are looking for."
        required
        minLength={1}
        maxLength={2000}
        disabled={apiOffline || apiChecking}
      />
      <button
        className="mt-4 inline-flex w-full justify-center rounded-md bg-primary-500 px-4 py-3 font-semibold text-white transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        type="submit"
        disabled={loading || apiOffline || apiChecking}
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
