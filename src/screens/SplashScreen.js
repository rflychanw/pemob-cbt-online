import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/colors';

export default function SplashScreen({ onFinish }) {
  const [progress] = useState(new Animated.Value(0));

  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2000);

    Animated.timing(progress, {
      toValue: 1,
      duration: 1800,
      useNativeDriver: false,
    }).start(() => {
      clearTimeout(timer);
      onFinish();
    });

    return () => clearTimeout(timer);
  }, []);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.centerContent}>
        {/* Brand Icon Squircle */}
        <View style={styles.iconContainer}>
          <Ionicons name="school" size={54} color={theme.colors.primary} />
        </View>

        {/* Brand Typography */}
        <Text style={styles.title}>CBT Online</Text>
        <Text style={styles.subtitle}>Smart Examination Platform</Text>
      </View>

      {/* Bottom Loading Progress */}
      <View style={styles.bottomContent}>
        <View style={styles.progressBarTrack}>
          <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
        </View>
        <Text style={styles.loadingText}>Memuat aplikasi...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.splashBg,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 64,
    paddingHorizontal: 24,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: theme.radius.xl,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: theme.colors.inkInverse,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 6,
    fontWeight: '500',
  },
  bottomContent: {
    width: '100%',
    maxWidth: 280,
    alignItems: 'center',
  },
  progressBarTrack: {
    width: '100%',
    height: 6,
    backgroundColor: '#1e293b',
    borderRadius: theme.radius.full,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: theme.colors.splashAccent,
    borderRadius: theme.radius.full,
  },
  loadingText: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
  },
});
