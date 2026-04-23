import { PropsWithChildren } from 'react';
import { SafeAreaView, StyleSheet, useWindowDimensions, View } from 'react-native';

type ResponsiveScreenProps = PropsWithChildren<{
  wideMaxWidth?: number;
}>;

export function ResponsiveScreen({ children, wideMaxWidth = 900 }: ResponsiveScreenProps) {
  const { width } = useWindowDimensions();
  const horizontalPadding = width >= 1024 ? 32 : 16;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.wrapper, { paddingHorizontal: horizontalPadding }]}>
        <View style={[styles.content, { maxWidth: wideMaxWidth }]}>{children}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 16,
  },
  content: {
    flex: 1,
    width: '100%',
    gap: 12,
  },
});
