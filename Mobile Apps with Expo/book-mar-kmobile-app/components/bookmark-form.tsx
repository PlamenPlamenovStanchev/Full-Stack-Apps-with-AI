import { Dispatch, SetStateAction } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type BookmarkFormProps = {
  url: string;
  description: string;
  setUrl: Dispatch<SetStateAction<string>>;
  setDescription: Dispatch<SetStateAction<string>>;
  submitText: string;
  onSubmit: () => void;
  busy?: boolean;
};

export function BookmarkForm({
  url,
  description,
  setUrl,
  setDescription,
  submitText,
  onSubmit,
  busy = false,
}: BookmarkFormProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];

  return (
    <View style={styles.form}>
      <View style={styles.field}>
        <Text style={[styles.label, { color: palette.text }]}>URL</Text>
        <TextInput
          style={[
            styles.input,
            { borderColor: palette.icon, color: palette.text, backgroundColor: palette.background },
          ]}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="url"
          placeholder="https://example.com"
          value={url}
          onChangeText={setUrl}
        />
      </View>

      <View style={styles.field}>
        <Text style={[styles.label, { color: palette.text }]}>Description</Text>
        <TextInput
          style={[
            styles.input,
            styles.multiline,
            { borderColor: palette.icon, color: palette.text, backgroundColor: palette.background },
          ]}
          multiline
          numberOfLines={4}
          placeholder="Add a short description"
          value={description}
          onChangeText={setDescription}
        />
      </View>

      <Pressable
        disabled={busy}
        onPress={onSubmit}
        style={({ pressed }) => [
          styles.primaryButton,
          { backgroundColor: palette.tint },
          (pressed || busy) && styles.buttonDimmed,
        ]}>
        <Text style={[styles.primaryButtonText, { color: palette.background }]}>
          {busy ? 'Please wait...' : submitText}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 14,
  },
  field: {
    gap: 8,
  },
  label: {
    fontWeight: '600',
    fontSize: 15,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  multiline: {
    minHeight: 110,
    textAlignVertical: 'top',
  },
  primaryButton: {
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontWeight: '600',
    fontSize: 16,
  },
  buttonDimmed: {
    opacity: 0.7,
  },
});
