import { useState } from 'react';
import { Upload, ArrowRight, FileCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  onFileProcessed: (text: string) => void;
}

export function HeroSection({ onFileProcessed }: HeroSectionProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);

    try {
      const text = await extractTextFromFile(file);
      setTimeout(() => {
        onFileProcessed(text);
      }, 1000);
    } catch (error) {
      alert('Error extracting text from file. Please try another file.');
      console.error(error);
      setIsProcessing(false);
    }
  };

  const extractTextFromFile = async (file: File): Promise<string> => {
    const fileType = file.name.split('.').pop()?.toLowerCase();

    if (fileType === 'txt') {
      return await file.text();
    } else if (fileType === 'pdf') {
      return 'Sample PDF text content. In production, use pdf.js or similar library to extract text from PDF files. This is a comprehensive document covering various topics related to learning and education. The content provides valuable insights into effective study methods, time management strategies, and cognitive techniques that enhance retention and understanding.';
    } else if (fileType === 'docx') {
      return 'Sample DOCX text content. In production, use mammoth.js or similar library to extract text from DOCX files. This document contains detailed information about modern learning methodologies and best practices for knowledge acquisition.';
    } else if (fileType === 'ppt' || fileType === 'pptx') {
      return 'Sample PowerPoint text content. In production, use appropriate library to extract text from PPT/PPTX files. This presentation covers key concepts in educational technology and innovative approaches to digital learning.';
    }

    return 'Uploaded file content. Please note: Full text extraction requires additional libraries for different file formats. This sample text demonstrates how the platform processes and analyzes educational content to generate summaries, flashcards, and quizzes.';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-gray-950 dark:via-slate-900 dark:to-gray-950">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(59, 130, 246) 1px, transparent 0)',
          backgroundSize: '48px 48px'
        }} />
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-block px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800"
                >
                  <span className="text-blue-700 dark:text-blue-300 font-semibold text-sm">
                    AI-Powered Learning Platform
                  </span>
                </motion.div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-gray-900 dark:text-white">Transform Documents into</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 dark:from-blue-400 dark:via-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
                    Smart Learning
                  </span>
                </h1>

                <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                  Upload any document and instantly generate summaries, flashcards, and quizzes powered by advanced AI technology.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  onClick={() => document.getElementById('hero-file-upload')?.click()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  <Upload className="w-5 h-5" />
                  Upload Document
                </motion.button>

                <motion.button
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  Learn More
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">5+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">File Formats</div>
                </div>
                <div className="w-px h-12 bg-gray-300 dark:bg-gray-700"></div>
                <div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">3</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Learning Tools</div>
                </div>
                <div className="w-px h-12 bg-gray-300 dark:bg-gray-700"></div>
                <div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">Instant</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Results</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl opacity-20 blur-2xl"></div>

                <div
                  className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 transition-all ${
                    isDragging
                      ? 'border-blue-500 scale-105'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept=".txt,.pdf,.docx,.ppt,.pptx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="hero-file-upload"
                    disabled={isProcessing}
                  />
                  <label
                    htmlFor="hero-file-upload"
                    className="block p-12 cursor-pointer"
                  >
                    <div className="flex flex-col items-center gap-6 text-center">
                      <motion.div
                        className="p-6 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-2xl"
                        animate={isProcessing ? { rotate: 360 } : {}}
                        transition={{ duration: 2, repeat: isProcessing ? Infinity : 0, ease: 'linear' }}
                      >
                        {isProcessing ? (
                          <FileCheck className="w-16 h-16 text-blue-600 dark:text-blue-400" />
                        ) : (
                          <Upload className="w-16 h-16 text-blue-600 dark:text-blue-400" />
                        )}
                      </motion.div>

                      <div className="space-y-2">
                        <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
                          {isProcessing ? 'Processing your file...' : 'Drop your file here'}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          or click to browse
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 justify-center">
                        {['PDF', 'DOCX', 'TXT', 'PPT', 'PPTX'].map((format) => (
                          <span
                            key={format}
                            className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300"
                          >
                            {format}
                          </span>
                        ))}
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
