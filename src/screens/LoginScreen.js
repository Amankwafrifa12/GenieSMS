import React, {useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '../components/Icon';

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  const onLogin = () => {
    // Placeholder: validate credentials with backend
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row', alignItems:'center', marginBottom:12}}>
        <Icon name="md-log-in" size={20} color="#007aff" />
        <Text style={[styles.title, {marginLeft:8}]}>Login</Text>
      </View>

      <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} style={styles.input} keyboardType="phone-pad" />

      <View style={styles.row}>
        <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={[styles.input, {flex:1}]} secureTextEntry={!show} />
        <TouchableOpacity onPress={() => setShow(!show)} style={styles.showBtn}>
          <Text style={{color:'#007aff'}}>{show ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
      </View>

      <Button title="Login" onPress={onLogin} />

      <View style={{height:12}} />
      <View style={styles.bottomRow}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={{marginLeft:8}}>
          <Text style={{color:'#007aff'}}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16, paddingTop:80 },
  title: { fontSize:22, fontWeight:'700', marginBottom:16 },
  input: { borderWidth:1, borderColor:'#ddd', padding:10, borderRadius:6, marginBottom:12 },
  row: { flexDirection:'row', alignItems:'center' },
  showBtn: { padding:10, marginLeft:8 },
  bottomRow: { flexDirection:'row', alignItems:'center', marginTop:16 }
});
