import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/colors';
import QuestionNavModal from '../components/QuestionNavModal';

export default function ExamScreen({
  questions,
  onFinishExam,
  onExitExam,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { 0: 'A', 1: 'C', ... }
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes in seconds
  const [isNavModalVisible, setIsNavModalVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

  const handleCompleteExam = useCallback((force = false) => {
    if (force) {
      onFinishExam({ answers, timeSpentSeconds: 3600 - timeLeft });
      return;
    }
    setIsConfirmModalVisible(true);
  }, [answers, onFinishExam, timeLeft]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimeout(() => handleCompleteExam(true), 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, handleCompleteExam]);

  const formatTimer = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQ = questions[currentIndex];
  const totalQ = questions.length;
  const progressRatio = (Object.keys(answers).length / totalQ) * 100;

  const handleSelectOption = (label) => {
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: label,
    }));
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQ - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleConfirmSubmit = () => {
    setIsConfirmModalVisible(false);
    onFinishExam({ answers, timeSpentSeconds: 3600 - timeLeft });
  };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.examTitle}>Ujian Matematika Dasar</Text>

          {/* Timer Component */}
          <View
            style={[
              styles.timerPill,
              timeLeft < 300 && styles.timerPillWarning,
            ]}
          >
            <Ionicons
              name="time-outline"
              size={16}
              color={timeLeft < 300 ? theme.colors.danger : theme.colors.primary}
            />
            <Text
              style={[
                styles.timerText,
                timeLeft < 300 && styles.timerTextWarning,
              ]}
            >
              {formatTimer(timeLeft)}
            </Text>
          </View>
        </View>

        {/* Progress & Question List trigger */}
        <View style={styles.headerSub}>
          <View style={styles.questionCounterBadge}>
            <Text style={styles.progressCounter}>
              Soal {(currentIndex + 1).toString().padStart(2, '0')}{' '}
              <Text style={styles.progressCounterTotal}>/ {totalQ.toString().padStart(2, '0')}</Text>
            </Text>
          </View>

          <TouchableOpacity
            style={styles.navModalTrigger}
            onPress={() => setIsNavModalVisible(true)}
            activeOpacity={0.7}
            accessibilityLabel="Buka Kisi-Kisi Soal"
          >
            <Ionicons name="grid-outline" size={14} color={theme.colors.primary} />
            <Text style={styles.navModalTriggerText}>Kisi-Kisi Soal</Text>
          </TouchableOpacity>
        </View>

        {/* Horizontal Progress Bar */}
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progressRatio}%` }]} />
        </View>
      </View>

      {/* Main Question Body */}
      <ScrollView
        contentContainerStyle={styles.scrollBody}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.questionCard}>
          <View style={styles.questionHeader}>
            <Text style={styles.questionLabel}>
              Pertanyaan {currentIndex + 1}
            </Text>
            <View style={styles.pointsBadge}>
              <Text style={styles.pointsText}>10 Poin</Text>
            </View>
          </View>

          <Text style={styles.questionText}>{currentQ.question}</Text>
        </View>

        {/* Options List */}
        <View style={styles.optionsContainer}>
          {currentQ.options.map((option) => {
            const isSelected = answers[currentIndex] === option.label;

            return (
              <TouchableOpacity
                key={option.label}
                style={[
                  styles.optionCard,
                  isSelected && styles.optionCardSelected,
                ]}
                onPress={() => handleSelectOption(option.label)}
                activeOpacity={0.75}
              >
                <View
                  style={[
                    styles.optionBadge,
                    isSelected && styles.optionBadgeSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.optionBadgeText,
                      isSelected && styles.optionBadgeTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                </View>

                <Text
                  style={[
                    styles.optionLabelText,
                    isSelected && styles.optionLabelTextSelected,
                  ]}
                >
                  {option.text}
                </Text>

                {isSelected && (
                  <View style={styles.checkIconWrap}>
                    <Ionicons
                      name="checkmark"
                      size={18}
                      color={theme.colors.primary}
                    />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Navigation Step Buttons */}
        <View style={styles.navButtonsRow}>
          <TouchableOpacity
            style={[
              styles.navStepButton,
              currentIndex === 0 && styles.navStepButtonDisabled,
            ]}
            onPress={handlePrev}
            disabled={currentIndex === 0}
            activeOpacity={0.7}
          >
            <Ionicons
              name="arrow-back"
              size={16}
              color={currentIndex === 0 ? theme.colors.inkSubtle : theme.colors.primary}
            />
            <Text
              style={[
                styles.navStepText,
                currentIndex === 0 && styles.navStepTextDisabled,
              ]}
            >
              Sebelumnya
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.navStepButton,
              styles.navStepButtonPrimary,
              currentIndex === totalQ - 1 && styles.navStepButtonDisabled,
            ]}
            onPress={handleNext}
            disabled={currentIndex === totalQ - 1}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.navStepTextPrimary,
                currentIndex === totalQ - 1 && styles.navStepTextDisabled,
              ]}
            >
              Selanjutnya
            </Text>
            <Ionicons
              name="arrow-forward"
              size={16}
              color={
                currentIndex === totalQ - 1
                  ? theme.colors.inkSubtle
                  : theme.colors.inkInverse
              }
            />
          </TouchableOpacity>
        </View>

        {/* Finish Exam Button */}
        <TouchableOpacity
          style={styles.finishExamButton}
          onPress={() => handleCompleteExam(false)}
          activeOpacity={0.8}
        >
          <Ionicons
            name="checkmark-done-circle-outline"
            size={18}
            color={theme.colors.inkInverse}
          />
          <Text style={styles.finishExamButtonText}>Kumpulkan Jawaban Ujian</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Finish Confirmation Modal */}
      <Modal
        visible={isConfirmModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsConfirmModalVisible(false)}
      >
        <View style={styles.confirmModalOverlay}>
          <View style={styles.confirmModalCard}>
            <View style={styles.confirmModalIconWrap}>
              <Ionicons name="help-circle" size={40} color={theme.colors.primary} />
            </View>
            <Text style={styles.confirmModalTitle}>Selesaikan Ujian?</Text>
            <Text style={styles.confirmModalDesc}>
              {totalQ - Object.keys(answers).length > 0
                ? `Kamu masih memiliki ${totalQ - Object.keys(answers).length} soal yang belum terjawab. Yakin ingin mengakhiri dan mengumpulkan jawaban?`
                : 'Semua 10 soal telah dijawab. Apakah kamu yakin ingin mengakhiri ujian dan melihat hasil skor?'}
            </Text>

            <View style={styles.confirmModalButtons}>
              <TouchableOpacity
                style={styles.confirmBtnCancel}
                onPress={() => setIsConfirmModalVisible(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.confirmBtnCancelText}>Periksa Lagi</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmBtnSubmit}
                onPress={handleConfirmSubmit}
                activeOpacity={0.8}
              >
                <Text style={styles.confirmBtnSubmitText}>Ya, Selesaikan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Question List Bottom Sheet Modal */}
      <QuestionNavModal
        visible={isNavModalVisible}
        onClose={() => setIsNavModalVisible(false)}
        totalQuestions={totalQ}
        currentIndex={currentIndex}
        answers={answers}
        onSelectQuestion={(idx) => setCurrentIndex(idx)}
        onFinishExam={() => handleCompleteExam(false)}
      />
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
    paddingTop: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  examTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.ink,
  },
  timerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: theme.colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: theme.radius.full,
    borderWidth: 1,
    borderColor: theme.colors.primaryBorder,
  },
  timerPillWarning: {
    backgroundColor: theme.colors.dangerLight,
    borderColor: theme.colors.dangerBorder,
  },
  timerText: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.primaryDark,
    fontVariant: ['tabular-nums'],
  },
  timerTextWarning: {
    color: theme.colors.danger,
  },
  headerSub: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  questionCounterBadge: {
    backgroundColor: theme.colors.surfaceSubtle,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  progressCounter: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.ink,
    fontVariant: ['tabular-nums'],
  },
  progressCounterTotal: {
    fontSize: 12,
    fontWeight: '500',
    color: theme.colors.inkSecondary,
  },
  navModalTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: theme.colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.primaryBorder,
  },
  navModalTriggerText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.primaryDark,
  },
  progressTrack: {
    height: 4,
    backgroundColor: theme.colors.surfaceSubtle,
    borderRadius: theme.radius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
  },
  scrollBody: {
    padding: 20,
    paddingBottom: 40,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  questionCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 20,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  questionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.primaryDark,
  },
  pointsBadge: {
    backgroundColor: theme.colors.ground,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: theme.radius.xs,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  pointsText: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.colors.inkSecondary,
  },
  questionText: {
    fontSize: 17,
    fontWeight: '700',
    color: theme.colors.ink,
    lineHeight: 24,
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  optionCardSelected: {
    backgroundColor: theme.colors.primaryLight,
    borderColor: theme.colors.primary,
    borderWidth: 1.5,
  },
  optionBadge: {
    width: 32,
    height: 32,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.ground,
    borderWidth: 1,
    borderColor: theme.colors.borderStrong,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  optionBadgeSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primaryDark,
  },
  optionBadgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.inkSecondary,
  },
  optionBadgeTextSelected: {
    color: theme.colors.inkInverse,
  },
  optionLabelText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: theme.colors.ink,
  },
  optionLabelTextSelected: {
    fontWeight: '700',
    color: theme.colors.primaryDark,
  },
  checkIconWrap: {
    marginLeft: 10,
  },
  navButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 16,
  },
  navStepButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.borderStrong,
    gap: 6,
  },
  navStepButtonPrimary: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  navStepButtonDisabled: {
    backgroundColor: theme.colors.ground,
    borderColor: theme.colors.border,
  },
  navStepText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.primaryDark,
  },
  navStepTextPrimary: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.inkInverse,
  },
  navStepTextDisabled: {
    color: theme.colors.inkSubtle,
  },
  finishExamButton: {
    backgroundColor: theme.colors.primaryDark,
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 14,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.primaryDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  finishExamButtonText: {
    color: theme.colors.inkInverse,
    fontSize: 15,
    fontWeight: '700',
  },
  confirmModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  confirmModalCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.xl,
    padding: 24,
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
  },
  confirmModalIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  confirmModalTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: theme.colors.ink,
    marginBottom: 8,
    textAlign: 'center',
  },
  confirmModalDesc: {
    fontSize: 14,
    color: theme.colors.inkMuted,
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 24,
  },
  confirmModalButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  confirmBtnCancel: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.borderStrong,
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
  },
  confirmBtnCancelText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.inkMuted,
  },
  confirmBtnSubmit: {
    flex: 1.2,
    paddingVertical: 12,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
  },
  confirmBtnSubmitText: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.inkInverse,
  },
});
