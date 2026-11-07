import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/colors';

export default function HomeScreen({
  userData,
  stats,
  onStartExam,
  lastExamResult,
}) {
  const displayScore = lastExamResult
    ? lastExamResult.score
    : stats.lastScore > 0
    ? stats.lastScore
    : 'Belum ada';

  const completedCount = lastExamResult
    ? stats.completedExams + 1
    : stats.completedExams;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Halo, {userData.name}!</Text>
          <Text style={styles.headerSubtitle}>Semangat mengerjakan ujian!</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {userData.name ? userData.name.charAt(0).toUpperCase() : 'P'}
          </Text>
        </View>
      </View>

      {/* Active Exam Card */}
      <View style={styles.examCard}>
        <View style={styles.examCardHeader}>
          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusBadgeText}>Ujian Tersedia</Text>
          </View>
          <Text style={styles.categoryTag}>Wajib</Text>
        </View>

        <Text style={styles.examTitle}>Ujian Matematika Dasar</Text>

        {/* Chips Row */}
        <View style={styles.chipsRow}>
          <View style={styles.chip}>
            <Ionicons name="document-text-outline" size={14} color={theme.colors.inkSecondary} />
            <Text style={styles.chipText}>10 Soal</Text>
          </View>
          <View style={styles.chip}>
            <Ionicons name="time-outline" size={14} color={theme.colors.inkSecondary} />
            <Text style={styles.chipText}>60 Menit</Text>
          </View>
          <View style={styles.chip}>
            <Ionicons name="ribbon-outline" size={14} color={theme.colors.inkSecondary} />
            <Text style={styles.chipText}>Passing 70%</Text>
          </View>
        </View>

        <View style={styles.lastScoreRow}>
          <Text style={styles.lastScoreLabel}>Nilai terakhir:</Text>
          <Text style={styles.lastScoreValue}>
            {typeof displayScore === 'number' ? `${displayScore} / 100` : displayScore}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.startExamButton}
          onPress={onStartExam}
          activeOpacity={0.8}
        >
          <Text style={styles.startExamButtonText}>Mulai Ujian</Text>
          <Ionicons name="arrow-forward" size={18} color={theme.colors.inkInverse} />
        </TouchableOpacity>
      </View>

      {/* Information Alert Box */}
      <View style={styles.infoBox}>
        <Ionicons
          name="information-circle"
          size={20}
          color={theme.colors.primary}
          style={styles.infoIcon}
        />
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoTitle}>Informasi Penting</Text>
          <Text style={styles.infoText}>
            Pastikan koneksi stabil dan baca petunjuk sebelum memulai ujian.
          </Text>
        </View>
      </View>

      {/* Statistics Section */}
      <Text style={styles.sectionHeader}>Statistik Akademik</Text>
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: theme.colors.primary }]}>
            {displayScore !== 'Belum ada' ? displayScore : '—'}
          </Text>
          <Text style={styles.statLabel}>Nilai Terakhir</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: theme.colors.success }]}>
            {completedCount}
          </Text>
          <Text style={styles.statLabel}>Ujian Selesai</Text>
        </View>
      </View>

      {/* Upcoming Exam Schedule */}
      <Text style={styles.sectionHeader}>Jadwal Ujian Mendatang</Text>
      <View style={styles.scheduleCard}>
        <View style={styles.scheduleItem}>
          <View style={styles.scheduleIconWrap}>
            <Ionicons name="calendar-outline" size={18} color={theme.colors.primary} />
          </View>
          <View style={styles.scheduleInfo}>
            <Text style={styles.scheduleTitle}>Basis Data Lanjut</Text>
            <Text style={styles.scheduleDate}>Selasa, 10 Nov 2026 • 09:00 WIB</Text>
          </View>
          <View style={styles.scheduleStatus}>
            <Text style={styles.scheduleStatusText}>Terjadwal</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.ground,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.ink,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: theme.colors.inkSecondary,
    marginTop: 2,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primaryLight,
    borderWidth: 1.5,
    borderColor: theme.colors.primaryBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  examCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 20,
  },
  examCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.radius.full,
    borderWidth: 1,
    borderColor: theme.colors.primaryBorder,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary,
    marginRight: 6,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  categoryTag: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.inkSecondary,
  },
  examTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.ink,
    marginBottom: 14,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: theme.colors.ground,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  chipText: {
    fontSize: 12,
    color: theme.colors.inkSecondary,
    fontWeight: '500',
  },
  lastScoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 16,
  },
  lastScoreLabel: {
    fontSize: 13,
    color: theme.colors.inkSecondary,
  },
  lastScoreValue: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.ink,
  },
  startExamButton: {
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: theme.radius.md,
    gap: 8,
  },
  startExamButtonText: {
    color: theme.colors.inkInverse,
    fontSize: 15,
    fontWeight: '700',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.primaryBorder,
    marginBottom: 24,
    alignItems: 'flex-start',
  },
  infoIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.ink,
    marginBottom: 2,
  },
  infoText: {
    fontSize: 13,
    lineHeight: 18,
    color: theme.colors.inkSecondary,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.ink,
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 4,
    fontVariant: ['tabular-nums'],
  },
  statLabel: {
    fontSize: 13,
    color: theme.colors.inkSecondary,
    fontWeight: '500',
  },
  scheduleCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 14,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleIconWrap: {
    width: 38,
    height: 38,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  scheduleInfo: {
    flex: 1,
  },
  scheduleTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.ink,
  },
  scheduleDate: {
    fontSize: 12,
    color: theme.colors.inkSecondary,
    marginTop: 2,
  },
  scheduleStatus: {
    backgroundColor: theme.colors.ground,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.radius.xs,
    borderWidth: 1,
    borderColor: theme.colors.borderStrong,
  },
  scheduleStatusText: {
    fontSize: 11,
    color: theme.colors.inkSecondary,
    fontWeight: '600',
  },
});
