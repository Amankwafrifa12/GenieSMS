import React, {useState} from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import Icon from '../components/Icon';
import LottieView from '../components/LottieView';
import { Platform, Image } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const [fileContent, setFileContent] = useState(null);

  const writeSampleFile = async () => {
    try {
      const fileUri = FileSystem.documentDirectory + 'genie_sample.txt';
      await FileSystem.writeAsStringAsync(fileUri, `Hello GenieSMS at ${new Date().toISOString()}`);
      Alert.alert('Saved', `Wrote sample file to ${fileUri}`);
    } catch (e) {
      Alert.alert('Error', String(e));
    }
  };

  const readSampleFile = async () => {
    try {
      const fileUri = FileSystem.documentDirectory + 'genie_sample.txt';
      const exists = await FileSystem.getInfoAsync(fileUri);
      if (!exists.exists) {
        setFileContent('No file saved yet.');
        return;
      }
      const content = await FileSystem.readAsStringAsync(fileUri);
      setFileContent(content);
    } catch (e) {
      setFileContent(String(e));
    }
  };

  const sendApiRequest = async () => {
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
      Alert.alert('API response', JSON.stringify(res.data, null, 2));
    } catch (e) {
      Alert.alert('API error', String(e));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Icon name="md-school" size={28} color="#007aff" />
        <Text style={[styles.title, {marginLeft:8}]}>GenieSMS</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Lottie Animation</Text>
        {Platform.OS === 'web' ? (
          <Image source={{uri: 'https://via.placeholder.com/320x150.png?text=GenieSMS'}} style={{height:150, width:'100%'}} resizeMode="cover" />
        ) : (
          <LottieView
            style={{height:150}}
            autoPlay
            loop
            source={{uri: 'https://assets8.lottiefiles.com/private_files/lf30_editor_azzz5j8x.json'}}
          />
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>SVG Example</Text>
        <Svg height="120" width="120">
          <Circle cx="60" cy="60" r="50" stroke="purple" strokeWidth="2.5" fill="plum" />
        </Svg>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>File read/write</Text>
        <Button title="Write sample file" onPress={writeSampleFile} />
        <View style={{height:8}} />
        <Button title="Read sample file" onPress={readSampleFile} />
        <View style={{height:8}} />
        {fileContent ? <Text style={{marginTop:8}}>{fileContent}</Text> : null}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>HTTP / Upload</Text>
        <Button title="Send sample API request" onPress={sendApiRequest} />
        <View style={{height:8}} />
        <Button title="Go to Upload screen" onPress={() => navigation.navigate('Upload')} />
      </View>

      <View style={{height:40}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingTop: 48 },
  header: { alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 28, fontWeight: '700' },
  card: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 12, elevation: 2 },
  cardTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8 }
});
