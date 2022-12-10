import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

async function getSolarData(start: string, end: string) {
  const url = `https://dashboard.elering.ee/api/system/with-plan?start=${start}&end=${end}`;

  const response = await fetch(url);

  const data = await response.json();
  return data;
}

const App = () => {
  const [solarData, setSolarData] = React.useState({});

  React.useEffect(() => {
    const now = new Date();

    const start = new Date(new Date(now).setHours(-12)).toISOString();
    const end = new Date(new Date(now).setHours(12)).toISOString();
    getSolarData(start, end)
      .then(data => setSolarData(data.data))
      .catch(err => console.warn(err));
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.mainText}>Electro</Text>
      <Text style={styles.mainText}>{JSON.stringify(solarData)}</Text>
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
});

export default App;
