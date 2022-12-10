import { GraphData, PlanResult } from '../../types';

export function getSolarRealChartData(planData: PlanResult): GraphData[] {
  return planData.plan.map(data => {
    return {
      value: data.solar_energy_forecast || 0,
      label: new Date(data.timestamp * 1000).getHours().toString(),
      labelComponent: null,
    };
  });
}
