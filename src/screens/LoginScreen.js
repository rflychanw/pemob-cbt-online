import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/colors';

export default function LoginScreen({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = () => {
    if (!username.trim()) {
      setErrorMsg('Masukkan username atau email');
      return;
    }
    if (!password.trim()) {
      setErrorMsg('Masukkan password');
      return;
    }
    setErrorMsg('');
    onLoginSuccess({
      name: username.includes('@') ? username.split('@')[0] : username,
      username: username,
    });
  };

  const handleFillDemo = () => {
    setUsername('rafly.sisfo');
    setPassword('peserta2026');
    setErrorMsg('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Hero Visual Area */}
        <View style={styles.heroSection}>
          <View style={styles.avatarCircle}>
            <Ionicons name="laptop-outline" size={48} color={theme.colors.primary} />
            <View style={styles.floatingBadgeLeft}>
              <Ionicons name="checkmark-circle" size={18} color={theme.colors.success} />
            </View>
            <View style={styles.floatingBadgeRight}>
              <Text style={styles.badgeLetter}>A</Text>
            </View>
          </View>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Silakan masuk untuk memulai ujian</Text>
        </View>

        {/* Form Container */}
        <View style={styles.formCard}>
          {errorMsg ? (
            <View style={styles.errorBanner}>
              <Ionicons name="alert-circle" size={16} color={theme.colors.danger} />
              <Text style={styles.errorText}>{errorMsg}</Text>
            </View>
          ) : null}

          {/* Username Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Username atau Email</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="person-outline"
                size={18}
                color={theme.colors.inkMuted}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Contoh: rafly.sisfo"
                placeholderTextColor={theme.colors.inkSubtle}
                value={username}
                onChangeText={(t) => {
                  setUsername(t);
                  if (errorMsg) setErrorMsg('');
                }}
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="lock-closed-outline"
                size={18}
                color={theme.colors.inkMuted}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Masukkan kata sandi"
                placeholderTextColor={theme.colors.inkSubtle}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={(t) => {
                  setPassword(t);
                  if (errorMsg) setErrorMsg('');
                }}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.togglePassBtn}
                accessibilityLabel="Tampilkan password"
              >
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={18}
                  color={theme.colors.inkMuted}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Options Row */}
          <View style={styles.optionsRow}>
            <TouchableOpacity onPress={handleFillDemo} style={styles.demoFillBtn}>
              <Ionicons name="flash-outline" size={14} color={theme.colors.primary} />
              <Text style={styles.demoFillText}>Isi Akun Demo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Lupa Password',
                  'Silakan hubungi administrator CBT di fakultas untuk reset token ujian Anda.'
                )
              }
            >
              <Text style={styles.forgotText}>Lupa password?</Text>
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Belum punya akun? </Text>
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                'Bantuan Akun',
                'Pendaftaran akun dilakukan terpusat oleh Admin Akademik. Hubungi admin@cbt.ac.id'
              )
            }
          >
            <Text style={styles.footerLink}>Hubungi Admin</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: theme.colors.ground,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
    maxWidth: 480,
    width: '100%',
    alignSelf: 'center',
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 28,
  },
  avatarCircle: {
    width: 104,
    height: 104,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primaryLight,
    borderWidth: 1,
    borderColor: theme.colors.primaryBorder,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 20,
  },
  floatingBadgeLeft: {
    position: 'absolute',
    top: 6,
    left: -4,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.full,
    padding: 3,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  floatingBadgeRight: {
    position: 'absolute',
    bottom: 6,
    right: -4,
    width: 26,
    height: 26,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeLetter: {
    color: theme.colors.inkInverse,
    fontSize: 13,
    fontWeight: '800',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: theme.colors.ink,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.inkSecondary,
    marginTop: 6,
  },
  formCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: 22,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: theme.colors.dangerLight,
    borderColor: theme.colors.dangerBorder,
    borderWidth: 1,
    padding: 10,
    borderRadius: theme.radius.sm,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 13,
    color: theme.colors.danger,
    fontWeight: '500',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.inkSecondary,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.ground,
    borderWidth: 1,
    borderColor: theme.colors.borderStrong,
    borderRadius: theme.radius.md,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 46,
    fontSize: 14,
    color: theme.colors.ink,
  },
  togglePassBtn: {
    padding: 6,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 2,
  },
  demoFillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: theme.colors.primaryLight,
    borderRadius: theme.radius.sm,
  },
  demoFillText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  forgotText: {
    fontSize: 13,
    color: theme.colors.primary,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: theme.colors.primary,
    height: 48,
    borderRadius: theme.radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: theme.colors.inkInverse,
    fontSize: 15,
    fontWeight: '700',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 13,
    color: theme.colors.inkSecondary,
  },
  footerLink: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.primaryDark,
  },
});
