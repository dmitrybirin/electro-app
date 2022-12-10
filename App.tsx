import React from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { VictoryChart, VictoryBar, VictoryZoomContainer, VictoryAxis } from 'victory-native';

import { getSolarDataForNow } from './src/services/api';
import { getSolarRealChartData } from './src/services/charts';
import { GraphData } from './src/types';

const App = () => {
  const [solarData, setSolarData] = React.useState<GraphData[] | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  React.useEffect(() => {
    setLoading(true);
    getSolarDataForNow()
      .then(result => {
        if (result.success && result.data) {
          setSolarData(getSolarRealChartData(result.data));
        } else {
          if (result.errorMessages) {
            setErrorMessage(result.errorMessages[0]);
          }
        }
      })
      .catch(err => setErrorMessage(err))
      .finally(() => setLoading(false));
  }, []);

  const data = solarData;

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.mainText}>Electro</Text>
      <Text style={styles.bodyText}>Planned solar production for the next 24 hours</Text>
      {loading || !data ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.graph}>
          <VictoryChart
            domainPadding={24}
            containerComponent={
              <VictoryZoomContainer allowZoom={false} zoomDomain={{ x: [18, 24] }} />
            }>
            <VictoryAxis
              tickValues={data.map(point => point.hour)}
              tickFormat={tick => `${tick}h`}
            />
            <VictoryAxis dependentAxis />

            <VictoryBar
              data={data}
              x="hour"
              y="solar"
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 },
              }}
            />
          </VictoryChart>
        </View>
      )}
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
  graph: {
    paddingTop: 32,
  },
});

export default App;
