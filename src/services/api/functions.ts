import { PlanResult } from '../../types';
import { get } from './request';

const DEFAULT_OFFSET = 12;

export async function getSolarData(start: string, end: string) {
  const url = `https://dashboard.elering.ee/api/system/with-plan?start=${start}&end=${end}`;

  const data = await get<PlanResult>(url);
  return data;
}

export async function getSolarDataForNow(offset?: number) {
  if (offset && offset < 0) {
    throw new Error('Offset should be negative');
  }
  const now = new Date();

  const start = new Date(new Date(now).setHours((offset || DEFAULT_OFFSET) * -1)).toISOString();
  const end = new Date(new Date(now).setHours(offset || DEFAULT_OFFSET)).toISOString();

  return getSolarData(start, end);
}
