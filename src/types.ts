export interface HourConsumption {
  timestamp: number;
  production: number;
  consumption: number;
  losses: number | null;
  frequency: number;
  system_balance: number;
  ac_balance: number;
  production_renewable: number;
  solar_energy_production: number;
}

export interface PlanResult {
  real: HourConsumption[];
  plan: HourConsumption[];
}
