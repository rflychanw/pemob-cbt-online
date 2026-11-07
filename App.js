import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { theme } from './src/theme/colors';
import { defaultQuestions, examDetails } from './src/data/questions';
import { initialUserData, initialStats, initialHistory } from './src/data/mockData';

import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ExamInstructionScreen from './src/screens/ExamInstructionScreen';
import ExamScreen from './src/screens/ExamScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ReviewScreen from './src/screens/ReviewScreen';

import TabBar from './src/components/TabBar';
import ResultModal from './src/components/ResultModal';

export default function App() {
  // Navigation State
  const [currentScreen, setCurrentScreen] = useState('splash'); // splash, login, main, instruction, exam, review
  const [activeTab, setActiveTab] = useState('home'); // home, history, profile

  // User & Exam State
  const [userData, setUserData] = useState(initialUserData);
  const [stats, setStats] = useState(initialStats);
  const [history, setHistory] = useState(initialHistory);

  // Exam Run State
  const [examAnswers, setExamAnswers] = useState({});
  const [lastResult, setLastResult] = useState(null);
  const [isResultModalVisible, setIsResultModalVisible] = useState(false);

  // Handlers
  const handleSplashFinish = () => {
    setCurrentScreen('login');
  };

  const handleLoginSuccess = (user) => {
    setUserData((prev) => ({
      ...prev,
      name: user.name || prev.name,
      email: user.username ? `${user.username}@peserta.cbt` : prev.email,
    }));
    setCurrentScreen('main');
  };

  const handleStartExamFlow = () => {
    setCurrentScreen('instruction');
  };

  const handleConfirmStartExam = () => {
    setCurrentScreen('exam');
  };

  const handleFinishExam = ({ answers, timeSpentSeconds }) => {
    setExamAnswers(answers);

    // Calculate score
    let correct = 0;
    defaultQuestions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) {
        correct += 1;
      }
    });

    const score = correct * examDetails.pointsPerCorrect;
    const totalQ = defaultQuestions.length;
    const wrong = Object.keys(answers).length - correct;
    const unanswered = totalQ - Object.keys(answers).length;

    const m = Math.floor(timeSpentSeconds / 60);
    const s = timeSpentSeconds % 60;
    const durationSpent = `${m} menit ${s} detik`;

    const resultData = {
      score,
      totalQuestions: totalQ,
      correctCount: correct,
      wrongCount: wrong,
      unansweredCount: unanswered,
      durationSpent,
      date: 'Hari ini',
    };

    setLastResult(resultData);

    // Add to history
    const newHistoryItem = {
      id: `hist-${Date.now()}`,
      examTitle: examDetails.title,
      date: '07 Nov 2026',
      score,
      status: score >= examDetails.passingScore ? 'Lulus' : 'Belum Lulus',
      correctCount: correct,
      totalCount: totalQ,
      duration: `${m} menit`,
    };
    setHistory((prev) => [newHistoryItem, ...prev]);

    // Update stats
    setStats((prev) => ({
      ...prev,
      lastScore: score,
      completedExams: prev.completedExams + 1,
    }));

    setIsResultModalVisible(true);
  };

  const handleReviewAnswers = () => {
    setIsResultModalVisible(false);
    setCurrentScreen('review');
  };

  const handleBackToHomeFromResult = () => {
    setIsResultModalVisible(false);
    setCurrentScreen('main');
    setActiveTab('home');
  };

  const handleLogout = () => {
    setCurrentScreen('login');
    setActiveTab('home');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style={currentScreen === 'splash' ? 'light' : 'dark'} />

        {currentScreen === 'splash' && (
          <SplashScreen onFinish={handleSplashFinish} />
        )}

        {currentScreen === 'login' && (
          <LoginScreen onLoginSuccess={handleLoginSuccess} />
        )}

        {currentScreen === 'main' && (
          <View style={styles.mainContainer}>
            <View style={styles.screenContent}>
              {activeTab === 'home' && (
                <HomeScreen
                  userData={userData}
                  stats={stats}
                  onStartExam={handleStartExamFlow}
                  lastExamResult={lastResult}
                />
              )}
              {activeTab === 'history' && (
                <HistoryScreen historyList={history} />
              )}
              {activeTab === 'profile' && (
                <ProfileScreen
                  userData={userData}
                  onLogout={handleLogout}
                />
              )}
            </View>
            <TabBar activeTab={activeTab} onSelectTab={setActiveTab} />
          </View>
        )}

        {currentScreen === 'instruction' && (
          <ExamInstructionScreen
            onBack={() => setCurrentScreen('main')}
            onConfirmStart={handleConfirmStartExam}
          />
        )}

        {currentScreen === 'exam' && (
          <ExamScreen
            questions={defaultQuestions}
            onFinishExam={handleFinishExam}
            onExitExam={() => setCurrentScreen('main')}
          />
        )}

        {currentScreen === 'review' && (
          <ReviewScreen
            questions={defaultQuestions}
            userAnswers={examAnswers}
            onBackToHome={() => {
              setCurrentScreen('main');
              setActiveTab('home');
            }}
          />
        )}

        {/* Global Result Dialog Modal */}
        {lastResult && (
          <ResultModal
            visible={isResultModalVisible}
            score={lastResult.score}
            totalQuestions={lastResult.totalQuestions}
            correctCount={lastResult.correctCount}
            wrongCount={lastResult.wrongCount}
            unansweredCount={lastResult.unansweredCount}
            durationSpent={lastResult.durationSpent}
            onReview={handleReviewAnswers}
            onBackToHome={handleBackToHomeFromResult}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.ground,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: theme.colors.ground,
  },
  screenContent: {
    flex: 1,
  },
});

