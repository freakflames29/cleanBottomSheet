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
const Root = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const poistion = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: poistion.value }],
  }));

  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    
      <Button title="Show modal" onPress={() => setModalVisible(true)} />
      <Sheet visible={modalVisible} onClose={() => setModalVisible(false)} backgroundColor='white'>
        <View style={{width:"100%",padding:20}}>
          <Text>Hello</Text>
        </View>
      </Sheet>
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
