import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { ResponsiveScreen } from '@/components/responsive-screen';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { supabase } from '@/lib/supabase';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];

  const onRegister = async () => {
    setError(null);
    setNotice(null);
    setBusy(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    });

    setBusy(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    if (!data.session) {
      setNotice('Registration successful. Check your email to confirm your account, then login.');
      return;
    }

    router.replace('/bookmarks');
  };

  return (
    <ResponsiveScreen wideMaxWidth={700}>
      <View style={[styles.card, { borderColor: palette.icon, backgroundColor: palette.background }]}> 
        <Text style={[styles.title, { color: palette.text }]}>Register</Text>

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
        {notice ? <Text style={[styles.noticeText, { color: palette.text }]}>{notice}</Text> : null}

        <Pressable
          disabled={busy}
          onPress={onRegister}
          style={({ pressed }) => [
            styles.primaryButton,
            { backgroundColor: palette.tint },
            (pressed || busy) && styles.buttonPressed,
          ]}>
          <Text style={[styles.primaryText, { color: palette.background }]}>
            {busy ? 'Creating account...' : 'Register'}
          </Text>
        </Pressable>

        <Text style={[styles.linkText, { color: palette.icon }]}>
          Already have an account?{' '}
          <Link href="/login" style={[styles.link, { color: palette.tint }]}> 
            Login
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
  noticeText: {},
});
