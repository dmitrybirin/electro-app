import { addHours } from 'date-fns';
import { PlanResult } from '../../types';
import { get } from './request';

const DEFAULT_OFFSET = 12;

export async function getSolarData(start: Date, end: Date) {
  const url = `https://dashboard.elering.ee/api/system/with-plan?start=${start.toISOString()}&end=${end.toISOString()}`;

  const data = await get<PlanResult>(url);
  return data;
}

export async function getSolarDataForNow(offset?: number) {
  if (offset && offset < 0) {
    throw new Error('Offset should be negative');
  }
  const now = new Date();

  const start = addHours(now, (offset || DEFAULT_OFFSET) * -1);
  const end = addHours(now, offset || DEFAULT_OFFSET);
  const data = await getSolarData(start, end);

  return data;
}
