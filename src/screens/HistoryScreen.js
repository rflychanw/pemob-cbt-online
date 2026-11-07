import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/colors';

export default function HistoryScreen({ historyList }) {
  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Riwayat Ujian</Text>
        <Text style={styles.headerSubtitle}>
          Daftar ujian yang telah Anda selesaikan
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {historyList.map((item) => (
          <View key={item.id} style={styles.historyCard}>
            <View style={styles.cardTop}>
              <View style={styles.examIconWrap}>
                <Ionicons
                  name="newspaper-outline"
                  size={20}
                  color={theme.colors.primary}
                />
              </View>
              <View style={styles.cardHeaderInfo}>
                <Text style={styles.cardTitle}>{item.examTitle}</Text>
                <Text style={styles.cardDate}>{item.date}</Text>
              </View>
              <View style={styles.scoreBadge}>
                <Text style={styles.scoreText}>{item.score}</Text>
              </View>
            </View>

            <View style={styles.cardDivider} />

            <View style={styles.cardFooter}>
              <View style={styles.footerItem}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={15}
                  color={theme.colors.success}
                />
                <Text style={styles.footerText}>
                  {item.correctCount}/{item.totalCount} Benar
                </Text>
              </View>

              <View style={styles.footerItem}>
                <Ionicons
                  name="time-outline"
                  size={15}
                  color={theme.colors.inkSecondary}
                />
                <Text style={styles.footerText}>{item.duration}</Text>
              </View>

              <View
                style={[
                  styles.statusPill,
                  {
                    backgroundColor:
                      item.score >= 70
                        ? theme.colors.successLight
                        : theme.colors.dangerLight,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.statusPillText,
                    {
                      color:
                        item.score >= 70
                          ? theme.colors.success
                          : theme.colors.danger,
                    },
                  ]}
                >
                  {item.status}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.ground,
  },
  header: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.ink,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    color: theme.colors.inkSecondary,
    marginTop: 2,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  historyCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 14,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  examIconWrap: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primaryLight,
    borderWidth: 1,
    borderColor: theme.colors.primaryBorder,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardHeaderInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.ink,
  },
  cardDate: {
    fontSize: 12,
    color: theme.colors.inkSecondary,
    marginTop: 2,
  },
  scoreBadge: {
    backgroundColor: theme.colors.ground,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.borderStrong,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.primaryDark,
    fontVariant: ['tabular-nums'],
  },
  cardDivider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerText: {
    fontSize: 12,
    color: theme.colors.inkSecondary,
  },
  statusPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: theme.radius.full,
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
