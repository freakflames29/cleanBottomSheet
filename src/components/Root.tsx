import { View, Text,Button } from 'react-native'
import React from 'react'
import Sheet from './Sheet';

const Root = () => {

    const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Root</Text>
      <Sheet onClose={() => setModalVisible(false)} visible={modalVisible} backgroundColor='white'>
        <Text>Modal Content</Text>
      </Sheet>
      <Button title='Open modal' onPress={()=>setModalVisible(true)}/>
    </View>
  )
}

export default Root