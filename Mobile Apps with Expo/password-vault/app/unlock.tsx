import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { supabase } from '../lib/supabase';
import { useAuth } from '../providers/AuthProvider';
import { clearMasterKey, decryptData, setMasterKey } from '../utils/crypto';

export default function UnlockScreen() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { session, setMasterPasswordSet } = useAuth();

  const unlock = async () => {
    if (password.length < 4) {
      Alert.alert('Error', 'Master password must be at least 4 characters.');
      return;
    }

    setLoading(true);
    setMasterKey(password);

    try {
      const { data, error } = await supabase
        .from('user_settings')
        .select('encrypted_validation')
        .eq('user_id', session?.user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        // PGRST116 means no rows returned, which is fine for first time
        throw error;
      }

      if (data) {
        // Verify existing password
        try {
          const decrypted = decryptData(data.encrypted_validation);
          if (decrypted !== 'vault-check:v1') {
            throw new Error('Invalid master password');
          }
          setMasterPasswordSet(true);
        } catch (decryptError) {
          clearMasterKey();
          Alert.alert('Error', 'Incorrect master password. Please try again.');
        }
      } else {
        throw new Error('Vault is not initialized. Please go to the initialize screen.');
      }
    } catch (err: any) {
      Alert.alert('Error', err.message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unlock Vault</Text>
      <Text style={styles.subtitle}>
        Enter your master password. This password encrypts and decrypts your vault entries and is never sent to the server.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Master Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading}
      />
      <Button title={loading ? "Verifying..." : "Unlock"} onPress={unlock} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#555', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
});
