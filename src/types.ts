export interface HourConsumptionReal {
  timestamp: number;
  production: number;
  consumption: number;
  losses: null;
  frequency: number;
  system_balance: number;
  ac_balance: number;
  production_renewable: number;
  solar_energy_production: number;
}

export interface HourConsumptionPlanned {
  timestamp: number;
  production: number;
  consumption: number;
  losses: number;
  frequency: number;
  system_balance: number;
  ac_balance: number;
  production_renewable: number;
  solar_energy_forecast: null;
  solar_energy_forecast_operator: null;
}

export interface PlanResult {
  real: HourConsumptionReal[];
  plan: HourConsumptionPlanned[];
}

export interface GraphData {
  hour: number;
  solar: number;
}
