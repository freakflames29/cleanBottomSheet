import { View, Text,Button, ScrollView } from 'react-native'
import React from 'react'
import Sheet from './Sheet';

const Root = () => {

    const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Root</Text>
      <Sheet onClose={() => setModalVisible(false)} visible={modalVisible} backgroundColor='white' height={800}>
        <Text>Hello</Text>
      </Sheet>
      <Button title='Open modal' onPress={()=>setModalVisible(true)}/>
    </View>
  )
}

export default Root