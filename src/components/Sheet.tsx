import {
  View,
  Text,
  Button,
  StatusBar,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  Easing,
  withDelay,
  runOnJS,
} from 'react-native-reanimated';
const Sheet = () => {
  const sv = useSharedValue(1000);
  const [modalShow, setModalShow] = useState(false);
  const [showModalContent, setShowModalContent] = useState(false);
  const inValue = () => {
    // console.log('hi');
    sv.value = withDelay(
      400,
      withTiming(0, {
        duration: 100,
        easing: Easing.out(Easing.cubic),
      }),
    );
  };
  const animtedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: sv.value }],
  }));

  useEffect(() => {
    if (modalShow) {
      setShowModalContent(true);
      sv.value = withDelay(
        300,
        withTiming(0, {
          duration: 350,
          easing: Easing.out(Easing.cubic),
        }),
      );
    } else {
      (sv.value = 1000), setShowModalContent(false);
      // sv.value = withTiming(1000, { duration: 400 }, finished => {
      //   if (finished) {
      //     runOnJS(setShowModalContent)(false);
      //   }
      // });
    }
  }, [modalShow]);
  return (
    <>
      <Modal
        visible={modalShow}
        animationType="none"
        transparent
        statusBarTranslucent
        onRequestClose={() => setModalShow(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setModalShow(false)}
          style={[
            StyleSheet.absoluteFillObject,
            {
              justifyContent: 'flex-end',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.6)',
              zIndex: 1000,
            },
          ]}
        >
          {showModalContent && (
            <>
              <Animated.View style={animtedStyle}>
                <Image
                  source={require('./cancel.png')}
                  style={{ width: 30, height: 30,marginBottom:20 }}
                />
              </Animated.View>
              <Animated.View
                style={[
                  {
                    height: 600,
                    width: '100%',
                    backgroundColor: '#471396',
                    borderTopRightRadius: 40,
                    borderTopLeftRadius: 40,
                  },
                  animtedStyle,
                ]}
              > 
                <Text>Hello</Text>
              </Animated.View>
            </>
          )}
        </TouchableOpacity>
      </Modal>
      <View
        style={{
          marginTop: StatusBar.currentHeight,
          padding: 20,
          flex: 1,
          // backgroundColor: 'pink',
          //   justifyContent: 'flex-end',
        }}
      >
        <Button title="OPen modal" onPress={() => setModalShow(!modalShow)} />
      </View>
    </>
  );
};

export default Sheet;
