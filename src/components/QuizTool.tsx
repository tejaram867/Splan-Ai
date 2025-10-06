import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle, XCircle, Award, Sparkles, Home } from 'lucide-react';

interface QuizQuestion {
  type: 'mcq' | 'true-false' | 'fill-blank';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  userAnswer?: string | number;
}

interface QuizToolProps {
  text: string;
  onBack: () => void;
  onBackToHome: () => void;
}

export function QuizTool({ text, onBack, onBackToHome }: QuizToolProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<string | number>('');
  const [showResults, setShowResults] = useState(false);
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    generateQuiz();
  }, []);

  const generateQuiz = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const allQuestions: QuizQuestion[] = [
      {
        type: 'mcq',
        question: 'What is the primary focus of this document?',
        options: [
          'General overview',
          'Detailed analysis',
          'Practical application',
          'Historical context'
        ],
        correctAnswer: 0
      },
      {
        type: 'true-false',
        question: 'The document provides comprehensive coverage of the main topic.',
        options: ['True', 'False'],
        correctAnswer: 0
      },
      {
        type: 'fill-blank',
        question: 'The main concept discussed is related to _____ and its applications.',
        correctAnswer: 'knowledge'
      },
      {
        type: 'mcq',
        question: 'Which statement best describes the key takeaway?',
        options: [
          'Understanding fundamentals',
          'Advanced techniques',
          'Real-world examples',
          'Future implications'
        ],
        correctAnswer: 0
      },
      {
        type: 'true-false',
        question: 'The content includes supporting evidence and examples.',
        options: ['True', 'False'],
        correctAnswer: 0
      },
      {
        type: 'fill-blank',
        question: 'One of the practical applications mentioned involves _____ processes.',
        correctAnswer: 'learning'
      },
      {
        type: 'mcq',
        question: 'What approach does the document take?',
        options: [
          'Step-by-step methodology',
          'Theoretical framework',
          'Case study analysis',
          'Comparative review'
        ],
        correctAnswer: 0
      }
    ];

    const shuffled = allQuestions.sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setIsGenerating(false);
  };

  const handleSubmitAnswer = () => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentIndex].userAnswer = userAnswer;
    setQuestions(updatedQuestions);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer('');
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(q => {
      if (q.type === 'fill-blank') {
        const userAns = String(q.userAnswer || '').toLowerCase().trim();
        const correctAns = String(q.correctAnswer).toLowerCase().trim();
        if (userAns === correctAns) correct++;
      } else {
        if (q.userAnswer === q.correctAnswer) correct++;
      }
    });
    return correct;
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setUserAnswer('');
    setShowResults(false);
    setQuestions(questions.map(q => ({ ...q, userAnswer: undefined })));
  };

  if (isGenerating) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="min-h-[calc(100vh-80px)] px-6 py-12"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 border-2 border-violet-100 dark:border-violet-900"
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                Generating quiz questions...
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="min-h-[calc(100vh-80px)] px-6 py-12"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.button
                onClick={onBack}
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border-2 border-violet-200 dark:border-violet-800 text-gray-700 dark:text-gray-300 font-semibold shadow-lg hover:shadow-xl hover:border-violet-400 dark:hover:border-violet-600 transition-all group"
              >
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                Back
              </motion.button>
              <motion.button
                onClick={onBackToHome}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <Home className="w-5 h-5" />
                <span className="hidden sm:inline">Home</span>
              </motion.button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 border-2 border-violet-100 dark:border-violet-900 space-y-8"
          >
            <div className="text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="inline-block"
              >
                <Award className="w-24 h-24 text-yellow-500 mx-auto" />
              </motion.div>
              <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
                Quiz Complete!
              </h2>
              <div className="text-6xl font-bold bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
                {percentage}%
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                You got {score} out of {questions.length} questions correct
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                Review Your Answers
              </h3>
              {questions.map((q, index) => {
                let isCorrect = false;
                if (q.type === 'fill-blank') {
                  const userAns = String(q.userAnswer || '').toLowerCase().trim();
                  const correctAns = String(q.correctAnswer).toLowerCase().trim();
                  isCorrect = userAns === correctAns;
                } else {
                  isCorrect = q.userAnswer === q.correctAnswer;
                }

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-6 rounded-2xl border-2 shadow-md ${
                      isCorrect
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-400 dark:border-green-700'
                        : 'bg-red-50 dark:bg-red-900/20 border-red-400 dark:border-red-700'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                      )}
                      <div className="flex-1 space-y-2">
                        <p className="font-semibold text-gray-800 dark:text-gray-200">
                          Q{index + 1}: {q.question}
                        </p>
                        <div className="text-sm space-y-1">
                          <p className="text-gray-700 dark:text-gray-300">
                            <span className="font-semibold">Your answer:</span>{' '}
                            {q.type === 'fill-blank'
                              ? q.userAnswer || '(No answer)'
                              : q.options?.[q.userAnswer as number] || '(No answer)'}
                          </p>
                          {!isCorrect && (
                            <p className="text-gray-700 dark:text-gray-300">
                              <span className="font-semibold">Correct answer:</span>{' '}
                              {q.type === 'fill-blank'
                                ? q.correctAnswer
                                : q.options?.[q.correctAnswer as number]}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex gap-4 justify-center pt-4">
              <motion.button
                onClick={restartQuiz}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-semibold shadow-lg hover:shadow-2xl transition-all"
              >
                Try Again
              </motion.button>
              <motion.button
                onClick={onBack}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-xl bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Back to Tools
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const canSubmit = userAnswer !== '' && userAnswer !== undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-[calc(100vh-80px)] px-6 py-12"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.button
              onClick={onBack}
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border-2 border-violet-200 dark:border-violet-800 text-gray-700 dark:text-gray-300 font-semibold shadow-lg hover:shadow-xl hover:border-violet-400 dark:hover:border-violet-600 transition-all group"
            >
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              Back
            </motion.button>
            <motion.button
              onClick={onBackToHome}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline">Home</span>
            </motion.button>
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg"
          >
            <Sparkles className="w-6 h-6" />
            <span className="text-xl font-bold hidden sm:inline">Quiz</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border-2 border-violet-200 dark:border-violet-800 text-lg font-semibold text-gray-700 dark:text-gray-300 shadow-md"
          >
            {currentIndex + 1} / {questions.length}
          </motion.div>
        </div>

        <div className="relative">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 shadow-lg"
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border-2 border-violet-100 dark:border-violet-900 space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-block px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-sm font-bold shadow-lg"
              >
                {currentQuestion.type === 'mcq' && 'Multiple Choice'}
                {currentQuestion.type === 'true-false' && 'True or False'}
                {currentQuestion.type === 'fill-blank' && 'Fill in the Blank'}
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                {currentQuestion.question}
              </h3>
            </div>

            <div className="space-y-4">
              {currentQuestion.type === 'fill-blank' ? (
                <input
                  type="text"
                  value={userAnswer as string}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  className="w-full px-6 py-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-lg focus:outline-none focus:border-violet-500 dark:focus:border-violet-400 focus:ring-4 focus:ring-violet-200 dark:focus:ring-violet-900 transition-all"
                />
              ) : (
                currentQuestion.options?.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setUserAnswer(index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-6 rounded-2xl border-2 text-left transition-all ${
                      userAnswer === index
                        ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 border-violet-500 text-white shadow-xl ring-4 ring-violet-300 dark:ring-violet-700'
                        : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:border-violet-400 dark:hover:border-violet-500 hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          userAnswer === index
                            ? 'border-white bg-white'
                            : 'border-gray-400 dark:border-gray-500'
                        }`}
                      >
                        {userAnswer === index && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-3 h-3 rounded-full bg-violet-500"
                          />
                        )}
                      </div>
                      <span className="text-lg font-medium">{option}</span>
                    </div>
                  </motion.button>
                ))
              )}
            </div>

            <div className="flex justify-end pt-4">
              <motion.button
                onClick={handleSubmitAnswer}
                disabled={!canSubmit}
                whileHover={{ scale: canSubmit ? 1.05 : 1 }}
                whileTap={{ scale: canSubmit ? 0.95 : 1 }}
                className={`px-8 py-4 rounded-xl font-bold shadow-lg transition-all ${
                  canSubmit
                    ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white hover:shadow-2xl'
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                {currentIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
