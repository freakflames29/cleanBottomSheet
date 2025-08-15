import { View, Text } from 'react-native';
import React from 'react';
import {CleanBotomSheet} from "animated-bottom-modal-reactnative"
import { Button } from 'react-native-paper';
const Latest = () => {
    const [isOpen, setIsOpen] = React.useState(false);
  return (
    <View style={{ flex: 1 }}>

        <CleanBotomSheet visible={isOpen} onClose={() => setIsOpen(false)} height={600} showCross={false}>
            <Text>Modal content</Text>
        </CleanBotomSheet>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       <Button onPress={()=>setIsOpen(true)}>Open modal</Button>
      </View>
    </View>
  );
};

export default Latest;
