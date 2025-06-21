import {
  View,
  Text,
  Button,
  StatusBar,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
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
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
interface ModalProps {
  onClose?: () => void;
  backgroundColor?: string;
  visible?: boolean;
  children?: React.ReactNode;
  style?: object;
  height?: number;
}

const Sheet: React.FC<ModalProps> = ({
  onClose,
  backgroundColor,
  visible,
  children,
  height,
}) => {
  const sv = useSharedValue(1000);
  const opacityValue = useSharedValue(0);
  const [showModalContent, setShowModalContent] = useState(false);

  const animtedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: sv.value }],
  }));

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: opacityValue.value,
  }));

  useEffect(() => {
    if (visible) {
      setShowModalContent(true);
      opacityValue.value = 1;
      sv.value = withDelay(
        300,
        withTiming(0, {
          duration: 350,
          easing: Easing.out(Easing.cubic),
        }),
      );
    } else {
      opacityValue.value = 0;
      (sv.value = 1000), setShowModalContent(false);
  
    }
  }, [visible]);
  return (
    <>
      <Modal
        visible={visible}
        animationType="none"
        transparent
        statusBarTranslucent
        onRequestClose={onClose}
      >
        
          <View
            style={[
              StyleSheet.absoluteFillObject,
              { justifyContent: 'flex-end', alignItems: 'center' },
            ]}
          >
            {/* Overlay: closes modal on press */}
            <Pressable
              onPress={onClose}
              style={{
                ...StyleSheet.absoluteFillObject,
                // backgroundColor: 'red',
                backgroundColor: 'rgba(0,0,0,0.6)',
                zIndex: 999,
              }}
            />
            {/* Modal Content: does NOT close modal on press */}
            {showModalContent && (
              <>
                <Animated.View
                  style={[
                    {
                      width: '100%',
                      alignItems: 'center',
                      zIndex: 1000,
                    },
                    animtedStyle,
                    opacityStyle,
                  ]}
                >
                  <Pressable
                    // activeOpacity={1}
                    onPress={onClose}
                    style={styles.closeButton}
                  >
                    <Image
                      source={require('./close.png')}
                      style={{ width: 30, height: 30, marginBottom: 20 }}
                    />
                  </Pressable>

                  <View
                    style={[
                      {
                        height: height || 600,
                        width: '100%',
                        backgroundColor: backgroundColor || '#471396',
                        borderTopRightRadius: 40,
                        borderTopLeftRadius: 40,
                      },
                    ]}
                  >
                    {children}
                  </View>
                </Animated.View>
              </>
            )}
          </View>
       
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  closeButton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Sheet;
