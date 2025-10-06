import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Sparkles, Home } from 'lucide-react';

interface SummarizerToolProps {
  text: string;
  onBack: () => void;
  onBackToHome: () => void;
}

type SummaryLength = 'short' | 'medium' | 'long';

export function SummarizerTool({ text, onBack, onBackToHome }: SummarizerToolProps) {
  const [length, setLength] = useState<SummaryLength>('medium');
  const [summary, setSummary] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSummary = async (selectedLength: SummaryLength) => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const sentences = text.split('.').filter(s => s.trim().length > 0);
    let content = '';

    if (selectedLength === 'short') {
      const short = sentences.slice(0, Math.min(2, sentences.length)).join('. ') + '.';
      content = `Summary:\n\n${short}`;
    } else if (selectedLength === 'medium') {
      const medium = sentences.slice(0, Math.min(4, sentences.length)).join('. ') + '.';
      content = `Summary:\n\n${medium}\n\nKey Points:\n• Main concept covered in the document\n• Important details and insights`;
    } else {
      const long = sentences.slice(0, Math.min(6, sentences.length)).join('. ') + '.';
      content = `Summary:\n\n${long}\n\nKey Points:\n• Main concept covered in the document\n• Important details and insights\n• Supporting evidence and examples\n• Conclusions and takeaways\n\nAdditional Context:\nThis content provides comprehensive coverage of the topic with detailed explanations.`;
    }

    setSummary(content);
    setIsGenerating(false);
  };

  const handleLengthChange = (newLength: SummaryLength) => {
    setLength(newLength);
    generateSummary(newLength);
  };

  const handleDownload = () => {
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'summary.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!summary && !isGenerating) {
    generateSummary(length);
  }

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
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-800 text-gray-700 dark:text-gray-300 font-semibold shadow-lg hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-600 transition-all group"
            >
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              Back
            </motion.button>
            <motion.button
              onClick={onBackToHome}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline">Home</span>
            </motion.button>
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
          >
            <Sparkles className="w-6 h-6" />
            <span className="text-xl font-bold hidden sm:inline">Summarizer</span>
          </motion.div>

          <div className="w-24 sm:w-32"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border-2 border-blue-100 dark:border-blue-900 space-y-6 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Summary Length
            </h3>
            <div className="flex gap-2">
              {(['short', 'medium', 'long'] as SummaryLength[]).map((len) => (
                <button
                  key={len}
                  onClick={() => handleLengthChange(len)}
                  disabled={isGenerating}
                  className={`px-5 py-2.5 rounded-xl font-semibold capitalize transition-all ${
                    length === len
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg scale-105 ring-2 ring-blue-400/50'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-100 hover:to-cyan-100 dark:hover:from-blue-900 dark:hover:to-cyan-900'
                  } ${isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}`}
                >
                  {len}
                </button>
              ))}
            </div>
          </div>

          {isGenerating ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                Generating {length} summary...
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-blue-900/30 dark:via-cyan-900/30 dark:to-teal-900/30 rounded-2xl border-2 border-blue-200 dark:border-blue-700 shadow-inner"
              >
                <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed text-lg">
                  {summary}
                </p>
              </motion.div>

              <div className="flex justify-end">
                <motion.button
                  onClick={handleDownload}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold shadow-lg hover:shadow-2xl transition-all"
                >
                  <Download className="w-5 h-5" />
                  Download
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
