import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { ResponsiveScreen } from '@/components/responsive-screen';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { supabase } from '@/lib/supabase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];

  const onLogin = async () => {
    setError(null);
    setBusy(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setBusy(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.replace('/bookmarks');
  };

  return (
    <ResponsiveScreen wideMaxWidth={700}>
      <View style={[styles.card, { borderColor: palette.icon, backgroundColor: palette.background }]}> 
        <Text style={[styles.title, { color: palette.text }]}>Login</Text>

        <TextInput
          style={[
            styles.input,
            { borderColor: palette.icon, color: palette.text, backgroundColor: palette.background },
          ]}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={[
            styles.input,
            { borderColor: palette.icon, color: palette.text, backgroundColor: palette.background },
          ]}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {error ? <Text style={[styles.errorText, { color: palette.tint }]}>{error}</Text> : null}

        <Pressable
          disabled={busy}
          onPress={onLogin}
          style={({ pressed }) => [
            styles.primaryButton,
            { backgroundColor: palette.tint },
            (pressed || busy) && styles.buttonPressed,
          ]}>
          <Text style={[styles.primaryText, { color: palette.background }]}>
            {busy ? 'Signing in...' : 'Login'}
          </Text>
        </Pressable>

        <Text style={[styles.linkText, { color: palette.icon }]}>
          No account?{' '}
          <Link href="/register" style={[styles.link, { color: palette.tint }]}> 
            Register
          </Link>
        </Text>
      </View>
    </ResponsiveScreen>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 24,
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  primaryButton: {
    marginTop: 6,
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 12,
  },
  primaryText: {
    fontSize: 16,
    fontWeight: '600',
  },
  buttonPressed: {
    opacity: 0.7,
  },
  linkText: {
    fontSize: 14,
  },
  link: {
    fontWeight: '600',
  },
  errorText: {},
});
