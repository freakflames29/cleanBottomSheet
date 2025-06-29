import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  BackHandler,
} from 'react-native';
import React, { useEffect } from 'react';
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

interface CleanBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  height?: number;
  backgroundColor?: string;
  borderRadius?: number;
  children?: React.ReactNode;
  showCross?: boolean;
}

const CleanBottomSheet: React.FC<CleanBottomSheetProps> = ({
  visible,
  onClose,
  height = 600,
  backgroundColor = '#fff',
  borderRadius = 30,
  children,
  showCross = true,
}) => {
  const sv = useSharedValue(height);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: sv.value }],
  }));

  const gesture = Gesture.Pan()
    .onStart(() => {
      // Optional: console.log('Gesture started');
    })
    .onUpdate(e => {
      if (e.translationY > 0) {
        sv.value = e.translationY;
      }
    })
    .onEnd(e => {
      if (e.translationY > 200) {
        sv.value = withTiming(height, {}, () => runOnJS(onClose)());
      } else {
        sv.value = withTiming(0);
      }
    });

  useEffect(() => {
    if (visible) {
      sv.value = withDelay(100, withSpring(0, { damping: 20, stiffness: 100 }));
    } else {
      sv.value = height;
    }
  }, [visible, height]);

  useEffect(() => {
    if (!visible) return;

    const onBackPress = () => {
      onClose();
      return true;
    };

    const subs = BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => {
      subs.remove();
    };
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
      pointerEvents="box-none"
    >
      {/* Overlay */}
      <Pressable
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
        onPress={onClose}
      />

      {/* Bottom Sheet */}
      <Animated.View
        style={[
          {
            position: 'relative',
            height,
            width: '100%',
            backgroundColor,
            // overflow: 'hidden',
            borderTopRightRadius: borderRadius,
            borderTopLeftRadius: borderRadius,
          },
          animatedStyle,
        ]}
      >
        {/* Drag handle area only */}
        <GestureDetector gesture={gesture}>
          <View
            style={{
              height: 40,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              // Optionally add a visual handle here
            }}
          >
           { showCross && <Pressable
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
            </Pressable>}
            {/* Optional: Add a drag indicator */}
            <View
              style={{
                width: 40,
                height: 5,
                borderRadius: 2.5,
                backgroundColor: "#ccc",
                marginTop: 30,
              }}
            />
          </View>
        </GestureDetector>
        {/* Sheet content (scrollable) */}
        <View style={{ flex: 1 }}>{children}</View>
      </Animated.View>
    </View>
  );
};

export default CleanBottomSheet;
