import { addHours, isToday, isYesterday, isTomorrow } from 'date-fns';
import { GraphData, HourConsumption, PlanResult } from '../../types';

function makeObjectWithTimestampKey(data: HourConsumption[]): Record<number, HourConsumption> {
  return data.reduce((acc, next) => ({ ...acc, [next.timestamp]: next }), {});
}

export function getSolarChartData(planData: PlanResult): GraphData[] {
  const realData = makeObjectWithTimestampKey(planData.real);

  const plannedData = makeObjectWithTimestampKey(planData.plan);
  // We are merging the objects here, cause realdata don't have all timestampts needed, so we're replacing missing timestamps by planned

  return Object.values({ ...plannedData, ...realData }).map(data => {
    return {
      timestamp: new Date(data.timestamp * 1000),
      solar: data?.solar_energy_production || data?.solar_energy_forecast || 0,
      fill: data?.solar_energy_forecast ? 'blue' : 'red',
    };
  });
}

export function getGraphTimeRange(centerTime?: Date): [Date, Date] {
  const now = new Date();
  const time = centerTime || now;
  return [addHours(time, -3), addHours(time, 3)];
}

export function formatTimeTicks(tick: Date): string {
  let subTitle = '';

  if (isToday(tick)) {
    subTitle = 'today';
  }

  if (isYesterday(tick)) {
    subTitle = 'yesterday';
  }
  if (isTomorrow(tick)) {
    subTitle = 'tomorrow';
  }

  return `${tick.getHours()}h\n${subTitle}`;
}
