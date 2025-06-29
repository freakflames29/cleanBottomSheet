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


interface ModalProps {  
  onClose?: () => void;
  backgroundColor?: string;
  height?: number;
  visible?: boolean;
  borderRadius?: number;

}

const CleanBottomSheet:React.FC<ModalProps> = ({
  onClose,
  backgroundColor = '#fff',
  height = 600,
  visible = false,
  borderRadius = 30,
  children
}) => {
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
        sv.value = withTiming(600, {}, () => {
          if (onClose) {
            runOnJS(onClose)();
          }
        });
      } else {
        // Snap back up
        sv.value = withTiming(0);
      }
    });

  React.useEffect(() => {
    if (visible) {
      sv.value = withDelay(100, withSpring(0, { damping: 20, stiffness: 100 }));
    } else {
      sv.value = 600;
    }
  }, [visible]);
  React.useEffect(() => {
    if (!visible) return;

    const onBackPress = () => {
      // setModalShow(false);
      onClose?.();
      return true; // Prevent default back action
    };

    const subs = BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => {
      subs.remove();
    };
  }, [visible]);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {visible && (
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
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
            onPress={onClose}
          />

          {/* Bottom Sheet */}
          <GestureDetector gesture={gesture}>
            <Animated.View
              style={[
                {
                  position: 'relative',
                  height: height,
                  width: '100%',
                  backgroundColor: backgroundColor || 'tomato', // <-- SHEET background
                  borderTopRightRadius: borderRadius,
                  borderTopLeftRadius: borderRadius,
                },
                animatedStyle,
              ]}
            >
              <Pressable
                style={{
                  position: 'absolute',
                  top: -50,
                  left: '50%',
                  transform: [{ translateX: -15 }],
                  zIndex: 10,
                }}
                onPress={onClose}
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
              {children}
            </Animated.View>
          </GestureDetector>
        </View>
      )}
     
    </View>
  );
};

export default CleanBottomSheet;
