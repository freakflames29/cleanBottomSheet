import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Image,
  BackHandler,
} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  runOnJS,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Button } from 'react-native-paper';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const CleanBottomSheet = () => {
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
      sv.value = withDelay(100, withSpring(0, { damping: 20, stiffness: 100 }));
    } else {
      sv.value = 600;
    }
  }, [modalShow]);
  React.useEffect(() => {
    if (!modalShow) return;

    const onBackPress = () => {
      setModalShow(false);
      return true; // Prevent default back action
    };

    const subs = BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => {
      subs.remove();
    };
  }, [modalShow]);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {modalShow && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          {/* Overlay: closes modal on press */}
          <Pressable
            style={{
              ...StyleSheet.absoluteFillObject,
              // backgroundColor:"blue"
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
            onPress={() => setModalShow(false)}
          />

          {/* Bottom Sheet: does NOT close modal on press */}
          <GestureDetector gesture={gesture}>
            <Animated.View
              style={[
                {
                  position: 'relative',
                  height: 600,
                  width: '100%',
                  backgroundColor: 'tomato',
                  borderTopRightRadius: 30,
                  borderTopLeftRadius: 30,
                },
                animatedStyle,
              ]}
            >
              <Pressable
                style={{
                  position: 'absolute',
                  top: -50,
                  left: '50%',
                  transform: [{ translateX: -15 }], // half of image width (30/2)
                  zIndex: 10,
                }}
                onPress={() => setModalShow(false)}
              >
                <Image
                  source={require('./close.png')}
                  style={{
                    width: 30,
                    height: 30,
                    alignSelf: 'center',
                    marginTop: 10,
                  }}
                />
              </Pressable>
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

      <Button
        mode="contained"
        onPress={() => {
          setModalShow(true);
          change();
        }}
        style={{ margin: 10 }}
      >
        Open Bottom Sheet
      </Button>
    </View>
  );
};

export default CleanBottomSheet;
