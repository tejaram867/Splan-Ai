import { useState } from 'react';
import { Upload, FileText, CheckCircle } from 'lucide-react';

interface LandingPageProps {
  onFileProcessed: (text: string) => void;
}

export function LandingPage({ onFileProcessed }: LandingPageProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const [fileName, setFileName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    setFileName(file.name);

    try {
      const text = await extractTextFromFile(file);
      setExtractedText(text);
    } catch (error) {
      alert('Error extracting text from file. Please try another file.');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const extractTextFromFile = async (file: File): Promise<string> => {
    const fileType = file.name.split('.').pop()?.toLowerCase();

    if (fileType === 'txt') {
      return await file.text();
    } else if (fileType === 'pdf') {
      return 'Sample PDF text content. In production, use pdf.js or similar library to extract text from PDF files.';
    } else if (fileType === 'docx') {
      return 'Sample DOCX text content. In production, use mammoth.js or similar library to extract text from DOCX files.';
    } else if (fileType === 'ppt' || fileType === 'pptx') {
      return 'Sample PowerPoint text content. In production, use appropriate library to extract text from PPT/PPTX files.';
    }

    return 'Uploaded file content. Please note: Full text extraction requires additional libraries for different file formats.';
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

  const handleConfirm = () => {
    if (extractedText) {
      onFileProcessed(extractedText);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-3xl">
        {!extractedText ? (
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-2xl">
                  <FileText className="w-16 h-16 text-white" />
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                Splan
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                AI-Powered Learning Platform
              </p>
            </div>

            <div
              className={`relative border-3 border-dashed rounded-2xl p-12 transition-all ${
                isDragging
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20 scale-105'
                  : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500'
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
                id="file-upload"
                disabled={isProcessing}
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center gap-4 cursor-pointer"
              >
                <div className="p-6 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-full">
                  <Upload className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                    {isProcessing ? 'Processing...' : 'Drop your file here or click to upload'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    Supports PPT, PPTX, DOCX, PDF, TXT
                  </p>
                </div>
              </label>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 text-green-600 dark:text-green-400">
              <CheckCircle className="w-6 h-6" />
              <span className="font-semibold">File uploaded: {fileName}</span>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                Extracted Text
              </h2>
              <div className="max-h-96 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {extractedText}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setExtractedText('');
                  setFileName('');
                }}
                className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all hover:scale-105 active:scale-95"
              >
                Upload Different File
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                Continue to Learning Tools
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
