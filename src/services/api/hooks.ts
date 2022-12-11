import * as React from 'react';
import { PlanResult } from '../../types';
import { getSolarDataForNow } from './functions';

export function usePlanData() {
  const [planData, setPlanData] = React.useState<PlanResult>({ real: [], plan: [] });
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  React.useEffect(() => {
    setLoading(true);
    getSolarDataForNow()
      .then(result => {
        if (result.success && result.data) {
          setPlanData(result.data);
        } else {
          if (result.errorMessage) {
            setErrorMessage(result.errorMessage);
          }
        }
      })
      .catch(err => setErrorMessage(err))
      .finally(() => setLoading(false));
  }, []);

  return { planData, loading, errorMessage };
}
