import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { BookmarkForm } from '@/components/bookmark-form';
import { ResponsiveScreen } from '@/components/responsive-screen';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useSession } from '@/hooks/use-session';
import { supabase } from '@/lib/supabase';
import { Bookmark } from '@/types/bookmark';

export default function EditBookmarkScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const { session, loading } = useSession();

  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
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

      const existing = data as Bookmark;
      setUrl(existing.url);
      setDescription(existing.description);
    };

    loadBookmark();
  }, [loading, params.id, session]);

  const onSave = async () => {
    setError(null);

    if (!url.trim() || !description.trim()) {
      setError('URL and description are required.');
      return;
    }

    setBusy(true);

    const { error: updateError } = await supabase
      .from('bookmarks')
      .update({
        url: url.trim(),
        description: description.trim(),
      })
      .eq('id', params.id);

    setBusy(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    router.replace(`/bookmarks/${params.id}/view`);
  };

  return (
    <ResponsiveScreen wideMaxWidth={800}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: palette.text }]}>Edit Bookmark</Text>
        {error ? <Text style={[styles.errorText, { color: palette.tint }]}>{error}</Text> : null}

        <BookmarkForm
          url={url}
          description={description}
          setUrl={setUrl}
          setDescription={setDescription}
          submitText="Save Changes"
          onSubmit={onSave}
          busy={busy}
        />
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
  errorText: {},
});
