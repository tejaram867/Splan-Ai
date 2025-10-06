import { Upload, FileSearch, Wand2, Sparkles, Download } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const steps = [
    {
      number: 1,
      title: 'Upload Your File',
      description: 'Drag and drop or select any text-based document from your device',
      icon: Upload,
      color: 'from-blue-600 to-cyan-600'
    },
    {
      number: 2,
      title: 'Confirm Text',
      description: 'Review the extracted text and make any necessary adjustments',
      icon: FileSearch,
      color: 'from-cyan-600 to-teal-600'
    },
    {
      number: 3,
      title: 'Choose Your Tool',
      description: 'Select from Summarizer, Flashcards, or Quizzes based on your needs',
      icon: Wand2,
      color: 'from-purple-600 to-pink-600'
    },
    {
      number: 4,
      title: 'Get Instant Output',
      description: 'AI generates your personalized learning materials in seconds',
      icon: Sparkles,
      color: 'from-orange-600 to-red-600'
    },
    {
      number: 5,
      title: 'Download & Study',
      description: 'Save your content for offline use and start learning',
      icon: Download,
      color: 'from-green-600 to-emerald-600'
    }
  ];

  return (
    <section id="how-it-works" className="relative py-24 px-6 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Transform your documents into learning materials in 5 simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <motion.div
                  className="relative h-full bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 shadow-lg overflow-hidden"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${step.color}"></div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <motion.div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </motion.div>

                      <div className="w-10 h-10 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center font-bold text-white text-lg shadow-md">
                        {step.number}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {step.title}
                      </h3>

                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="inline-block max-w-3xl">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-1 shadow-2xl">
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-10">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Ready to Transform Your Learning?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Start creating AI-powered learning materials in seconds
                </p>
                <motion.button
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Start Learning Now
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
