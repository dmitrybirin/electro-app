import React from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text } from 'react-native';
import { Chart } from './src/Chart';

import { getSolarDataForNow } from './src/services/api';
import { PlanResult } from './src/types';

const App = () => {
  const [solarData, setSolarData] = React.useState<PlanResult>({ real: [], plan: [] });
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  React.useEffect(() => {
    setLoading(true);
    getSolarDataForNow()
      .then(result => {
        if (result.success && result.data) {
          setSolarData(result.data);
        } else {
          if (result.errorMessages) {
            setErrorMessage(result.errorMessages[0]);
          }
        }
      })
      .catch(err => setErrorMessage(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.mainText}>Electro</Text>
      <Text style={styles.bodyText}>Planned solar production for the next 24 hours</Text>
      {loading || !solarData.plan?.length ? <ActivityIndicator /> : <Chart data={solarData} />}
      <Text style={styles.errorMessage}>{errorMessage}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'aqua',
  },
  mainText: {
    fontSize: 24,
  },
  bodyText: {
    fontSize: 16,
  },
  errorMessage: {
    fontSize: 24,
    color: 'red',
  },
  labelTitle: {
    fontSize: 18,
  },
  labelSubTitle: {
    fontSize: 8,
  },
});

export default App;
