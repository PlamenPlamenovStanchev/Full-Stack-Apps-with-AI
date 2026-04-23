import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { Colors } from '@/constants/theme';

interface BMIResult {
  bmi: number;
  category: string;
  color: string;
}

export function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<BMIResult | null>(null);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const calculateBMI = () => {
    if (!weight || !height) {
      alert('Please enter both weight and height');
      return;
    }

    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (w <= 0 || h <= 0) {
      alert('Please enter valid positive numbers');
      return;
    }

    // Convert height from cm to meters if needed (assuming input is in cm)
    const heightInMeters = h > 100 ? h / 100 : h;
    const bmi = w / (heightInMeters * heightInMeters);

    let category: string;
    let color: string;

    if (bmi < 18.5) {
      category = 'Underweight';
      color = '#3498db'; // Blue
    } else if (bmi >= 18.5 && bmi < 25) {
      category = 'Normal Weight';
      color = '#2ecc71'; // Green
    } else if (bmi >= 25 && bmi < 30) {
      category = 'Overweight';
      color = '#f39c12'; // Orange
    } else {
      category = 'Obesity';
      color = '#e74c3c'; // Red
    }

    setResult({
      bmi: parseFloat(bmi.toFixed(1)),
      category,
      color,
    });
  };

  const reset = () => {
    setWeight('');
    setHeight('');
    setResult(null);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.inputSection}>
        <ThemedText type="subtitle" style={styles.label}>
          Weight (kg)
        </ThemedText>
        <TextInput
          style={[
            styles.input,
            {
              color: colors.text,
              borderColor: colors.icon,
              backgroundColor:
                colorScheme === 'dark' ? '#2a2a2a' : '#f5f5f5',
            },
          ]}
          placeholder="Enter weight in kg"
          placeholderTextColor={colors.icon}
          value={weight}
          onChangeText={setWeight}
          keyboardType="decimal-pad"
        />

        <ThemedText type="subtitle" style={[styles.label, { marginTop: 16 }]}>
          Height (cm or m)
        </ThemedText>
        <TextInput
          style={[
            styles.input,
            {
              color: colors.text,
              borderColor: colors.icon,
              backgroundColor:
                colorScheme === 'dark' ? '#2a2a2a' : '#f5f5f5',
            },
          ]}
          placeholder="Enter height in cm or meters"
          placeholderTextColor={colors.icon}
          value={height}
          onChangeText={setHeight}
          keyboardType="decimal-pad"
        />
      </ThemedView>

      <ThemedView style={styles.buttonSection}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: colors.tint,
            },
          ]}
          onPress={calculateBMI}>
          <ThemedText
            style={{
              color: colorScheme === 'dark' ? '#000' : '#fff',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            Calculate BMI
          </ThemedText>
        </TouchableOpacity>

        {result && (
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: colorScheme === 'dark' ? '#2a2a2a' : '#e0e0e0',
              },
            ]}
            onPress={reset}>
            <ThemedText style={{ fontWeight: 'bold', fontSize: 16 }}>
              Clear
            </ThemedText>
          </TouchableOpacity>
        )}
      </ThemedView>

      {result && (
        <ThemedView
          style={[
            styles.resultSection,
            {
              backgroundColor:
                colorScheme === 'dark' ? '#1a1a1a' : '#f9f9f9',
              borderColor: result.color,
            },
          ]}>
          <ThemedText type="title" style={styles.resultLabel}>
            Your BMI
          </ThemedText>

          <ThemedText
            style={[
              styles.bmiValue,
              {
                color: result.color,
              },
            ]}>
            {result.bmi}
          </ThemedText>

          <ThemedText
            style={[
              styles.categoryText,
              {
                color: result.color,
              },
            ]}>
            {result.category}
          </ThemedText>

          <ThemedView style={styles.categoryInfo}>
            <ThemedText style={styles.infoText}>
              {result.category === 'Underweight' &&
                'BMI less than 18.5 - You may need to gain weight'}
              {result.category === 'Normal Weight' &&
                'BMI between 18.5 - 24.9 - You have a healthy weight'}
              {result.category === 'Overweight' &&
                'BMI between 25 - 29.9 - You may need to lose weight'}
              {result.category === 'Obesity' &&
                'BMI 30 or above - Consider consulting a healthcare professional'}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  inputSection: {
    gap: 12,
  },
  label: {
    marginBottom: 8,
    marginTop: 4,
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
  },
  buttonSection: {
    gap: 12,
    flexDirection: 'column',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultSection: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    gap: 8,
  },
  resultLabel: {
    fontSize: 18,
    marginBottom: 8,
  },
  bmiValue: {
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  categoryText: {
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 4,
  },
  categoryInfo: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  infoText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});
