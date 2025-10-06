import { Upload, FileSearch, Wand2, Download } from 'lucide-react';

export function HowToUse() {
  const steps = [
    {
      number: 1,
      title: 'Upload Your File',
      description: 'Upload any text-based file including PPT, DOCX, PDF, or TXT formats',
      icon: Upload,
      align: 'left' as const
    },
    {
      number: 2,
      title: 'Review Content',
      description: 'Verify the extracted text from your document before proceeding',
      icon: FileSearch,
      align: 'right' as const
    },
    {
      number: 3,
      title: 'Choose Learning Tool',
      description: 'Select from Summarize, Flashcards, or Quizzes to transform your content',
      icon: Wand2,
      align: 'left' as const
    },
    {
      number: 4,
      title: 'Download Results',
      description: 'Save your generated summaries, flashcards, or quizzes for offline use',
      icon: Download,
      align: 'right' as const
    }
  ];

  return (
    <div className="py-20 px-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-200">
            How to Use Splan
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Transform your documents into powerful learning tools in 4 simple steps
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 via-cyan-500 to-blue-500 hidden md:block"></div>

          <div className="space-y-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLeft = step.align === 'left';

              return (
                <div
                  key={step.number}
                  className={`relative flex items-center ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col gap-8`}
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`
                  }}
                >
                  <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'} text-center`}>
                    <div className="inline-block bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all border border-gray-200 dark:border-gray-700 group hover:scale-105">
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 max-w-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 flex-shrink-0">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                      <div className="relative w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg border-4 border-blue-500 font-bold text-blue-600 dark:text-blue-400">
                        {step.number}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 hidden md:block"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
