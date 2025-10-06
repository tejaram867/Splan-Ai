import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Download, Sparkles, Home } from 'lucide-react';

interface FlashCard {
  question: string;
  answer: string;
}

interface FlashcardsToolProps {
  text: string;
  onBack: () => void;
  onBackToHome: () => void;
}

export function FlashcardsTool({ text, onBack, onBackToHome }: FlashcardsToolProps) {
  const [flashcards, setFlashcards] = useState<FlashCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    generateFlashcards();
  }, []);

  const generateFlashcards = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const cards: FlashCard[] = [
      {
        question: 'What is the main topic discussed?',
        answer: 'The main topic covers key concepts from the uploaded document.'
      },
      {
        question: 'What are the key takeaways?',
        answer: 'Important points and insights derived from the content.'
      },
      {
        question: 'How can this knowledge be applied?',
        answer: 'Practical applications and real-world use cases.'
      },
      {
        question: 'What are the supporting details?',
        answer: 'Additional information and context from the document.'
      },
      {
        question: 'What conclusions can be drawn?',
        answer: 'Final thoughts and summary of the main ideas.'
      }
    ];

    setFlashcards(cards);
    setIsGenerating(false);
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(currentIndex + 1), 200);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(currentIndex - 1), 200);
    }
  };

  const handleDownload = () => {
    const content = flashcards.map((card, i) =>
      `Card ${i + 1}:\nQ: ${card.question}\nA: ${card.answer}\n\n`
    ).join('');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flashcards.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

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
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border-2 border-green-200 dark:border-green-800 text-gray-700 dark:text-gray-300 font-semibold shadow-lg hover:shadow-xl hover:border-green-400 dark:hover:border-green-600 transition-all group"
            >
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              Back
            </motion.button>
            <motion.button
              onClick={onBackToHome}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline">Home</span>
            </motion.button>
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg"
          >
            <Sparkles className="w-6 h-6" />
            <span className="text-xl font-bold hidden sm:inline">Flashcards</span>
          </motion.div>

          <div className="w-24 sm:w-32"></div>
        </div>

        {isGenerating ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 border-2 border-green-100 dark:border-green-900"
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                Generating flashcards...
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-8">
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Card {currentIndex + 1} of {flashcards.length}
              </p>
            </div>

            <div className="relative h-[400px] perspective-1000">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ rotateY: 90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: -90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="absolute inset-0 cursor-pointer preserve-3d"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: 'spring' }}
                    className="relative w-full h-full preserve-3d"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="absolute inset-0 backface-hidden">
                      <div className="h-full bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-3xl shadow-2xl p-12 flex flex-col items-center justify-center text-white">
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm font-bold mb-6 px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm"
                        >
                          QUESTION
                        </motion.div>
                        <p className="text-2xl font-bold text-center leading-relaxed">
                          {flashcards[currentIndex].question}
                        </p>
                        <motion.div
                          animate={{ y: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="mt-8 text-sm opacity-80 flex items-center gap-2"
                        >
                          <Sparkles className="w-4 h-4" />
                          Click to reveal answer
                        </motion.div>
                      </div>
                    </div>

                    <div
                      className="absolute inset-0 backface-hidden"
                      style={{ transform: 'rotateY(180deg)' }}
                    >
                      <div className="h-full bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 rounded-3xl shadow-2xl p-12 flex flex-col items-center justify-center text-white">
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm font-bold mb-6 px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm"
                        >
                          ANSWER
                        </motion.div>
                        <p className="text-xl text-center leading-relaxed">
                          {flashcards[currentIndex].answer}
                        </p>
                        <div className="mt-8 text-sm opacity-80">Click to see question</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between">
              <motion.button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                whileHover={{ scale: currentIndex === 0 ? 1 : 1.05 }}
                whileTap={{ scale: currentIndex === 0 ? 1 : 0.95 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold shadow-lg transition-all group ${
                  currentIndex === 0
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : 'bg-white dark:bg-gray-800 border-2 border-green-200 dark:border-green-800 text-gray-700 dark:text-gray-300 hover:shadow-xl hover:border-green-400 dark:hover:border-green-600'
                }`}
              >
                <ChevronLeft className={`w-5 h-5 transition-transform ${currentIndex !== 0 ? 'group-hover:-translate-x-1' : ''}`} />
                Previous
              </motion.button>

              <motion.button
                onClick={handleDownload}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold shadow-lg hover:shadow-2xl transition-all"
              >
                <Download className="w-5 h-5" />
                Download All
              </motion.button>

              <motion.button
                onClick={handleNext}
                disabled={currentIndex === flashcards.length - 1}
                whileHover={{ scale: currentIndex === flashcards.length - 1 ? 1 : 1.05 }}
                whileTap={{ scale: currentIndex === flashcards.length - 1 ? 1 : 0.95 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold shadow-lg transition-all group ${
                  currentIndex === flashcards.length - 1
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : 'bg-white dark:bg-gray-800 border-2 border-green-200 dark:border-green-800 text-gray-700 dark:text-gray-300 hover:shadow-xl hover:border-green-400 dark:hover:border-green-600'
                }`}
              >
                Next
                <ChevronRight className={`w-5 h-5 transition-transform ${currentIndex !== flashcards.length - 1 ? 'group-hover:translate-x-1' : ''}`} />
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
