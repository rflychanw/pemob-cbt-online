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

export default function ReviewScreen({
  questions,
  userAnswers,
  onBackToHome,
}) {
  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBackToHome}
          accessibilityLabel="Kembali ke Beranda"
        >
          <Ionicons name="arrow-back" size={20} color={theme.colors.ink} />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Pembahasan Ujian</Text>
        <View style={styles.topBarSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.introCard}>
          <Text style={styles.introTitle}>Review & Evaluasi Jawaban</Text>
          <Text style={styles.introText}>
            Berikut adalah rincian jawaban Anda beserta kunci jawaban dan penjelasannya.
          </Text>
        </View>

        {questions.map((q, index) => {
          const userAnswer = userAnswers[index];
          const isCorrect = userAnswer === q.correctAnswer;
          const isUnanswered = userAnswer === undefined;

          return (
            <View key={q.id} style={styles.reviewCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.questionNumber}>Nomor {index + 1}</Text>
                <View
                  style={[
                    styles.statusBadge,
                    isCorrect
                      ? styles.badgeCorrect
                      : isUnanswered
                      ? styles.badgeUnanswered
                      : styles.badgeWrong,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusBadgeText,
                      isCorrect
                        ? styles.textCorrect
                        : isUnanswered
                        ? styles.textUnanswered
                        : styles.textWrong,
                    ]}
                  >
                    {isCorrect
                      ? 'Benar (+10)'
                      : isUnanswered
                      ? 'Tidak Dijawab (0)'
                      : 'Salah (0)'}
                  </Text>
                </View>
              </View>

              <Text style={styles.questionText}>{q.question}</Text>

              {/* Options Breakdown */}
              <View style={styles.optionsList}>
                {q.options.map((opt) => {
                  const isUserPick = userAnswer === opt.label;
                  const isKeyAnswer = q.correctAnswer === opt.label;

                  let optCardStyle = styles.optDefault;
                  if (isKeyAnswer) optCardStyle = styles.optKey;
                  else if (isUserPick && !isCorrect) optCardStyle = styles.optWrong;

                  return (
                    <View key={opt.label} style={[styles.optRow, optCardStyle]}>
                      <View style={styles.optBadge}>
                        <Text style={styles.optBadgeText}>{opt.label}</Text>
                      </View>
                      <Text style={styles.optText}>{opt.text}</Text>
                      {isKeyAnswer && (
                        <View style={styles.tagKey}>
                          <Text style={styles.tagKeyText}>Kunci</Text>
                        </View>
                      )}
                      {isUserPick && (
                        <View
                          style={[
                            styles.tagUser,
                            isCorrect ? styles.tagUserCorrect : styles.tagUserWrong,
                          ]}
                        >
                          <Text style={styles.tagUserText}>Pilihan Anda</Text>
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>

              {/* Explanation Box */}
              <View style={styles.explanationBox}>
                <Text style={styles.explanationTitle}>Pembahasan:</Text>
                <Text style={styles.explanationContent}>{q.explanation}</Text>
              </View>
            </View>
          );
        })}

        <TouchableOpacity
          style={styles.doneButton}
          onPress={onBackToHome}
          activeOpacity={0.8}
        >
          <Text style={styles.doneButtonText}>Selesai Meninjau</Text>
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
    paddingBottom: 40,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  introCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 16,
  },
  introTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.ink,
  },
  introText: {
    fontSize: 13,
    color: theme.colors.inkSecondary,
    marginTop: 4,
    lineHeight: 18,
  },
  reviewCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: 18,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  questionNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.primaryDark,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: theme.radius.full,
  },
  badgeCorrect: {
    backgroundColor: theme.colors.successLight,
  },
  badgeWrong: {
    backgroundColor: theme.colors.dangerLight,
  },
  badgeUnanswered: {
    backgroundColor: theme.colors.surfaceSubtle,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  textCorrect: {
    color: theme.colors.success,
  },
  textWrong: {
    color: theme.colors.danger,
  },
  textUnanswered: {
    color: theme.colors.inkSecondary,
  },
  questionText: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.ink,
    lineHeight: 22,
    marginBottom: 14,
  },
  optionsList: {
    gap: 8,
    marginBottom: 14,
  },
  optRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  optDefault: {
    backgroundColor: theme.colors.surface,
  },
  optKey: {
    backgroundColor: theme.colors.successLight,
    borderColor: theme.colors.successBorder,
  },
  optWrong: {
    backgroundColor: theme.colors.dangerLight,
    borderColor: theme.colors.dangerBorder,
  },
  optBadge: {
    width: 24,
    height: 24,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.ground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  optBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.ink,
  },
  optText: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.ink,
  },
  tagKey: {
    backgroundColor: theme.colors.success,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: theme.radius.xs,
    marginLeft: 6,
  },
  tagKeyText: {
    fontSize: 10,
    fontWeight: '700',
    color: theme.colors.inkInverse,
  },
  tagUser: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: theme.radius.xs,
    marginLeft: 6,
  },
  tagUserCorrect: {
    backgroundColor: theme.colors.primary,
  },
  tagUserWrong: {
    backgroundColor: theme.colors.danger,
  },
  tagUserText: {
    fontSize: 10,
    fontWeight: '700',
    color: theme.colors.inkInverse,
  },
  explanationBox: {
    backgroundColor: theme.colors.ground,
    padding: 12,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  explanationTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.inkSecondary,
    marginBottom: 4,
  },
  explanationContent: {
    fontSize: 13,
    color: theme.colors.ink,
    lineHeight: 18,
  },
  doneButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    marginTop: 8,
  },
  doneButtonText: {
    color: theme.colors.inkInverse,
    fontSize: 15,
    fontWeight: '700',
  },
});
