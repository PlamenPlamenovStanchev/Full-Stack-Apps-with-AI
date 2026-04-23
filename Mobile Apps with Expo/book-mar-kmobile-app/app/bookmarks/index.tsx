import { Link, router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { ResponsiveScreen } from '@/components/responsive-screen';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useSession } from '@/hooks/use-session';
import { supabase } from '@/lib/supabase';
import { Bookmark } from '@/types/bookmark';

export default function BookmarksScreen() {
  const { session, loading } = useSession();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];

  const loadBookmarks = useCallback(async () => {
    if (!session?.user?.id) {
      return;
    }

    setBusy(true);
    setError(null);

    const { data, error: fetchError } = await supabase
      .from('bookmarks')
      .select('*')
      .order('created_at', { ascending: false });

    setBusy(false);

    if (fetchError) {
      setError(fetchError.message);
      return;
    }

    setBookmarks((data as Bookmark[]) ?? []);
  }, [session?.user?.id]);

  useEffect(() => {
    if (!loading && !session) {
      router.replace('/login');
      return;
    }

    loadBookmarks();
  }, [loading, session, loadBookmarks]);

  const onLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/');
  };

  return (
    <ResponsiveScreen>
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: palette.text }]}>Your Bookmarks</Text>
        <View style={styles.headerActions}>
          <Link href="/bookmarks/add" asChild>
            <Pressable
              style={({ pressed }) => [
                styles.primaryButton,
                { backgroundColor: palette.tint },
                pressed && styles.buttonPressed,
              ]}>
              <Text style={[styles.primaryButtonText, { color: palette.background }]}>Add</Text>
            </Pressable>
          </Link>
          <Pressable
            onPress={onLogout}
            style={({ pressed }) => [
              styles.secondaryButton,
              { borderColor: palette.icon },
              pressed && styles.buttonPressed,
            ]}>
            <Text style={[styles.secondaryButtonText, { color: palette.text }]}>Logout</Text>
          </Pressable>
        </View>
      </View>

      {error ? <Text style={[styles.errorText, { color: palette.tint }]}>{error}</Text> : null}

      <FlatList
        data={bookmarks}
        keyExtractor={(item) => item.id}
        refreshing={busy}
        onRefresh={loadBookmarks}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={!busy ? <Text style={[styles.emptyText, { color: palette.icon }]}>No bookmarks yet.</Text> : null}
        renderItem={({ item }) => (
          <View style={[styles.card, { borderColor: palette.icon, backgroundColor: palette.background }]}> 
            <Text numberOfLines={1} style={[styles.url, { color: palette.text }]}> 
              {item.url}
            </Text>
            <Text numberOfLines={2} style={[styles.description, { color: palette.icon }]}> 
              {item.description}
            </Text>

            <View style={styles.cardActions}>
              <Link href={`/bookmarks/${item.id}/view`} asChild>
                <Pressable
                  style={({ pressed }) => [
                    styles.smallButton,
                    { borderColor: palette.tint },
                    pressed && styles.buttonPressed,
                  ]}>
                  <Text style={[styles.smallButtonText, { color: palette.tint }]}>View</Text>
                </Pressable>
              </Link>
              <Link href={`/bookmarks/${item.id}/edit`} asChild>
                <Pressable
                  style={({ pressed }) => [
                    styles.smallButton,
                    { borderColor: palette.tint },
                    pressed && styles.buttonPressed,
                  ]}>
                  <Text style={[styles.smallButtonText, { color: palette.tint }]}>Edit</Text>
                </Pressable>
              </Link>
              <Link href={`/bookmarks/${item.id}/delete`} asChild>
                <Pressable
                  style={({ pressed }) => [
                    styles.deleteButton,
                    { borderColor: palette.tint },
                    pressed && styles.buttonPressed,
                  ]}>
                  <Text style={[styles.deleteButtonText, { color: palette.tint }]}>Delete</Text>
                </Pressable>
              </Link>
            </View>
          </View>
        )}
      />
    </ResponsiveScreen>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
  },
  primaryButton: {
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  primaryButtonText: {
    fontWeight: '600',
  },
  secondaryButton: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  secondaryButtonText: {
    fontWeight: '600',
  },
  listContent: {
    paddingVertical: 8,
    gap: 12,
  },
  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    gap: 8,
  },
  url: {
    fontWeight: '700',
    fontSize: 16,
  },
  description: {},
  cardActions: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  smallButton: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  smallButtonText: {
    fontWeight: '600',
  },
  deleteButton: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  deleteButtonText: {
    fontWeight: '600',
  },
  errorText: {},
  emptyText: { marginTop: 20 },
  buttonPressed: {
    opacity: 0.7,
  },
});
