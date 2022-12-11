import React from 'react';
import { ActivityIndicator, Button, SafeAreaView, StyleSheet, Text } from 'react-native';
import { Chart } from './Chart';
import { usePlanData } from './services/api';

export const App = () => {
  const { planData, loading, errorMessage } = usePlanData();
  const [centerTime, setCenterTime] = React.useState<Date>();

  const maxSolar = React.useMemo(() => {
    const [max] = planData.plan.sort(
      (d1, d2) => (d2?.solar_energy_forecast || 0) - (d1?.solar_energy_forecast || 0),
    );
    return max;
  }, [planData]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.mainText}>Electro</Text>
      <Text style={styles.bodyText}>Planned solar production for the next 24 hours</Text>

      {loading || !planData.plan?.length ? (
        <ActivityIndicator />
      ) : (
        <Chart data={planData} center={centerTime} />
      )}
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <Button
        title={`Max amount of ☀️ ⚡️ at ${new Date(maxSolar?.timestamp * 1000).getHours()} hours`}
        onPress={() => setCenterTime(new Date(maxSolar?.timestamp * 1000))}
      />
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
