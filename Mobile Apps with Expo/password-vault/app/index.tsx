import { useRouter } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../providers/AuthProvider';

export default function HomeScreen() {
  const router = useRouter();
  const { session, isLoading, hasVaultAssigned, masterPasswordSet } = useAuth();

  if (isLoading) return <View style={styles.container}><Text>Loading...</Text></View>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the App, your Password Vault.</Text>

      {!session ? (
        <View style={styles.btnContainer}>
          <Button title="Login" onPress={() => router.push('/login')} />
          <View style={{ height: 10 }} />
          <Button title="Register" onPress={() => router.push('/register')} />
        </View>
      ) : (
        <View style={styles.btnContainer}>
          <Text style={{ marginBottom: 20 }}>Logged in as {session.user.email}</Text>
          
          {hasVaultAssigned ? (
             <Button title={masterPasswordSet ? 'Enter Vault' : 'Unlock Vault'} onPress={() => router.push(masterPasswordSet ? '/(tabs)' : '/unlock')} />
          ) : (
             <Button title="Initialize Vault" onPress={() => router.push('/initialize')} />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  btnContainer: { width: '100%', maxWidth: 400, marginTop: 20 }
});
