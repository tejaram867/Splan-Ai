import { FileText, Brain, HelpCircle, Check } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: FileText,
      title: 'Smart Summarizer',
      description: 'AI-powered summaries that capture the essence of your documents',
      benefits: ['Key points extraction', 'Adjustable length', 'Instant download'],
      color: 'from-blue-600 to-cyan-600',
      bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30'
    },
    {
      icon: Brain,
      title: 'Interactive Flashcards',
      description: 'Generate study cards with flip animations for effective memorization',
      benefits: ['Auto-generated Q&A', 'Flip animation', 'Easy navigation'],
      color: 'from-purple-600 to-pink-600',
      bgColor: 'from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30'
    },
    {
      icon: HelpCircle,
      title: 'Dynamic Quizzes',
      description: 'Test your knowledge with multiple question formats and instant results',
      benefits: ['MCQs & True/False', 'Fill in blanks', 'Score tracking'],
      color: 'from-orange-600 to-red-600',
      bgColor: 'from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30'
    }
  ];

  return (
    <section id="features" className="relative py-24 px-6 bg-white dark:bg-gray-950">
      <div className="container mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Powerful Learning Tools
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Three intelligent tools designed to enhance your study experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <motion.div
                  className="h-full bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className={`p-8 bg-gradient-to-br ${feature.bgColor}`}>
                    <motion.div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>

                  <div className="p-8 space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>

                    <div className="space-y-3 pt-4">
                      {feature.benefits.map((benefit, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.4, delay: index * 0.2 + idx * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {benefit}
                          </span>
                        </motion.div>
                      ))}
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
          className="mt-16 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-2xl p-8 border-2 border-blue-200 dark:border-blue-900">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 max-w-2xl">
              All tools work seamlessly together to provide a complete learning experience
            </p>
            <motion.button
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Started Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
