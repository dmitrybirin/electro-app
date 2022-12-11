import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';
import { Chart } from '../src/Chart';
import { PlanResult } from '../src/types';

const dummyData: PlanResult = {
  real: [
    {
      production: 10,
      consumption: 9,
      losses: null,
      frequency: 42,
      system_balance: 42,
      ac_balance: 42,
      production_renewable: 42,
      solar_energy_production: 500,
      timestamp: +new Date(),
    },
  ],
  plan: [
    {
      production: 10,
      consumption: 9,
      losses: null,
      frequency: 42,
      system_balance: 42,
      ac_balance: 42,
      production_renewable: 42,
      solar_energy_production: 500,
      timestamp: +new Date(),
    },
  ],
};

it('renders chart correctly', () => {
  const { toJSON } = render(<Chart data={dummyData} />);
  expect(toJSON()).toMatchSnapshot();
});
