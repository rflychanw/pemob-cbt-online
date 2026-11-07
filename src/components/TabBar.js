import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/colors';

export default function TabBar({ activeTab, onSelectTab }) {
  const tabs = [
    { key: 'home', label: 'Beranda', icon: 'home-outline', activeIcon: 'home' },
    { key: 'history', label: 'Riwayat', icon: 'time-outline', activeIcon: 'time' },
    { key: 'profile', label: 'Profil', icon: 'person-outline', activeIcon: 'person' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.tabBarInner}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tabButton}
              onPress={() => onSelectTab(tab.key)}
              activeOpacity={0.7}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
            >
              <Ionicons
                name={isActive ? tab.activeIcon : tab.icon}
                size={22}
                color={isActive ? theme.colors.primaryDark : theme.colors.inkMuted}
              />
              <Text
                style={[
                  styles.tabLabel,
                  isActive && styles.tabLabelActive,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabBarInner: {
    flexDirection: 'row',
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'space-around',
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 20,
    minWidth: 80,
  },
  tabLabel: {
    fontSize: 11,
    color: theme.colors.inkMuted,
    marginTop: 4,
    fontWeight: '500',
  },
  tabLabelActive: {
    color: theme.colors.primaryDark,
    fontWeight: '700',
  },
});
