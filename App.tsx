/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Sheet from './src/components/Sheet';
import AnoSheet from './src/components/AnoSheet';
import Root from './src/components/Root';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  PaperProvider,
  MD3DarkTheme,
  MD3Theme,
  MD3LightTheme,
  Button,
} from 'react-native-paper';
import PaperTest from './src/components/PaperTest';
import CleanBottomSheet from './src/components/CleanBotomSheet';
import { useState } from 'react';
import NewTest from './src/components/NewTest';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const myTheme = {
    ...(isDarkMode ? MD3DarkTheme : MD3LightTheme),
    colors: {
      ...(isDarkMode ? MD3DarkTheme.colors : MD3LightTheme.colors),
      primary: 'pink',
      onPrimary: 'white',
      primaryContainer: '#ffd1dc',
      onPrimaryContainer: '#000',

      secondary: 'blue',
      onSecondary: 'white',

      background: 'yellow',
      onBackground: 'black',

      surface: 'tomato',
      onSurface: '#fff',
    },
  };

  return (
    <GestureHandlerRootView>
      <PaperProvider theme={myTheme}>
        <View style={styles.container}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <NewTest />
        </View>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
