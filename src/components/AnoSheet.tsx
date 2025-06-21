import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  Modal,
  Button,
  Image,
  TouchableOpacity
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withDelay,
  runOnJS,
} from 'react-native-reanimated';

function AnoSheet() {
  const isDarkMode = useColorScheme() === 'dark';

  const [modalVisible, setModalVisible] = useState(false); // controls <Modal />
  const [showModalContent, setShowModalContent] = useState(false); // controls animation

  const translateY = useSharedValue(600); // Off-screen by default
  const closeBtnOpacity = useSharedValue(0);

  const closeModal = () => {
    // Animate both modal and close button out
    closeBtnOpacity.value = withTiming(0, { duration: 200 });
    translateY.value = withTiming(600, {
      duration: 400,
      easing: Easing.in(Easing.exp),
    }, () => {
      runOnJS(setModalVisible)(false);
      runOnJS(setShowModalContent)(false);
    });
  };

  useEffect(() => {

    if (modalVisible) {
        console.log("Hell")
      setShowModalContent(true);
      translateY.value = withDelay(200, withTiming(0, {
        duration: 200,
        easing: Easing.out(Easing.cubic),
      }));
      closeBtnOpacity.value = withDelay(300, withTiming(1, { duration: 200 }));
    } else {
      closeBtnOpacity.value = 0;
    }
  }, [modalVisible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const closeBtnStyle = useAnimatedStyle(() => ({
    opacity: closeBtnOpacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <>
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        statusBarTranslucent
        onRequestClose={closeModal}
        onShow={() => setShowModalContent(true)}
      >
        <View
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
              <Animated.View style={closeBtnStyle}>
                <TouchableOpacity style={{ marginBottom: 10 }} onPress={closeModal}>
                  <Image source={require('./cancel.png')} style={{ width: 40, height: 40 }} />
                </TouchableOpacity>
              </Animated.View>
              <Animated.View
                style={[
                  {
                    height: 600,
                    width: "100%",
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#090040',
                    borderRadius: 20,
                  },
                  animatedStyle,
                ]}
              >
                <Text style={{ color: '#fff' }}>Modal</Text>
                <Button title="Close Modal" onPress={closeModal} />
              </Animated.View>
            </>
          )}
        </View>
      </Modal>

      <View style={styles.container}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View style={{ marginTop: StatusBar.currentHeight, padding: 20 }}>
          <Text>Hello</Text>
          <Button title="Open Modal" onPress={() => setModalVisible(true)} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AnoSheet;
