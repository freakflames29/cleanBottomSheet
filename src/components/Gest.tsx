import { View, Text, Modal, TouchableOpacity, Pressable, StyleSheet, Image } from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  runOnJS,
  withTiming,
} from 'react-native-reanimated';
import { Button } from 'react-native-paper';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const Gest = () => {
  const sv = useSharedValue(600);
  const [modalShow, setModalShow] = React.useState(false);
  const change = () => {
    sv.value = withSpring(sv.value + 50);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: sv.value }],
    };
  });

  const gesture = Gesture.Pan()
    .onStart(() => {
      console.log('Gesture started');
    })
    .onUpdate(e => {
      if (e.translationY > 0) {
        sv.value = e.translationY;
      }
    })
    .onEnd(e => {
      console.log('Gesture ended');
      if (e.translationY > 200) {
        // Animate out, then hide modal
        sv.value = withTiming(600, {}, () => runOnJS(setModalShow)(false));
      } else {
        // Snap back up
        sv.value = withTiming(0);
      }
    });

  React.useEffect(() => {
    if (modalShow) {
      sv.value = withDelay(
        50,
        withSpring(0, { damping: 20, stiffness: 90 })
      );
    } else {
      sv.value = (600);
    }
  }, [modalShow]);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {modalShow && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {/* Overlay: closes modal on press */}
          <Pressable
            style={{
              ...StyleSheet.absoluteFillObject,
              // backgroundColor:"blue"
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
            onPress={() => setModalShow(false)}
          />
        <Pressable style={{marginBottom:20}}>
          <Image source={require("./cancel.png")} style={{width:30,height:30}}/>
        </Pressable>
          {/* Bottom Sheet: does NOT close modal on press */}
          <GestureDetector gesture={gesture}>
            <Animated.View
              style={[
                {
                  height: 600,
                  width: "100%",
                  backgroundColor: 'tomato',
                  borderTopRightRadius: 30,
                  borderTopLeftRadius: 30,
                },
                animatedStyle,
              ]}
            >
              <Button
                mode="contained"
                onPress={() => setModalShow(false)}
                style={{ margin: 10 }}
              >
                close
              </Button>
              <Text>Gest</Text>
            </Animated.View>
          </GestureDetector>
        </View>
      )}
      <Button mode="contained" onPress={() => setModalShow(true)}>
        Open modal
      </Button>
    </View>
  );
};

export default Gest;
