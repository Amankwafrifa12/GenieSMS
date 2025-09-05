import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform, Image } from 'react-native';
import LottieView from '../components/LottieView';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const t = setTimeout(() => {
      navigation.replace('Home');
    }, 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={styles.container}>
      {Platform.OS === 'web' ? (
        // Web fallback: show a static image or text to avoid dotlottie dependency
        <Image source={{ uri: 'https://via.placeholder.com/220x220.png?text=GenieSMS' }} style={{ width: 220, height: 220 }} />
      ) : (
        <LottieView
          source={{ uri: 'https://assets8.lottiefiles.com/private_files/lf30_editor_azzz5j8x.json' }}
          autoPlay
          loop={false}
          style={{ width: 220, height: 220 }}
        />
      )}
      <Text style={styles.title}>GenieSMS</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  title: { marginTop: 20, fontSize: 22, fontWeight: '700' }
});
