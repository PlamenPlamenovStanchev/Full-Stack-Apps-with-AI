import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { supabase } from '../lib/supabase';
import { useAuth } from '../providers/AuthProvider';
import { encryptData, setMasterKey } from '../utils/crypto';

export default function InitializeScreen() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { session, setMasterPasswordSet, checkVaultAssignment } = useAuth();
  const router = useRouter();

  const initializeVault = async () => {
    if (password.length < 4) {
      Alert.alert('Error', 'Master password must be at least 4 characters.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    setLoading(true);
    setMasterKey(password);

    try {
      const encrypted_validation = encryptData('vault-check:v1');
      const { error: insertError } = await supabase
        .from('user_settings')
        .insert([{ user_id: session?.user.id, encrypted_validation }]);

      if (insertError) {
        throw insertError;
      }
      
      setMasterPasswordSet(true);
      checkVaultAssignment(session!.user.id);
      router.replace('/(tabs)');
      
    } catch (err: any) {
      Alert.alert('Error', err.message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Initialize Vault</Text>
      <Text style={styles.subtitle}>
        Create a secure master password. This will encrypt all future vault entries locally.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Master Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Master Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        editable={!loading}
      />
      <Button title={loading ? "Initializing..." : "Initialize Vault"} onPress={initializeVault} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#555', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
});
