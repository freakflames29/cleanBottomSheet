import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import CleanBottomSheet from './CleanBotomSheet';

const NewTest = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={{ flex: 1, marginTop:200,justifyContent: 'center', alignItems: 'center' }}>
      <Button onPress={() => setShowModal(true)}>Open Modal</Button>

      <CleanBottomSheet
        visible={showModal}
        onClose={() => setShowModal(false)}
        height={600}
        backgroundColor='red'
        borderRadius={30}
      >
        <Text>This is. atext</Text>
      </CleanBottomSheet>
    </View>
  );
};

export default NewTest;
