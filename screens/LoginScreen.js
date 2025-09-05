import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  ActivityIndicator,
  StatusBar,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HeaderWave } from '../components/HeaderWave';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const iconScaleAnim = useRef(new Animated.Value(0)).current;
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;
  const loadingScaleAnim = useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    // Staggered animation sequence
    Animated.sequence([
      // Icon bounce animation
      Animated.spring(iconScaleAnim, {
        toValue: 1,
        tension: 10,
        friction: 3,
        useNativeDriver: true,
      }),
      // Main content fade and slide
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
      ]),
    ]).start();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]+$/.test(phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    startLoadingAnimation();
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      stopLoadingAnimation();
      Alert.alert('Success', 'Login successful!');
    }, 2000);
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Feature coming soon!');
  };

  const handleFocus = (field) => {
    setFocusedField(field);
    setErrors({ ...errors, [field]: null });
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleButtonPressIn = () => {
    Animated.spring(buttonScaleAnim, {
      toValue: 0.95,
      tension: 300,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handleButtonPressOut = () => {
    Animated.spring(buttonScaleAnim, {
      toValue: 1,
      tension: 300,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const startLoadingAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(loadingScaleAnim, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(loadingScaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopLoadingAnimation = () => {
    loadingScaleAnim.stopAnimation();
    loadingScaleAnim.setValue(1);
  };

  const handleSubmitPhone = () => {
    // Move focus to password field
    passwordInputRef.current?.focus();
  };

  const handleSubmitPassword = () => {
    Keyboard.dismiss();
    handleLogin();
  };

  const passwordInputRef = useRef(null);
  const phoneInputRef = useRef(null);

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="light-content"
      />
      <HeaderWave />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[
              styles.header,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.iconContainer}>
              <Animated.View 
                style={[
                  styles.iconContent,
                  {
                    transform: [{ scale: iconScaleAnim }],
                  },
                ]}
              >
                <Ionicons name="chatbubble-ellipses" size={60} color="#4A90E2" />
              </Animated.View>
            </View>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to your account</Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.form,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.inputContainer}>
              <View style={styles.inputContent}>
                <Ionicons name="call" size={20} color="#4A90E2" style={styles.inputIcon} />
                <TextInput
                  ref={phoneInputRef}
                  style={styles.input}
                  placeholder="Phone Number"
                  placeholderTextColor="#999"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  autoCapitalize="none"
                  returnKeyType="next"
                  onSubmitEditing={handleSubmitPhone}
                  blurOnSubmit={false}
                  onFocus={() => handleFocus('phone')}
                  onBlur={handleBlur}
                />
              </View>
            </View>
            {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

            <View style={styles.inputContainer}>
              <View style={styles.inputContent}>
                <Ionicons name="lock-closed" size={20} color="#4A90E2" style={styles.inputIcon} />
                <TextInput
                  ref={passwordInputRef}
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  returnKeyType="done"
                  onSubmitEditing={handleSubmitPassword}
                  onFocus={() => handleFocus('password')}
                  onBlur={handleBlur}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={20}
                    color="#4A90E2"
                  />
                </TouchableOpacity>
              </View>
            </View>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>

            <Animated.View
              style={[
                {
                  transform: [{ scale: buttonScaleAnim }],
                },
              ]}
            >
              <TouchableOpacity
                style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
                onPress={handleLogin}
                onPressIn={handleButtonPressIn}
                onPressOut={handleButtonPressOut}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                {isLoading ? (
                  <Animated.View
                    style={{
                      transform: [{ scale: loadingScaleAnim }],
                    }}
                  >
                    <ActivityIndicator color="#FFF" size="small" />
                  </Animated.View>
                ) : (
                  <Text style={styles.loginButtonText}>Login</Text>
                )}
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>

          <Animated.View
            style={[
              styles.footer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
    paddingTop: 220, // Account for taller header wave and status bar
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 50,
  },
  iconContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  iconContent: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  form: {
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 0,
  },
  eyeIcon: {
    marginLeft: 8,
    padding: 4,
  },
  errorText: {
    color: '#E74C3C',
    fontSize: 14,
    marginBottom: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 24,
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#666',
    fontSize: 16,
  },
  signUpText: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
