import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { BookmarkForm } from '@/components/bookmark-form';
import { ResponsiveScreen } from '@/components/responsive-screen';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useSession } from '@/hooks/use-session';
import { supabase } from '@/lib/supabase';

export default function AddBookmarkScreen() {
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
    }
  }, [loading, session]);

  const onAdd = async () => {
    setError(null);

    if (!session?.user?.id) {
      setError('You must be logged in.');
      return;
    }

    if (!url.trim() || !description.trim()) {
      setError('URL and description are required.');
      return;
    }

    setBusy(true);

    const { error: insertError } = await supabase.from('bookmarks').insert({
      user_id: session.user.id,
      url: url.trim(),
      description: description.trim(),
    });

    setBusy(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    router.replace('/bookmarks');
  };

  return (
    <ResponsiveScreen wideMaxWidth={800}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: palette.text }]}>Add Bookmark</Text>
        {error ? <Text style={[styles.errorText, { color: palette.tint }]}>{error}</Text> : null}

        <BookmarkForm
          url={url}
          description={description}
          setUrl={setUrl}
          setDescription={setDescription}
          submitText="Create Bookmark"
          onSubmit={onAdd}
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
