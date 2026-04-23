import { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

// Conversion factors to millimeters
const METRIC_CONVERSIONS: Record<string, number> = {
  'mm': 1,
  'cm': 10,
  'm': 1000,
  'km': 1000000,
  'inch': 25.4,
  'foot': 304.8,
};

export default function MetricConverterScreen() {
  const colorScheme = useColorScheme();
  const [inputValue, setInputValue] = useState('1');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('foot');

  const units = ['mm', 'cm', 'm', 'km', 'inch', 'foot'];

  const convert = (value: string, from: string, to: string): string => {
    if (!value || isNaN(Number(value))) return '0';
    const valueInMm = Number(value) * METRIC_CONVERSIONS[from];
    const result = valueInMm / METRIC_CONVERSIONS[to];
    return result.toFixed(4);
  };

  const result = convert(inputValue, fromUnit, toUnit);

  const getUnitLabel = (unit: string): string => {
    const labels: Record<string, string> = {
      'mm': 'Millimeters',
      'cm': 'Centimeters',
      'm': 'Meters',
      'km': 'Kilometers',
      'inch': 'Inches',
      'foot': 'Feet',
    };
    return labels[unit];
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D4A373', dark: '#3D2817' }}
      headerImage={
        <View style={styles.headerContainer}>
          <IconSymbol size={80} name="ruler.fill" color="#fff" />
        </View>
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Metric Converter</ThemedText>
      </ThemedView>

      <ThemedView style={styles.contentContainer}>
        {/* Input Section */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            From
          </ThemedText>

          <View style={styles.inputGroup}>
            <TextInput
              style={[
                styles.input,
                {
                  color: colorScheme === 'dark' ? '#fff' : '#000',
                  borderColor: Colors[colorScheme ?? 'light'].tint,
                },
              ]}
              placeholder="Enter value"
              placeholderTextColor={colorScheme === 'dark' ? '#888' : '#999'}
              value={inputValue}
              onChangeText={setInputValue}
              keyboardType="decimal-pad"
            />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.unitsScroll}
            contentContainerStyle={styles.unitsContainer}>
            {units.map((unit) => (
              <TouchableOpacity
                key={unit}
                style={[
                  styles.unitButton,
                  {
                    backgroundColor:
                      fromUnit === unit
                        ? Colors[colorScheme ?? 'light'].tint
                        : colorScheme === 'dark'
                          ? '#333'
                          : '#E8E8E8',
                  },
                ]}
                onPress={() => setFromUnit(unit)}>
                <ThemedText
                  style={[
                    styles.unitButtonText,
                    {
                      color:
                        fromUnit === unit
                          ? colorScheme === 'dark'
                            ? '#000'
                            : '#fff'
                          : colorScheme === 'dark'
                            ? '#fff'
                            : '#000',
                    },
                  ]}>
                  {unit}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <ThemedText style={styles.unitLabel}>{getUnitLabel(fromUnit)}</ThemedText>
        </View>

        {/* Result Section */}
        <View style={styles.resultSection}>
          <View
            style={[
              styles.resultBox,
              {
                backgroundColor: Colors[colorScheme ?? 'light'].tint + '20',
                borderColor: Colors[colorScheme ?? 'light'].tint,
              },
            ]}>
            <ThemedText style={styles.resultLabel}>Result</ThemedText>
            <ThemedText style={styles.resultValue}>{result}</ThemedText>
            <ThemedText style={styles.resultUnit}>{toUnit}</ThemedText>
          </View>
        </View>

        {/* Output Section */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            To
          </ThemedText>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.unitsScroll}
            contentContainerStyle={styles.unitsContainer}>
            {units.map((unit) => (
              <TouchableOpacity
                key={unit}
                style={[
                  styles.unitButton,
                  {
                    backgroundColor:
                      toUnit === unit
                        ? Colors[colorScheme ?? 'light'].tint
                        : colorScheme === 'dark'
                          ? '#333'
                          : '#E8E8E8',
                  },
                ]}
                onPress={() => setToUnit(unit)}>
                <ThemedText
                  style={[
                    styles.unitButtonText,
                    {
                      color:
                        toUnit === unit
                          ? colorScheme === 'dark'
                            ? '#000'
                            : '#fff'
                          : colorScheme === 'dark'
                            ? '#fff'
                            : '#000',
                    },
                  ]}>
                  {unit}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <ThemedText style={styles.unitLabel}>{getUnitLabel(toUnit)}</ThemedText>
        </View>
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
    backgroundColor: '#D4A373',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 24,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  inputGroup: {
    gap: 8,
  },
  input: {
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
  },
  unitsScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  unitsContainer: {
    gap: 8,
    paddingBottom: 8,
  },
  unitButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 60,
    alignItems: 'center',
  },
  unitButtonText: {
    fontWeight: '600',
    fontSize: 14,
  },
  unitLabel: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 4,
  },
  resultSection: {
    paddingVertical: 16,
  },
  resultBox: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    gap: 8,
  },
  resultLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
  resultValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  resultUnit: {
    fontSize: 16,
    fontWeight: '600',
  },
});
