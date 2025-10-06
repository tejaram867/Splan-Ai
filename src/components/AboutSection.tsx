import { Zap, Target, Shield, Sparkles, Award, TrendingUp } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Generate content in seconds with advanced AI processing',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Target,
      title: 'Precision Learning',
      description: 'Focused content that captures key concepts accurately',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your documents are processed securely and never stored',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Sparkles,
      title: 'AI-Powered',
      description: 'Cutting-edge technology for intelligent content analysis',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const stats = [
    { number: '5+', label: 'File Formats', icon: Award },
    { number: '3', label: 'Learning Tools', icon: Target },
    { number: '100%', label: 'Accuracy', icon: TrendingUp }
  ];

  return (
    <section id="about" className="relative py-24 px-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Why Choose Splan?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            The most advanced AI-powered learning platform designed for students and professionals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <motion.div
                  className="h-full bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-6 shadow-lg"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <motion.div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-1 shadow-2xl">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-10 md:p-12">
              <div className="text-center space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        className="relative"
                      >
                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-2xl p-6 border-2 border-blue-200 dark:border-blue-900">
                          <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                          <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                            {stat.number}
                          </div>
                          <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            {stat.label}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="space-y-4 pt-4">
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                    Transform Your Learning Experience
                  </h3>

                  <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    Join thousands of students and professionals who are learning smarter with AI-powered tools. Upload your first document and experience the future of education.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                  <motion.button
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Get Started Free
                  </motion.button>

                  <motion.button
                    className="px-8 py-4 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold shadow-lg hover:shadow-xl transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Explore Features
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
