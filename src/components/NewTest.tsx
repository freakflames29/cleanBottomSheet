import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import CleanBottomSheet from './CleanBotomSheet';

const NewTest = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={{ flex: 1, }}>
      <Button onPress={() => setShowModal(true)} style={{marginTop:200}}>Open Modal</Button>
      <CleanBottomSheet visible={showModal} onClose={() => setShowModal(false)} showCross={false}>
         <ScrollView style={{ flex: 1,width: '100%' }}>
          {/* add a long view so that it can scroll */}
        {Array.from({ length: 30 }).map((_, i) => (
            <View
              key={i}
              style={{
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: '#ccc',
                backgroundColor: i % 2 === 0 ? '#fff' : '#f9f9f9',
              }}
            >
              <Text>Item {i + 1}</Text>
            </View>
          ))}
        </ScrollView>
      </CleanBottomSheet>
    </View>
  );
};

export default NewTest;
