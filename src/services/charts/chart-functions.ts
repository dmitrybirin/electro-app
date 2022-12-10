import { addHours } from 'date-fns';
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
  return [now, addHours(now, 5)];
}
