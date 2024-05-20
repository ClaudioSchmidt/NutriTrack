/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import {
  SafeAreaView,
  //ScrollView,
  //StatusBar,
  //StyleSheet,
  //Text,
  //useColorScheme,
  //View,
} from 'react-native';

import //Colors,
//DebugInstructions,
//Header,
//LearnMoreLinks,
//ReloadInstructions,
'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): React.JSX.Element {
  //const isDarkMode = useColorScheme() === 'dark';

  /*const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };*/

  return (
    <SafeAreaView>
      <Dashboard />
    </SafeAreaView>
  );
}

export default App;
