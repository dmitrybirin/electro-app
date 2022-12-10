import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { getSolarDataForNow } from './src/services/api';
import { PlanResult } from './src/types';

const App = () => {
  const [solarData, setSolarData] = React.useState<PlanResult>({ real: [], plan: [] });
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  React.useEffect(() => {
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
      .catch(err => setErrorMessage(err));
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.mainText}>Electro</Text>
      <Text style={styles.mainText}>{JSON.stringify(solarData.plan)}</Text>
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
  errorMessage: {
    fontSize: 24,
    color: 'red',
  },
});

export default App;
