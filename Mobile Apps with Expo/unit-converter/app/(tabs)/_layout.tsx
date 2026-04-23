import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="metric"
        options={{
          title: 'Metric',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="ruler.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="temperature"
        options={{
          title: 'Temperature',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="thermometer" color={color} />,
        }}
      />
    </Tabs>
  );
}
