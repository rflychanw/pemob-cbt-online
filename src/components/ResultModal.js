import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { theme } from '../theme/colors';

export default function ResultModal({
  visible,
  score,
  totalQuestions,
  correctCount,
  wrongCount,
  unansweredCount,
  durationSpent,
  onReview,
  onBackToHome,
}) {
  const isPassed = score >= 70;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.card}>
          {/* Header Badge */}
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: isPassed ? theme.colors.successLight : theme.colors.warningLight },
            ]}
          >
            <Text
              style={[
                styles.statusBadgeText,
                { color: isPassed ? theme.colors.success : theme.colors.warning },
              ]}
            >
              {isPassed ? 'LULUS UJIAN' : 'PERLU PERBAIKAN'}
            </Text>
          </View>

          <Text style={styles.title}>Hasil Ujian Matematika Dasar</Text>
          <Text style={styles.subtitle}>
            Ujian telah selesai dan jawaban Anda telah tersimpan.
          </Text>

          {/* Big Score Box */}
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreNumber}>{score}</Text>
            <Text style={styles.scoreOutOf}>/ 100</Text>
          </View>

          {/* Breakdown Grid */}
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Benar</Text>
              <Text style={[styles.statValue, { color: theme.colors.success }]}>
                {correctCount}
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Salah</Text>
              <Text style={[styles.statValue, { color: theme.colors.danger }]}>
                {wrongCount}
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Kosong</Text>
              <Text style={[styles.statValue, { color: theme.colors.inkSecondary }]}>
                {unansweredCount}
              </Text>
            </View>
          </View>

          {/* Time spent */}
          <View style={styles.timeRow}>
            <Text style={styles.timeLabel}>Waktu Pengerjaan:</Text>
            <Text style={styles.timeValue}>{durationSpent}</Text>
          </View>

          {/* Actions */}
          <View style={styles.actionContainer}>
            <TouchableOpacity
              style={styles.reviewButton}
              onPress={onReview}
              activeOpacity={0.8}
            >
              <Text style={styles.reviewButtonText}>Tinjau Pembahasan</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.homeButton}
              onPress={onBackToHome}
              activeOpacity={0.8}
            >
              <Text style={styles.homeButtonText}>Kembali ke Beranda</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: 24,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: theme.radius.full,
    marginBottom: 12,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.ink,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: theme.colors.inkSecondary,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 20,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: theme.colors.ground,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 20,
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: '800',
    color: theme.colors.primaryDark,
    fontVariant: ['tabular-nums'],
  },
  scoreOutOf: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.inkMuted,
    marginLeft: 6,
  },
  statsGrid: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: theme.colors.ground,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 12,
    marginBottom: 14,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: '70%',
    backgroundColor: theme.colors.border,
    alignSelf: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.inkSecondary,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 4,
    marginBottom: 22,
  },
  timeLabel: {
    fontSize: 13,
    color: theme.colors.inkSecondary,
  },
  timeValue: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.ink,
  },
  actionContainer: {
    width: '100%',
    gap: 10,
  },
  reviewButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 13,
    borderRadius: theme.radius.md,
    alignItems: 'center',
  },
  reviewButtonText: {
    color: theme.colors.inkInverse,
    fontSize: 14,
    fontWeight: '700',
  },
  homeButton: {
    backgroundColor: theme.colors.ground,
    paddingVertical: 13,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.borderStrong,
  },
  homeButtonText: {
    color: theme.colors.ink,
    fontSize: 14,
    fontWeight: '600',
  },
});
