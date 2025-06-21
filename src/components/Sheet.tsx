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

interface ModalProps {
  onClose?: () => void;
  backgroundColor?: string;
  visible?: boolean;
  children?: React.ReactNode;
  style?: object;
}

const Sheet: React.FC<ModalProps> = ({
  onClose,
  backgroundColor,
  visible,
  children,
}) => {
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
    if (visible) {
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
          <TouchableOpacity
            activeOpacity={1}
            onPress={onClose}
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: 'rgba(0,0,0,0.6)',
            }}
          />
          {/* Modal Content: does NOT close modal on press */}
          {showModalContent && (
            <>
              <Animated.View style={animtedStyle}>
                <Image
                  source={require('./cancel.png')}
                  style={{ width: 30, height: 30, marginBottom: 20 }}
                />
              </Animated.View>
              <Animated.View
                style={[
                  {
                    height: 600,
                    width: '100%',
                    backgroundColor: backgroundColor || '#471396',
                    borderTopRightRadius: 40,
                    borderTopLeftRadius: 40,
                  },
                  animtedStyle,
                ]}
              >
                {children}
              </Animated.View>
            </>
          )}
        </View>
      </Modal>
    
    </>
  );
};

export default Sheet;
