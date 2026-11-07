import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/colors';

export default function ExamInstructionScreen({ onBack, onConfirmStart }) {
  const [agreed, setAgreed] = useState(false);

  const handleStart = () => {
    if (!agreed) {
      Alert.alert(
        'Persetujuan Diperlukan',
        'Centang kotak konfirmasi bahwa Anda telah membaca dan memahami petunjuk ujian.'
      );
      return;
    }
    onConfirmStart();
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          accessibilityLabel="Kembali ke Beranda"
        >
          <Ionicons name="arrow-back" size={20} color={theme.colors.ink} />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Petunjuk Ujian</Text>
        <View style={styles.topBarSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Exam Information Card */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>Informasi Ujian</Text>

          <View style={styles.infoRow}>
            <Text style={styles.rowLabel}>Jumlah Soal</Text>
            <Text style={styles.rowValue}>10 Soal</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.rowLabel}>Jenis Soal</Text>
            <Text style={styles.rowValue}>Pilihan Ganda</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.rowLabel}>Pilihan Jawaban</Text>
            <Text style={styles.rowValue}>A, B, C, D</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.rowLabel}>Durasi</Text>
            <Text style={styles.rowValue}>60 Menit</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.rowLabel}>Jawaban Benar</Text>
            <Text style={[styles.rowValue, styles.scoreGreen]}>+10 Poin</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.rowLabel}>Jawaban Salah</Text>
            <Text style={[styles.rowValue, styles.scoreMuted]}>0 Poin</Text>
          </View>
        </View>

        {/* Notice Alert Box */}
        <View style={styles.noticeBox}>
          <Ionicons
            name="information-circle"
            size={22}
            color={theme.colors.primary}
            style={styles.noticeIcon}
          />
          <Text style={styles.noticeText}>
            Nilai akan langsung muncul dan tersimpan setelah kamu menekan tombol Finish Ujian.
          </Text>
        </View>

        {/* Confirmation Checkbox */}
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setAgreed(!agreed)}
          activeOpacity={0.8}
        >
          <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
            {agreed && <Ionicons name="checkmark" size={16} color={theme.colors.inkInverse} />}
          </View>
          <Text style={styles.checkboxLabel}>
            Saya telah membaca dan memahami petunjuk ujian
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Sticky Action Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.startButton, !agreed && styles.startButtonDisabled]}
          onPress={handleStart}
          activeOpacity={agreed ? 0.8 : 1}
        >
          <Text style={styles.startButtonText}>Saya Siap, Mulai Ujian</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.ground,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.ground,
    borderWidth: 1,
    borderColor: theme.colors.borderStrong,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: theme.colors.ink,
  },
  topBarSpacer: {
    width: 40,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 20,
  },
  cardHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.ink,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  rowLabel: {
    fontSize: 14,
    color: theme.colors.inkSecondary,
  },
  rowValue: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.ink,
  },
  scoreGreen: {
    color: theme.colors.success,
    fontWeight: '700',
  },
  scoreMuted: {
    color: theme.colors.inkSecondary,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
  },
  noticeBox: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.primaryBorder,
    marginBottom: 24,
    alignItems: 'center',
  },
  noticeIcon: {
    marginRight: 12,
  },
  noticeText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    color: theme.colors.inkSecondary,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: theme.radius.xs,
    borderWidth: 1.5,
    borderColor: theme.colors.borderStrong,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: theme.colors.surface,
  },
  checkboxChecked: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.ink,
    fontWeight: '500',
    lineHeight: 20,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  startButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  startButtonDisabled: {
    backgroundColor: theme.colors.inkSubtle,
  },
  startButtonText: {
    color: theme.colors.inkInverse,
    fontSize: 15,
    fontWeight: '700',
  },
});
