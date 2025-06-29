import { View, Text, Alert } from 'react-native';
import React from 'react';
import { Appbar, Button, Chip, useTheme } from 'react-native-paper';
import AppHeader from './AppHeader';

const PaperTest = () => {
    const theme = useTheme()
    console.log("The theme colors ",theme.colors)
  return (
    <>
        <AppHeader/>

        <View>
           <Button mode='contained'>Hello</Button>
           <Chip mode='flat' style={{backgroundColor:theme.colors.secondary}} textStyle={{color:theme.colors.primary}}>Hello chip</Chip>
        </View>
    </>
  );
};

export default PaperTest;
