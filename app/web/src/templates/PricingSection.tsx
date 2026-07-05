'use client';

import { useMemo, useState } from 'react';

import { Section } from '@/layout/Section';

type Area = 'Body' | 'Back & Shoulders' | 'Foot & Leg' | 'All' | 'Any';

type ServiceRow = {
  service: string;
  /** Session length in minutes, or `null` when the Session column shows “—”. */
  sessionMinutes: number | null;
  price: number;
  area: Area;
  /** Extra add-ons (e.g. hot stone emoji); empty when not applicable. */
  extra: string;
};

const HOT_STONE_MARK = '♨️';
const CBD_MARK = '🌿';

const SERVICES: ServiceRow[] = [
  { service: 'Reflexology', sessionMinutes: 40, price: 40, area: 'Foot & Leg', extra: '' },
  {
    service: 'Acupressure Massage',
    sessionMinutes: 60,
    price: 60,
    area: 'Body',
    extra: HOT_STONE_MARK,
  },
  {
    service: 'Acupressure Massage',
    sessionMinutes: 90,
    price: 90,
    area: 'Body',
    extra: HOT_STONE_MARK,
  },
  { service: 'Deep Tissue Massage', sessionMinutes: 60, price: 60, area: 'Body', extra: '' },
  {
    service: 'Chair Massage',
    sessionMinutes: 30,
    price: 40,
    area: 'Back & Shoulders',
    extra: '',
  },
  { service: 'Combination Massage', sessionMinutes: 70, price: 60, area: 'All', extra: HOT_STONE_MARK },
  { service: 'CBD Body Treatment', sessionMinutes: 60, price: 90, area: 'Body', extra: CBD_MARK },
  { service: 'Lavender Oil', sessionMinutes: 60, price: 70, area: 'Body', extra: '' },
  { service: 'Mugwort and Ginger Oil', sessionMinutes: 60, price: 70, area: 'Body', extra: '' },
  {
    service: 'Sandalwood and Peppermint Oil',
    sessionMinutes: 60,
    price: 70,
    area: 'Body',
    extra: '',
  },
  { service: 'Cupping Therapy', sessionMinutes: null, price: 30, area: 'Back & Shoulders', extra: '' },
  { service: 'Gua Sha', sessionMinutes: null, price: 40, area: 'Back & Shoulders', extra: '' },
  { service: 'Moxibustion Therapy', sessionMinutes: null, price: 70, area: 'Any', extra: '' },
];

function formatSessionMinutes(minutes: number | null) {
  if (minutes == null) {
    return '—';
  }
  return `${minutes} min`;
}

function sessionMinutesSortValue(minutes: number | null) {
  return minutes == null ? -1 : minutes;
}

const PricingSection = () => {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<'service' | 'price' | 'session' | 'area'>('service');

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? SERVICES.filter((s) => s.service.toLowerCase().includes(q))
      : [...SERVICES];

    const cmp = (a: ServiceRow, b: ServiceRow) => {
      switch (sort) {
        case 'price':
          return b.price - a.price;
        case 'session':
          return (
            sessionMinutesSortValue(b.sessionMinutes) -
            sessionMinutesSortValue(a.sessionMinutes)
          );
        case 'area':
          return a.area.localeCompare(b.area);
        default:
          return a.service.localeCompare(b.service);
      }
    };
    list.sort(cmp);
    return list;
  }, [query, sort]);

  return (
    <div className="bg-sand">
      <Section
        eyebrow="Pricing"
        title="Simple, honest rates"
        description="No memberships, no upsells — just great care at fair prices."
        id="pricing"
      >
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-5 rounded-3xl border border-border bg-white p-5 shadow-lg shadow-primary-900/5 sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              <h3 className="font-display text-xl font-semibold text-ink">
                Service menu
              </h3>

              <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
                <div className="relative min-w-0 sm:max-w-xs sm:flex-1">
                  <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                    <svg
                      className="size-4 shrink-0 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </div>
                  <input
                    type="search"
                    className="block w-full rounded-full border border-border bg-linen py-2.5 pe-4 ps-10 text-sm text-ink placeholder:text-gray-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                    placeholder="Search services"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    aria-label="Search services"
                  />
                </div>

                <div className="w-full shrink-0 sm:w-44">
                  <label htmlFor="pricing-sort" className="sr-only">
                    Sort by
                  </label>
                  <select
                    id="pricing-sort"
                    className="block w-full rounded-full border border-border bg-white px-4 py-2.5 text-sm text-ink shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                    value={sort}
                    onChange={(e) => setSort(e.target.value as typeof sort)}
                  >
                    <option value="service">Sort: Service</option>
                    <option value="price">Sort: Price</option>
                    <option value="session">Sort: Session</option>
                    <option value="area">Sort: Area</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-linen">
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3.5 text-start text-xs font-semibold uppercase tracking-wider text-gray-600"
                    >
                      Service
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3.5 text-start text-xs font-semibold uppercase tracking-wider text-gray-600"
                    >
                      Session
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3.5 text-start text-xs font-semibold uppercase tracking-wider text-gray-600"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3.5 text-end text-xs font-semibold uppercase tracking-wider text-gray-600"
                    >
                      Area
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3.5 text-end text-xs font-semibold uppercase tracking-wider text-gray-600"
                    >
                      Extra
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-white">
                  {rows.map((row) => (
                    <tr
                      key={`${row.service}-${row.sessionMinutes ?? '—'}-${row.price}-${row.area}`}
                      className="transition-colors hover:bg-primary-50"
                    >
                      <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-ink">
                        {row.service}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-sm text-ink-soft">
                        {formatSessionMinutes(row.sessionMinutes)}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-primary-700">
                        ${row.price}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-end">
                        <span className="inline-block rounded-full bg-sand px-3 py-1 text-xs font-medium text-ink-soft">
                          {row.area}
                        </span>
                      </td>
                      <td
                        className="whitespace-nowrap px-5 py-4 text-end text-base"
                        aria-label={row.extra ? 'Extra add-on available' : 'Extra: none'}
                      >
                        {row.extra || <span className="text-gray-400">—</span>}
                      </td>
                    </tr>
                  ))}
                  {rows.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-5 py-10 text-center text-sm text-ink-soft"
                      >
                        No services match “{query}”.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <p className="text-center text-xs text-gray-500">
              {HOT_STONE_MARK} hot stone add-on available · {CBD_MARK} CBD-infused treatment
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
};

export { PricingSection };
