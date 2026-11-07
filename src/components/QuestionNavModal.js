import React, { useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const DRAWER_WIDTH = Math.min(SCREEN_WIDTH * 0.82, 330);

export default function QuestionNavModal({
  visible,
  onClose,
  totalQuestions,
  currentIndex,
  answers,
  onSelectQuestion,
  onFinishExam,
}) {
  const [slideAnim] = React.useState(() => new Animated.Value(DRAWER_WIDTH));
  const [fadeAnim] = React.useState(() => new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      slideAnim.setValue(DRAWER_WIDTH);
      fadeAnim.setValue(0);
    }
  }, [visible]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: DRAWER_WIDTH,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  const answeredCount = Object.keys(answers).length;
  const unansweredCount = totalQuestions - answeredCount;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
    >
      <View style={styles.modalRoot}>
        {/* Dark Scrim Backdrop */}
        <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
          <Pressable style={styles.backdropPressable} onPress={handleClose} />
        </Animated.View>

        {/* Right Slide-over Drawer */}
        <Animated.View
          style={[
            styles.drawer,
            { width: DRAWER_WIDTH, transform: [{ translateX: slideAnim }] },
          ]}
        >
          {/* Drawer Header */}
          <View style={styles.header}>
            <View style={styles.headerTitleWrap}>
              <View style={styles.headerIconBadge}>
                <Ionicons name="grid-outline" size={16} color={theme.colors.primary} />
              </View>
              <View>
                <Text style={styles.title}>Kisi-Kisi Soal</Text>
                <Text style={styles.subtitle}>
                  Matematika • {totalQuestions} Butir
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={handleClose}
              style={styles.closeButton}
              accessibilityLabel="Tutup Kisi-Kisi"
              activeOpacity={0.7}
            >
              <Ionicons name="close" size={18} color={theme.colors.inkSecondary} />
            </TouchableOpacity>
          </View>

          {/* Progress Tracker Card */}
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Kemajuan Pengerjaan</Text>
              <Text style={styles.progressValue}>{progressPercent}%</Text>
            </View>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${progressPercent}%` },
                ]}
              />
            </View>
            <View style={styles.progressStatsRow}>
              <View style={styles.statChip}>
                <View style={[styles.statDot, { backgroundColor: theme.colors.success }]} />
                <Text style={styles.statChipText}>{answeredCount} Terjawab</Text>
              </View>
              <View style={styles.statChip}>
                <View style={[styles.statDot, { backgroundColor: theme.colors.inkSubtle }]} />
                <Text style={styles.statChipText}>{unansweredCount} Sisa</Text>
              </View>
            </View>
          </View>

          {/* Legend Chips */}
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendBox, styles.legendBoxActive]}>
                <Text style={styles.legendBoxTextActive}>1</Text>
              </View>
              <Text style={styles.legendLabel}>Aktif</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendBox, styles.legendBoxAnswered]}>
                <Ionicons name="checkmark" size={11} color={theme.colors.success} />
              </View>
              <Text style={styles.legendLabel}>Terjawab</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendBox, styles.legendBoxEmpty]}>
                <Text style={styles.legendBoxTextEmpty}>-</Text>
              </View>
              <Text style={styles.legendLabel}>Kosong</Text>
            </View>
          </View>

          {/* Numbers Grid in Scrollable Area */}
          <ScrollView
            style={styles.scrollArea}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.gridSectionTitle}>Pilih Nomor Soal:</Text>
            <View style={styles.grid}>
              {Array.from({ length: totalQuestions }, (_, i) => {
                const questionIndex = i;
                const isCurrent = currentIndex === questionIndex;
                const isAnswered = answers[questionIndex] !== undefined;

                let chipStyle = styles.numBoxEmpty;
                let textStyle = styles.numTextEmpty;

                if (isCurrent) {
                  chipStyle = styles.numBoxCurrent;
                  textStyle = styles.numTextCurrent;
                } else if (isAnswered) {
                  chipStyle = styles.numBoxAnswered;
                  textStyle = styles.numTextAnswered;
                }

                return (
                  <TouchableOpacity
                    key={i}
                    style={[styles.numBox, chipStyle]}
                    onPress={() => {
                      onSelectQuestion(questionIndex);
                      handleClose();
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.numText, textStyle]}>
                      {String(i + 1).padStart(2, '0')}
                    </Text>
                    {isAnswered && !isCurrent && (
                      <View style={styles.checkBadge}>
                        <Ionicons name="checkmark" size={10} color={theme.colors.success} />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>

          {/* Drawer Footer Actions */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.finishButton}
              onPress={() => {
                handleClose();
                setTimeout(() => {
                  onFinishExam();
                }, 220);
              }}
              activeOpacity={0.8}
            >
              <Ionicons
                name="checkmark-done-circle-outline"
                size={18}
                color={theme.colors.inkInverse}
              />
              <Text style={styles.finishButtonText}>Selesaikan Ujian</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
  },
  backdropPressable: {
    flex: 1,
  },
  drawer: {
    height: '100%',
    backgroundColor: theme.colors.surface,
    borderLeftWidth: 1,
    borderLeftColor: theme.colors.border,
    elevation: 16,
    shadowColor: '#0f172a',
    shadowOffset: { width: -4, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerIconBadge: {
    width: 32,
    height: 32,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.ink,
    letterSpacing: -0.2,
  },
  subtitle: {
    fontSize: 11,
    color: theme.colors.inkSecondary,
    marginTop: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCard: {
    marginHorizontal: 16,
    marginTop: 14,
    padding: 12,
    backgroundColor: theme.colors.surfaceSubtle,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.colors.inkSecondary,
  },
  progressValue: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  progressTrack: {
    height: 6,
    backgroundColor: theme.colors.border,
    borderRadius: theme.radius.full,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.full,
  },
  progressStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  statDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  statChipText: {
    fontSize: 11,
    fontWeight: '500',
    color: theme.colors.inkMuted,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    marginHorizontal: 16,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendBox: {
    width: 20,
    height: 20,
    borderRadius: theme.radius.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  legendBoxActive: {
    backgroundColor: theme.colors.primary,
  },
  legendBoxTextActive: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
  },
  legendBoxAnswered: {
    backgroundColor: theme.colors.successLight,
    borderWidth: 1,
    borderColor: theme.colors.successBorder,
  },
  legendBoxEmpty: {
    backgroundColor: theme.colors.ground,
    borderWidth: 1,
    borderColor: theme.colors.borderStrong,
  },
  legendBoxTextEmpty: {
    color: theme.colors.inkSubtle,
    fontSize: 10,
  },
  legendLabel: {
    fontSize: 11,
    color: theme.colors.inkSecondary,
    fontWeight: '500',
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  gridSectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.inkMuted,
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  numBox: {
    width: '18%',
    aspectRatio: 1,
    borderRadius: theme.radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  numBoxCurrent: {
    backgroundColor: theme.colors.primary,
    borderWidth: 1.5,
    borderColor: theme.colors.primaryDark,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  numBoxAnswered: {
    backgroundColor: theme.colors.successLight,
    borderWidth: 1,
    borderColor: theme.colors.successBorder,
  },
  numBoxEmpty: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.borderStrong,
  },
  numText: {
    fontSize: 13,
    fontWeight: '700',
  },
  numTextCurrent: {
    color: theme.colors.inkInverse,
  },
  numTextAnswered: {
    color: theme.colors.success,
  },
  numTextEmpty: {
    color: theme.colors.inkSecondary,
  },
  checkBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  finishButton: {
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 13,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  finishButtonText: {
    color: theme.colors.inkInverse,
    fontSize: 14,
    fontWeight: '700',
  },
});
