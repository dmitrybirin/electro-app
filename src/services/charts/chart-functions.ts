import { GraphData, PlanResult } from '../../types';

export function getSolarPlanChartData(planData: PlanResult): GraphData[] {
  return planData.plan.map(data => {
    return {
      hour: new Date(data.timestamp * 1000).getHours(),
      solar: data.solar_energy_forecast || 0,
    };
  });
}
