import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Brain, HelpCircle, Sparkles, Home } from 'lucide-react';
import { SummarizerTool } from './SummarizerTool';
import { FlashcardsTool } from './FlashcardsTool';
import { QuizTool } from './QuizTool';

interface LearningToolsProps {
  text: string;
  onBackToHome: () => void;
}

type ToolType = 'summarize' | 'flashcards' | 'quizzes' | null;

export function LearningTools({ text, onBackToHome }: LearningToolsProps) {
  const [activeTool, setActiveTool] = useState<ToolType>(null);

  const handleToolClick = (tool: ToolType) => {
    setActiveTool(tool);
  };

  const handleBack = () => {
    setActiveTool(null);
  };

  if (activeTool === 'summarize') {
    return <SummarizerTool text={text} onBack={handleBack} onBackToHome={onBackToHome} />;
  }

  if (activeTool === 'flashcards') {
    return <FlashcardsTool text={text} onBack={handleBack} onBackToHome={onBackToHome} />;
  }

  if (activeTool === 'quizzes') {
    return <QuizTool text={text} onBack={handleBack} onBackToHome={onBackToHome} />;
  }

  const tools = [
    {
      id: 'summarize' as ToolType,
      name: 'Summarize',
      icon: FileText,
      color: 'from-blue-500 via-blue-600 to-cyan-500',
      borderColor: 'border-blue-500/20',
      glowColor: 'group-hover:shadow-blue-500/50',
      description: 'Get a concise summary',
      accentColor: 'text-blue-500'
    },
    {
      id: 'flashcards' as ToolType,
      name: 'Flashcards',
      icon: Brain,
      color: 'from-green-500 via-emerald-600 to-teal-500',
      borderColor: 'border-green-500/20',
      glowColor: 'group-hover:shadow-green-500/50',
      description: 'Study with flashcards',
      accentColor: 'text-green-500'
    },
    {
      id: 'quizzes' as ToolType,
      name: 'Quizzes',
      icon: HelpCircle,
      color: 'from-violet-500 via-purple-600 to-fuchsia-500',
      borderColor: 'border-violet-500/20',
      glowColor: 'group-hover:shadow-violet-500/50',
      description: 'Test your knowledge',
      accentColor: 'text-violet-500'
    }
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-[calc(100vh-80px)] px-6 py-12"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
            >
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">AI-Powered Learning</span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-teal-600 to-cyan-600 dark:from-blue-400 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Choose Your Learning Tool
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Transform your content with powerful AI tools designed to enhance your learning experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tools.map((tool, index) => {
              const Icon = tool.icon;

              return (
                <motion.button
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 + 0.3, type: 'spring', stiffness: 100 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleToolClick(tool.id)}
                  className={`group relative p-10 rounded-3xl bg-white dark:bg-gray-800 border-2 ${tool.borderColor} dark:border-gray-700 hover:border-transparent dark:hover:border-transparent shadow-xl hover:shadow-2xl ${tool.glowColor} transition-all duration-300 overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300" style={{ backgroundImage: `linear-gradient(to bottom right, currentColor, transparent)` }} />

                  <div className="relative space-y-6">
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="mx-auto w-24 h-24 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all"
                    >
                      <Icon className="w-12 h-12 text-white" />
                    </motion.div>

                    <div className="space-y-2">
                      <motion.div
                        className="h-1 w-16 mx-auto rounded-full bg-gradient-to-r ${tool.color} opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={{ width: 0 }}
                        whileHover={{ width: 64 }}
                      />
                      <h3 className={`text-2xl font-bold text-gray-800 dark:text-gray-200 group-hover:${tool.accentColor} transition-colors`}>
                        {tool.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {tool.description}
                      </p>
                    </div>

                    <motion.div
                      className="pt-4 text-sm font-semibold text-transparent bg-gradient-to-r ${tool.color} bg-clip-text opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ y: 10 }}
                      whileHover={{ y: 0 }}
                    >
                      Click to start →
                    </motion.div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center pt-8"
          >
            <motion.button
              onClick={onBackToHome}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
