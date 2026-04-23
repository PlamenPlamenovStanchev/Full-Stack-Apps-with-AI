import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const TEMP_UNITS = ['celsius', 'fahrenheit'] as const;
type TempUnit = typeof TEMP_UNITS[number];

export default function TemperatureConverterScreen() {
  const colorScheme = useColorScheme();
  const [inputValue, setInputValue] = useState('0');
  const [fromUnit, setFromUnit] = useState<TempUnit>('celsius');
  const [toUnit, setToUnit] = useState<TempUnit>('fahrenheit');

  const convert = (value: string, from: TempUnit, to: TempUnit): string => {
    if (!value || isNaN(Number(value))) return '0';

    let celsius = Number(value);

    // Convert to Celsius first
    if (from === 'fahrenheit') {
      celsius = (Number(value) - 32) * (5 / 9);
    }

    // Convert from Celsius to target unit
    let result = celsius;
    if (to === 'fahrenheit') {
      result = celsius * (9 / 5) + 32;
    }

    return result.toFixed(2);
  };

  const result = convert(inputValue, fromUnit, toUnit);

  const getUnitLabel = (unit: TempUnit): string => {
    return unit === 'celsius' ? 'Celsius (°C)' : 'Fahrenheit (°F)';
  };

  const getUnitSymbol = (unit: TempUnit): string => {
    return unit === 'celsius' ? '°C' : '°F';
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#E74C3C', dark: '#A93226' }}
      headerImage={
        <View style={styles.headerContainer}>
          <IconSymbol size={80} name="thermometer" color="#fff" />
        </View>
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Temperature Converter</ThemedText>
      </ThemedView>

      <ThemedView style={styles.contentContainer}>
        {/* From Section */}
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
              placeholder="Enter temperature"
              placeholderTextColor={colorScheme === 'dark' ? '#888' : '#999'}
              value={inputValue}
              onChangeText={setInputValue}
              keyboardType="decimal-pad"
            />
          </View>

          <View style={styles.unitButtonsRow}>
            {TEMP_UNITS.map((unit) => (
              <TouchableOpacity
                key={unit}
                style={[
                  styles.unitButton,
                  styles.unitButtonFlex,
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
                  {getUnitSymbol(unit)}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
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
            <ThemedText style={styles.resultUnit}>{getUnitSymbol(toUnit)}</ThemedText>
          </View>
        </View>

        {/* To Section */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            To
          </ThemedText>

          <View style={styles.unitButtonsRow}>
            {TEMP_UNITS.map((unit) => (
              <TouchableOpacity
                key={unit}
                style={[
                  styles.unitButton,
                  styles.unitButtonFlex,
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
                  {getUnitSymbol(unit)}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
          <ThemedText style={styles.unitLabel}>{getUnitLabel(toUnit)}</ThemedText>
        </View>

        {/* Temperature Reference */}
        <View style={styles.referenceSection}>
          <ThemedText type="subtitle" style={styles.referenceSectionTitle}>
            Reference Points
          </ThemedText>
          <View style={styles.referenceItem}>
            <ThemedText>Water freezes:</ThemedText>
            <ThemedText type="defaultSemiBold">0°C / 32°F</ThemedText>
          </View>
          <View style={styles.referenceItem}>
            <ThemedText>Room temperature:</ThemedText>
            <ThemedText type="defaultSemiBold">20°C / 68°F</ThemedText>
          </View>
          <View style={styles.referenceItem}>
            <ThemedText>Body temperature:</ThemedText>
            <ThemedText type="defaultSemiBold">37°C / 98.6°F</ThemedText>
          </View>
          <View style={styles.referenceItem}>
            <ThemedText>Water boils:</ThemedText>
            <ThemedText type="defaultSemiBold">100°C / 212°F</ThemedText>
          </View>
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
    backgroundColor: '#E74C3C',
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
  unitButtonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  unitButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    minHeight: 40,
    justifyContent: 'center',
  },
  unitButtonFlex: {
    flex: 1,
  },
  unitButtonText: {
    fontWeight: '600',
    fontSize: 16,
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
    padding: 24,
    alignItems: 'center',
    gap: 8,
  },
  resultLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
  resultValue: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  resultUnit: {
    fontSize: 18,
    fontWeight: '600',
  },
  referenceSection: {
    gap: 12,
    marginTop: 8,
  },
  referenceSectionTitle: {
    marginBottom: 8,
  },
  referenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
});
