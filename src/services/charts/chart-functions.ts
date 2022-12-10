import { addHours, isToday, isYesterday, isTomorrow } from 'date-fns';
import { GraphData, PlanResult } from '../../types';

export function getSolarPlanChartData(planData: PlanResult): GraphData[] {
  return planData.plan.map(data => {
    return {
      timestamp: new Date(data.timestamp * 1000),
      solar: data.solar_energy_forecast || 0,
    };
  });
}

export function getGraphTimeRange(): [Date, Date] {
  const now = new Date();
  return [addHours(now, -3), addHours(now, 3)];
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
