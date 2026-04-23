import { Link, router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import { ResponsiveScreen } from '@/components/responsive-screen';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useSession } from '@/hooks/use-session';
import { supabase } from '@/lib/supabase';
import { Bookmark } from '@/types/bookmark';

export default function ViewBookmarkScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const { session, loading } = useSession();
  const [bookmark, setBookmark] = useState<Bookmark | null>(null);
  const [error, setError] = useState<string | null>(null);
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];

  useEffect(() => {
    if (!loading && !session) {
      router.replace('/login');
      return;
    }

    const loadBookmark = async () => {
      if (!params.id) {
        setError('Missing bookmark id.');
        return;
      }

      const { data, error: fetchError } = await supabase
        .from('bookmarks')
        .select('*')
        .eq('id', params.id)
        .single();

      if (fetchError) {
        setError(fetchError.message);
        return;
      }

      setBookmark(data as Bookmark);
    };

    loadBookmark();
  }, [loading, params.id, session]);

  const onOpenUrl = async () => {
    if (!bookmark?.url) {
      return;
    }

    const supported = await Linking.canOpenURL(bookmark.url);
    if (!supported) {
      setError('Cannot open this URL on your device.');
      return;
    }

    await Linking.openURL(bookmark.url);
  };

  return (
    <ResponsiveScreen wideMaxWidth={800}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: palette.text }]}>View Bookmark</Text>

        {error ? <Text style={[styles.errorText, { color: palette.tint }]}>{error}</Text> : null}

        {bookmark ? (
          <View style={[styles.card, { borderColor: palette.icon, backgroundColor: palette.background }]}> 
            <Text style={[styles.label, { color: palette.text }]}>URL</Text>
            <Text style={[styles.value, { color: palette.icon }]}>{bookmark.url}</Text>

            <Text style={[styles.label, { color: palette.text }]}>Description</Text>
            <Text style={[styles.value, { color: palette.icon }]}>{bookmark.description}</Text>

            <Pressable
              onPress={onOpenUrl}
              style={({ pressed }) => [
                styles.primaryButton,
                { backgroundColor: palette.tint },
                pressed && styles.buttonPressed,
              ]}>
              <Text style={[styles.primaryText, { color: palette.background }]}>Open URL</Text>
            </Pressable>

            <View style={styles.linksRow}>
              <Link href={`/bookmarks/${bookmark.id}/edit`} style={[styles.linkText, { color: palette.tint }]}>
                Edit
              </Link>
              <Link href={`/bookmarks/${bookmark.id}/delete`} style={[styles.deleteText, { color: palette.tint }]}>
                Delete
              </Link>
            </View>
          </View>
        ) : (
          <Text style={[styles.loadingText, { color: palette.icon }]}>Loading...</Text>
        )}
      </View>
    </ResponsiveScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
  },
  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    gap: 10,
  },
  label: {
    fontWeight: '700',
    marginTop: 2,
  },
  value: { fontSize: 15 },
  linksRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 16,
  },
  linkText: {
    fontWeight: '600',
  },
  deleteText: {
    fontWeight: '600',
  },
  primaryButton: {
    marginTop: 6,
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 12,
  },
  primaryText: {
    fontWeight: '600',
  },
  buttonPressed: {
    opacity: 0.7,
  },
  errorText: {},
  loadingText: {},
});
