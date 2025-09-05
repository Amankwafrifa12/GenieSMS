import React, {useState} from 'react';
import { View, Text, Button, Alert, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

export default function UploadScreen({ navigation }) {
  const [picked, setPicked] = useState(null);
  const [preview, setPreview] = useState(null);
  const [phoneColumn, setPhoneColumn] = useState(null);
  const [messageTemplate, setMessageTemplate] = useState('Hello {{name}}, this is GenieSMS');
  const [sending, setSending] = useState(false);

  const pickFile = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: false });
      if (res.type === 'success') {
        setPicked(res);
        setPreview(null);
        Alert.alert('Picked', JSON.stringify(res, null, 2));
        // Auto-parse CSV / Excel for preview
        const name = res.name || '';
        const lower = name.toLowerCase();
        if (lower.endsWith('.csv') || res.mimeType === 'text/csv') {
          await parseCsv(res.uri);
        } else if (lower.endsWith('.xls') || lower.endsWith('.xlsx') || res.mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
          await parseXlsx(res.uri);
        }
      }
    } catch (e) {
      Alert.alert('Error', String(e));
    }
  };

  const parseCsv = async (uri) => {
    try {
      const raw = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.UTF8 });
      const parsed = Papa.parse(raw, { header: true, dynamicTyping: true });
  const rows = parsed.data || [];
  const columns = rows.length ? Object.keys(rows[0]) : [];
  setPhoneColumn(columns.includes('phone') ? 'phone' : (columns[0] || null));
  setPreview({ type: 'csv', data: rows, columns });
    } catch (e) {
      Alert.alert('CSV parse error', String(e));
    }
  };

  const parseXlsx = async (uri) => {
    try {
      // Read as base64, convert to binary string for XLSX
  const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
  const wb = XLSX.read(base64, { type: 'base64' });
  const firstSheet = wb.Sheets[wb.SheetNames[0]];
  // Convert to array of objects using first row as header
  const json = XLSX.utils.sheet_to_json(firstSheet, { defval: '' });
  const rows = json || [];
  const columns = rows.length ? Object.keys(rows[0]) : [];
  setPhoneColumn(columns.includes('phone') ? 'phone' : (columns[0] || null));
  setPreview({ type: 'xlsx', data: rows, columns });
    } catch (e) {
      Alert.alert('Excel parse error', String(e));
    }
  };

  const uploadFile = async () => {
    if (!picked) {
      Alert.alert('No file', 'Please pick a file first');
      return;
    }
    try {
      // Read as binary base64 and upload to example endpoint (replace with your PHP API later)
      const fileUri = picked.uri;
      const base64 = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });

      // Example: POST to placeholder endpoint
      const body = {
        filename: picked.name || 'upload',
        data: base64,
        mimeType: picked.mimeType || 'application/octet-stream'
      };

      const res = await fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const json = await res.json();
      Alert.alert('Upload result', JSON.stringify(json.json || json, null, 2));
    } catch (e) {
      Alert.alert('Upload error', String(e));
    }
  };

  const buildMessage = (template, row) => {
    if (!template) return '';
    return template.replace(/{{\s*([^}]+)\s*}}/g, (_, key) => {
      const v = row && Object.prototype.hasOwnProperty.call(row, key) ? row[key] : '';
      return v == null ? '' : String(v);
    });
  };

  const extractPhone = (value) => {
    if (!value) return null;
    const digits = String(value).replace(/[^+0-9]/g, '');
    // Basic validation: require at least 7 digits
    const cleaned = digits.replace(/\D/g, '');
    return cleaned.length >= 7 ? digits : null;
  };

  const sendSmsPayload = async (items) => {
    // Demo: POST to placeholder. Replace with your PHP endpoint later.
    const endpoint = 'https://httpbin.org/post';
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items })
    });
    return res.json();
  };

  const sendSms = async (onlySelected = false) => {
    if (!preview || !preview.data || !preview.data.length) {
      Alert.alert('No data', 'No parsed rows to send');
      return;
    }
    if (!phoneColumn) {
      Alert.alert('No phone column', 'Please select which column contains phone numbers');
      return;
    }
    try {
      setSending(true);
      const rows = preview.data;
      const items = [];
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const phoneVal = row[phoneColumn];
        const phone = extractPhone(phoneVal);
        if (!phone) continue;
        const message = buildMessage(messageTemplate, row);
        items.push({ phone, message, meta: row });
      }
      if (!items.length) {
        Alert.alert('No valid numbers', 'No rows contained a valid phone number');
        setSending(false);
        return;
      }
      const result = await sendSmsPayload(items);
      Alert.alert('Send result', JSON.stringify(result, null, 2));
    } catch (e) {
      Alert.alert('Send error', String(e));
    } finally {
      setSending(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload file (demo)</Text>
      <Button title="Pick file" onPress={pickFile} />
      <View style={{height:8}} />
      <Button title="Upload picked file" onPress={uploadFile} />
      <View style={{height:12}} />
      {preview ? (
        <View style={{marginTop:12}}>
          <Text style={{fontWeight:'700', marginBottom:6}}>Preview ({preview.type})</Text>
          <ScrollView style={{maxHeight:160}}>
            {preview.columns && (
              <View style={{marginBottom:8}}>
                <Text style={{fontWeight:'700'}}>Columns:</Text>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                  {preview.columns.map((c) => (
                    <TouchableOpacity key={c} onPress={() => setPhoneColumn(c)} style={{padding:6, margin:4, backgroundColor: phoneColumn===c ? '#007aff':'#eee', borderRadius:6}}>
                      <Text style={{color: phoneColumn===c ? '#fff' : '#000'}}>{c}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <Text style={{fontSize:12, color:'#444', marginTop:6}}>Tap a column to set it as the phone number column (highlighted).</Text>
              </View>
            )}

            <Text style={{fontWeight:'700', marginBottom:6}}>Rows (first 10)</Text>
            {preview.data.slice(0,10).map((row, idx) => (
              <Text key={idx} style={{fontSize:12}}>{JSON.stringify(row)}</Text>
            ))}
          </ScrollView>

          <View style={{height:12}} />
          <Text style={{fontWeight:'700', marginBottom:6}}>Message template</Text>
          <TextInput value={messageTemplate} onChangeText={setMessageTemplate} style={{borderWidth:1, borderColor:'#ddd', padding:8, borderRadius:6}} />
          <Text style={{fontSize:12, color:'#444', marginTop:6}}>Use {{columnName}} placeholders to inject values from the row. Example: "Hello {{firstName}}, your code is {{code}}"</Text>

          <View style={{height:12}} />
          <Button title={sending ? 'Sending...' : 'Send SMS to parsed numbers'} onPress={() => sendSms(false)} disabled={sending} />
        </View>
      ) : null}
      <View style={{height:12}} />
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16, paddingTop:48 },
  title: { fontSize:20, fontWeight:'700', marginBottom:12 }
});
