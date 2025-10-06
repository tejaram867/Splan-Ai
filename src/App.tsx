import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { LearningTools } from './components/LearningTools';

function App() {
  const [extractedText, setExtractedText] = useState<string | null>(null);

  const handleFileProcessed = (text: string) => {
    setExtractedText(text);
  };

  const handleBackToHome = () => {
    setExtractedText(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-50 dark:from-gray-950 dark:via-slate-900 dark:to-gray-900 transition-colors">
      <Navbar onHomeClick={handleBackToHome} showHomeButton={!!extractedText} />

      <AnimatePresence mode="wait">
        {extractedText ? (
          <motion.main
            key="tools"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="pt-20"
          >
            <LearningTools text={extractedText} onBackToHome={handleBackToHome} />
          </motion.main>
        ) : (
          <motion.main
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <HeroSection onFileProcessed={handleFileProcessed} />
            <FeaturesSection />
            <HowItWorksSection />
            <AboutSection />
            <ContactSection />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
