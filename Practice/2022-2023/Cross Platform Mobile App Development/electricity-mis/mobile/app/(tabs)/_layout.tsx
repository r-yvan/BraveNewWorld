import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/haptic-tab';
import TabBarBackground from '@/components/ui/tab-bar-background';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const tintColor = useThemeColor({}, 'tint');

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tintColor,
        headerShown: true,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Generate',
          headerTitle: 'EUCL Token Generator',
          tabBarIcon: ({ color }) => <Ionicons name="add-circle" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="validate"
        options={{
          title: 'Validate',
          headerTitle: 'Validate Token',
          tabBarIcon: ({ color }) => <Ionicons name="checkmark-circle" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          headerTitle: 'Token History',
          tabBarIcon: ({ color }) => <Ionicons name="time" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
