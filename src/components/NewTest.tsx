import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import CleanBottomSheet from './CleanBotomSheet';

const NewTest = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={{ flex: 1}}>
      {/* <Button onPress={() => setShowModal(true)}>Open Modal</Button> */}
      <CleanBottomSheet/>
    </View>
  );
};

export default NewTest;
