import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HeaderWave } from '../components/HeaderWave';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const loginButtonScaleAnim = useRef(new Animated.Value(1)).current;
  const signUpButtonScaleAnim = useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLoginPressIn = () => {
    Animated.spring(loginButtonScaleAnim, {
      toValue: 0.95,
      tension: 300,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handleLoginPressOut = () => {
    Animated.spring(loginButtonScaleAnim, {
      toValue: 1,
      tension: 300,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handleSignUpPressIn = () => {
    Animated.spring(signUpButtonScaleAnim, {
      toValue: 0.95,
      tension: 300,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handleSignUpPressOut = () => {
    Animated.spring(signUpButtonScaleAnim, {
      toValue: 1,
      tension: 300,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="light-content"
      />
      <HeaderWave />
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="chatbubble-ellipses" size={80} color="#4A90E2" />
          </View>

          <Text style={styles.title}>Welcome to</Text>
          <Text style={styles.appName}>GenieSMS</Text>
          <Text style={styles.subtitle}>Your messaging solution</Text>

          <View style={styles.buttonContainer}>
            <Animated.View
              style={[
                {
                  transform: [{ scale: loginButtonScaleAnim }],
                },
              ]}
            >
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
                onPressIn={handleLoginPressIn}
                onPressOut={handleLoginPressOut}
                activeOpacity={0.8}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View
              style={[
                {
                  transform: [{ scale: signUpButtonScaleAnim }],
                },
              ]}
            >
              <TouchableOpacity
                style={styles.signUpButton}
                onPress={handleSignUp}
                onPressIn={handleSignUpPressIn}
                onPressOut={handleSignUpPressOut}
                activeOpacity={0.8}
              >
                <Text style={styles.signUpButtonText}>Sign Up</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 200, // Account for header wave
  },
  content: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: '400',
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  appName: {
    fontSize: 36,
    fontWeight: '700',
    color: '#4A90E2',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 60,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  loginButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  signUpButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4A90E2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  signUpButtonText: {
    color: '#4A90E2',
    fontSize: 18,
    fontWeight: '700',
  },
});
