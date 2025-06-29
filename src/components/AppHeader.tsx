import { View, Text, Alert } from 'react-native'
import React from 'react'
import { Appbar } from 'react-native-paper'

const AppHeader = () => {
  return (
     <Appbar.Header >
      <Appbar.BackAction onPress={() => Alert.alert('Back pressed')} />
      <Appbar.Content title="Title" />
      <Appbar.Action icon="calendar" onPress={() => {}}  />
      <Appbar.Action icon="magnify" onPress={() => {}} />
      <Appbar.Action icon="camera" onPress={() => {}} />
    </Appbar.Header>
  )
}

export default AppHeader