import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/colors';

export default function ProfileScreen({ userData, onLogout }) {
  const handleConfirmLogout = () => {
    if (Platform.OS === 'web') {
      onLogout();
      return;
    }
    Alert.alert(
      'Konfirmasi Keluar',
      'Apakah Anda yakin ingin keluar dari sesi ujian?',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Keluar', style: 'destructive', onPress: onLogout },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profil Peserta</Text>
        <Text style={styles.headerSubtitle}>Informasi akun & identitas ujian</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarBig}>
            <Text style={styles.avatarBigText}>
              {userData.name ? userData.name.charAt(0).toUpperCase() : 'P'}
            </Text>
          </View>
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userRole}>Peserta Ujian Resmi</Text>

          <View style={styles.statusVerified}>
            <Ionicons name="shield-checkmark" size={14} color={theme.colors.success} />
            <Text style={styles.statusVerifiedText}>Terverifikasi Akademik</Text>
          </View>
        </View>

        {/* Academic Details Card */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Identitas Akademik</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Nomor Induk (NIM)</Text>
            <Text style={styles.infoValue}>{userData.idNumber || '20240901'}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Program Studi</Text>
            <Text style={styles.infoValue}>{userData.major || 'Sistem Informasi'}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Fakultas</Text>
            <Text style={styles.infoValue}>{userData.institution || 'Sains dan Teknologi'}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email Terdaftar</Text>
            <Text style={styles.infoValue}>{userData.email || 'rafly@peserta.cbt'}</Text>
          </View>
        </View>

        {/* System Info Card */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Sistem CBT</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status Koneksi</Text>
            <View style={styles.onlineBadge}>
              <View style={styles.onlineDot} />
              <Text style={styles.onlineText}>Terhubung</Text>
            </View>
          </View>
          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Versi Aplikasi</Text>
            <Text style={styles.infoValue}>1.0.0 (Expo SDK 58)</Text>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleConfirmLogout}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={18} color={theme.colors.danger} />
          <Text style={styles.logoutButtonText}>Keluar dari Akun</Text>
        </TouchableOpacity>
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
  profileCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: 24,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarBig: {
    width: 72,
    height: 72,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primaryLight,
    borderWidth: 2,
    borderColor: theme.colors.primaryBorder,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarBigText: {
    fontSize: 28,
    fontWeight: '800',
    color: theme.colors.primary,
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.ink,
  },
  userRole: {
    fontSize: 13,
    color: theme.colors.inkSecondary,
    marginTop: 2,
    marginBottom: 10,
  },
  statusVerified: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: theme.colors.successLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.radius.full,
    borderWidth: 1,
    borderColor: theme.colors.successBorder,
  },
  statusVerifiedText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.success,
  },
  sectionCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: 18,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.ink,
    marginBottom: 14,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  infoLabel: {
    fontSize: 13,
    color: theme.colors.inkSecondary,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.ink,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
  },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.success,
  },
  onlineText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.success,
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: theme.colors.surface,
    paddingVertical: 14,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.dangerBorder,
    marginTop: 6,
  },
  logoutButtonText: {
    color: theme.colors.danger,
    fontSize: 14,
    fontWeight: '700',
  },
});
