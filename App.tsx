import React from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import {
  VictoryChart,
  VictoryBar,
  VictoryZoomContainer,
  VictoryAxis,
  VictoryLabel,
} from 'victory-native';

import { getSolarDataForNow } from './src/services/api';
import { getGraphTimeRange, getSolarPlanChartData, formatTimeTicks } from './src/services/charts';
import { GraphData } from './src/types';

const App = () => {
  const [solarData, setSolarData] = React.useState<GraphData[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  React.useEffect(() => {
    setLoading(true);
    getSolarDataForNow()
      .then(result => {
        if (result.success && result.data) {
          setSolarData(getSolarPlanChartData(result.data));
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
      {loading || !solarData.length ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.graph}>
          <VictoryChart
            height={500}
            domainPadding={24}
            scale={{ x: 'time', y: 'linear' }}
            containerComponent={
              <VictoryZoomContainer
                allowZoom={false}
                zoomDomain={{ x: getGraphTimeRange() }}
                allowPan={true}
              />
            }>
            <VictoryAxis
              tickLabelComponent={
                <VictoryLabel
                  backgroundPadding={8}
                  style={[styles.labelTitle, styles.labelSubTitle]}
                  angle={-45}
                />
              }
              tickValues={solarData.map(point => point.timestamp)}
              tickFormat={formatTimeTicks}
            />
            <VictoryAxis dependentAxis />

            <VictoryBar
              data={solarData}
              x="timestamp"
              y="solar"
              animate={{
                onLoad: { duration: 500 },
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
  labelTitle: {
    fontSize: 18,
  },
  labelSubTitle: {
    fontSize: 8,
  },
});

export default App;
