import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React from 'react';
import Sheet from './Sheet';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
// import BottomModalSheet from 'react-native-animated-bottom-modal'
import {BottomModalSheet} from 'animated-bottom-modal-reactnative'
const Root = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const poistion = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: poistion.value }],
  }));

  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    
      <Button title="Show modal" onPress={() => setModalVisible(true)} />
      <BottomModalSheet visible={modalVisible} onClose={()=>setModalVisible(false)} height={500} >
        <View style={{flex:1,width:"100%",padding:29,justifyContent:"center",alignItems:"center"}}>
          <Text style={{fontSize:25}}>The awesome content</Text>
        </View>
      </BottomModalSheet>
    </View>
  );
};
const styles = StyleSheet.create({
  box: {
    width: 200,
    height: 200,
    backgroundColor: 'tomato',
  },
});

export default Root;
