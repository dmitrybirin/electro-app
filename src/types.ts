export interface HourConsumption {
  timestamp: number;
  production: number;
  consumption: number;
  losses: null;
  frequency: number;
  system_balance: number;
  ac_balance: number;
  production_renewable: number;
  solar_energy_forecast?: number;
  solar_energy_production: number;
  solar_energy_forecast_operator?: number;
}

export interface PlanResult {
  real: HourConsumption[];
  plan: HourConsumption[];
}

export interface GraphData {
  timestamp: Date;
  solar: number;
}
