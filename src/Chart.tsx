import React from 'react';
import { StyleSheet } from 'react-native';
import {
  VictoryChart,
  VictoryBar,
  VictoryZoomContainer,
  VictoryAxis,
  VictoryLabel,
} from 'victory-native';

import { getGraphTimeRange, getSolarChartData, formatTimeTicks } from './services/charts';
import { PlanResult } from './types';

interface ChartProps {
  data: PlanResult;
}

export const Chart: React.FC<ChartProps> = ({ data }) => {
  const chartData = getSolarChartData(data);

  return (
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
          <VictoryLabel backgroundPadding={4} style={[styles.labelTitle, styles.labelSubTitle]} />
        }
        tickValues={chartData.map(point => point.timestamp)}
        tickFormat={formatTimeTicks}
      />
      <VictoryAxis dependentAxis />

      <VictoryBar
        barWidth={24}
        data={chartData}
        x="timestamp"
        y="solar"
        animate={{
          onLoad: { duration: 500 },
        }}
      />
    </VictoryChart>
  );
};

const styles = StyleSheet.create({
  labelTitle: {
    fontSize: 18,
  },
  labelSubTitle: {
    fontSize: 8,
  },
});
