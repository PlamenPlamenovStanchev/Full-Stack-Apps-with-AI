import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ResponsiveScreen } from '@/components/responsive-screen';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useSession } from '@/hooks/use-session';
import { supabase } from '@/lib/supabase';
import { Bookmark } from '@/types/bookmark';

export default function DeleteBookmarkScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const { session, loading } = useSession();

  const [bookmark, setBookmark] = useState<Bookmark | null>(null);
  const [busy, setBusy] = useState(false);
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

  const onDelete = async () => {
    setBusy(true);
    setError(null);

    const { error: deleteError } = await supabase.from('bookmarks').delete().eq('id', params.id);

    setBusy(false);

    if (deleteError) {
      setError(deleteError.message);
      return;
    }

    router.replace('/bookmarks');
  };

  return (
    <ResponsiveScreen wideMaxWidth={700}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: palette.text }]}>Delete Bookmark</Text>
        {error ? <Text style={[styles.errorText, { color: palette.tint }]}>{error}</Text> : null}

        <View style={[styles.card, { borderColor: palette.icon, backgroundColor: palette.background }]}> 
          <Text style={[styles.warning, { color: palette.tint }]}>This action cannot be undone.</Text>
          {bookmark ? (
            <>
              <Text style={[styles.label, { color: palette.text }]}>URL</Text>
              <Text style={[styles.value, { color: palette.icon }]}>{bookmark.url}</Text>

              <Text style={[styles.label, { color: palette.text }]}>Description</Text>
              <Text style={[styles.value, { color: palette.icon }]}>{bookmark.description}</Text>
            </>
          ) : (
            <Text style={[styles.value, { color: palette.icon }]}>Loading bookmark...</Text>
          )}
        </View>

        <View style={styles.actions}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.secondaryButton,
              { borderColor: palette.icon },
              pressed && styles.buttonPressed,
            ]}>
            <Text style={[styles.secondaryText, { color: palette.text }]}>Cancel</Text>
          </Pressable>
          <Pressable
            disabled={busy}
            onPress={onDelete}
            style={({ pressed }) => [
              styles.deleteButton,
              { backgroundColor: palette.tint },
              (pressed || busy) && styles.buttonPressed,
            ]}>
            <Text style={[styles.deleteText, { color: palette.background }]}>
              {busy ? 'Deleting...' : 'Delete Bookmark'}
            </Text>
          </Pressable>
        </View>
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
    gap: 8,
  },
  warning: { fontWeight: '600' },
  label: {
    fontWeight: '700',
    marginTop: 2,
  },
  value: {},
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  secondaryButton: {
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  secondaryText: {
    fontWeight: '600',
  },
  deleteButton: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  deleteText: {
    fontWeight: '600',
  },
  buttonPressed: {
    opacity: 0.7,
  },
  errorText: {},
});
