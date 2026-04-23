import { Link, router } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ResponsiveScreen } from '@/components/responsive-screen';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useSession } from '@/hooks/use-session';

export default function HomeScreen() {
  const { session, loading } = useSession();
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];

  useEffect(() => {
    if (!loading && session) {
      router.replace('/bookmarks');
    }
  }, [loading, session]);

  return (
    <ResponsiveScreen wideMaxWidth={700}>
      <View style={[styles.card, { borderColor: palette.icon, backgroundColor: palette.background }]}> 
        <Text style={[styles.title, { color: palette.text }]}>Bookmark Keeper</Text>
        <Text style={[styles.subtitle, { color: palette.icon }]}>Store and manage your personal bookmarks.</Text>

        <View style={styles.actions}>
          <Link href="/login" asChild>
            <Pressable
              style={({ pressed }) => [
                styles.primaryButton,
                { backgroundColor: palette.tint },
                pressed && styles.buttonPressed,
              ]}>
              <Text style={[styles.primaryText, { color: palette.background }]}>Login</Text>
            </Pressable>
          </Link>

          <Link href="/register" asChild>
            <Pressable
              style={({ pressed }) => [
                styles.secondaryButton,
                { borderColor: palette.tint },
                pressed && styles.buttonPressed,
              ]}>
              <Text style={[styles.secondaryText, { color: palette.tint }]}>Register</Text>
            </Pressable>
          </Link>
        </View>
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
    gap: 14,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 16,
  },
  actions: {
    marginTop: 8,
    gap: 10,
  },
  primaryButton: {
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 12,
  },
  primaryText: {
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    paddingVertical: 12,
  },
  secondaryText: {
    fontSize: 16,
    fontWeight: '600',
  },
  buttonPressed: {
    opacity: 0.7,
  },
});
