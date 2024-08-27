import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useGameStatus } from '@/context/GameStatusContext'; // Ensure this is correctly imported

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const { isGameActive } = useGameStatus(); // Use the hook to get game status

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Sessions',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? 'home' : 'home-outline'}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="game"
                options={{
                    title: isGameActive ? 'Discard' : 'New Hand',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? 'trash' : 'code-slash-outline'}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
