import { StyleSheet, TouchableOpacity, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#7CC4D6', dark: '#1D3D47' }}
      headerImage={
        <View style={styles.headerContainer}>
          <IconSymbol size={80} name="wand.and.stars" color="#fff" />
        </View>
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Unit Converter</ThemedText>
      </ThemedView>

      <ThemedView style={styles.introContainer}>
        <ThemedText type="subtitle">Welcome!</ThemedText>
        <ThemedText style={styles.introText}>
          Easily convert between different units of measurement. Choose a converter below to get started.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.convertersContainer}>
        {/* Metric Converter Card */}
        <TouchableOpacity
          style={[
            styles.converterCard,
            {
              backgroundColor:
                colorScheme === 'dark'
                  ? Colors['dark'].cardBackground || '#2C2C2C'
                  : Colors['light'].cardBackground || '#F5F5F5',
            },
          ]}
          onPress={() => router.push('/(tabs)/metric')}>
          <View style={styles.converterIconContainer}>
            <IconSymbol size={56} name="ruler.fill" color={Colors[colorScheme ?? 'light'].tint} />
          </View>
          <ThemedText type="subtitle" style={styles.converterTitle}>
            Metric Converter
          </ThemedText>
          <ThemedText style={styles.converterDescription}>
            Convert between mm, cm, m, km, inches, and feet
          </ThemedText>
        </TouchableOpacity>

        {/* Temperature Converter Card */}
        <TouchableOpacity
          style={[
            styles.converterCard,
            {
              backgroundColor:
                colorScheme === 'dark'
                  ? Colors['dark'].cardBackground || '#2C2C2C'
                  : Colors['light'].cardBackground || '#F5F5F5',
            },
          ]}
          onPress={() => router.push('/(tabs)/temperature')}>
          <View style={styles.converterIconContainer}>
            <IconSymbol
              size={56}
              name="thermometer"
              color={Colors[colorScheme ?? 'light'].tint}
            />
          </View>
          <ThemedText type="subtitle" style={styles.converterTitle}>
            Temperature Converter
          </ThemedText>
          <ThemedText style={styles.converterDescription}>
            Convert between Celsius and Fahrenheit
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 200,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7CC4D6',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  introContainer: {
    gap: 12,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  introText: {
    fontSize: 16,
    lineHeight: 24,
  },
  convertersContainer: {
    gap: 16,
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  converterCard: {
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  converterIconContainer: {
    marginBottom: 8,
  },
  converterTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  converterDescription: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
  },
});
