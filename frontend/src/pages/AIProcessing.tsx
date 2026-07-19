import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Loader,
  Lightbulb,
  Zap,
  Cpu,
  Database,
  Brain,
} from 'lucide-react';

interface ProcessStep {
  id: number;
  label: string;
  duration: number;
}

const processingSteps: ProcessStep[] = [
  { id: 1, label: 'Upload Complete', duration: 1000 },
  { id: 2, label: 'Reading Report', duration: 1500 },
  { id: 3, label: 'Extracting KPIs', duration: 1800 },
  { id: 4, label: 'Detecting Trends', duration: 1500 },
  { id: 5, label: 'Generating AI Insights', duration: 2000 },
  { id: 6, label: 'Building Dashboard', duration: 1500 },
  { id: 7, label: 'Finalizing Report', duration: 1200 },
];

interface StepStatus {
  id: number;
  status: 'pending' | 'in-progress' | 'completed';
}

export default function AIProcessing() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [stepStatuses, setStepStatuses] = useState<StepStatus[]>(
    processingSteps.map((step) => ({
      id: step.id,
      status: 'pending' as const,
    }))
  );
  const [timeRemaining, setTimeRemaining] = useState(10);
  const [isComplete, setIsComplete] = useState(false);

  // Update step statuses
  useEffect(() => {
    if (currentStep > processingSteps.length - 1) {
      setIsComplete(true);
      return;
    }

    const timer = setTimeout(() => {
      setStepStatuses((prev) =>
        prev.map((status) => {
          if (status.id <= currentStep + 1) {
            return {
              ...status,
              status: status.id === currentStep + 1 ? 'in-progress' : 'completed',
            };
          }
          return status;
        })
      );
      setCurrentStep((prev) => prev + 1);
    }, processingSteps[currentStep].duration);

    return () => clearTimeout(timer);
  }, [currentStep]);

  // Handle completion and redirect
  useEffect(() => {
    if (isComplete) {
      const redirectTimer = setTimeout(() => {
        navigate('/analytics-dashboard');
      }, 2000);

      return () => clearTimeout(redirectTimer);
    }
  }, [isComplete, navigate]);

  // Update time remaining
  useEffect(() => {
    if (isComplete) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isComplete]);

  // Calculate progress percentage
  const progressPercentage = ((currentStep + 1) / processingSteps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex flex-col items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-cyan-600/20 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-2xl">
        {/* Processing Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 sm:p-12 mb-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl blur-lg opacity-50" />
                <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl">
                  <Brain className="w-10 h-10 text-white animate-pulse" />
                </div>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Analyzing Your Content
            </h1>
            <p className="text-lg text-blue-100">
              Our AI agents are extracting insights from your report.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="relative h-2 bg-white/10 rounded-full overflow-hidden border border-white/20">
              <div
                className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="text-center mt-3 text-sm font-semibold text-blue-100">
              {Math.round(progressPercentage)}% Complete
            </div>
          </div>

          {/* Processing Steps */}
          <div className="space-y-3 mb-10">
            {processingSteps.map((step) => {
              const status = stepStatuses.find((s) => s.id === step.id)?.status || 'pending';
              const isCurrentStep = status === 'in-progress';
              const isCompleted = status === 'completed';

              return (
                <div
                  key={step.id}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                    isCompleted
                      ? 'bg-green-500/20 border border-green-500/30'
                      : isCurrentStep
                        ? 'bg-blue-500/20 border border-blue-500/30'
                        : 'bg-white/5 border border-white/10'
                  }`}
                >
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    {isCompleted ? (
                      <div className="w-8 h-8 flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-green-400 animate-bounce" />
                      </div>
                    ) : isCurrentStep ? (
                      <div className="w-8 h-8 flex items-center justify-center">
                        <div className="relative w-8 h-8">
                          <Loader className="w-8 h-8 text-blue-400 animate-spin" />
                          <div className="absolute inset-0 bg-blue-400/20 rounded-full animate-pulse" />
                        </div>
                      </div>
                    ) : (
                      <div className="w-8 h-8 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-gray-500" />
                      </div>
                    )}
                  </div>

                  {/* Label and Status */}
                  <div className="flex-1">
                    <p
                      className={`text-sm font-semibold transition-colors duration-300 ${
                        isCompleted
                          ? 'text-green-300'
                          : isCurrentStep
                            ? 'text-blue-300'
                            : 'text-gray-400'
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <div className="flex-shrink-0">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full transition-colors duration-300 ${
                        isCompleted
                          ? 'bg-green-500/30 text-green-300'
                          : isCurrentStep
                            ? 'bg-blue-500/30 text-blue-300'
                            : 'bg-white/5 text-gray-400'
                      }`}
                    >
                      {isCompleted ? 'Done' : isCurrentStep ? 'Running' : 'Pending'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Time Remaining */}
          <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
            <p className="text-sm text-gray-300 mb-1">Estimated Time Remaining</p>
            <p className="text-2xl font-bold text-cyan-300">
              {timeRemaining}
              {' '}
              <span className="text-lg">seconds</span>
            </p>
          </div>

          {/* Completion Message */}
          {isComplete && (
            <div className="mt-8 p-6 bg-green-500/20 border border-green-500/30 rounded-xl text-center animate-in fade-in duration-500">
              <CheckCircle2 className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <p className="text-green-300 font-semibold">
                Analysis Complete! Redirecting to your dashboard...
              </p>
            </div>
          )}
        </div>

        {/* AI Processing Illustration */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 sm:p-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
            {[
              { icon: Cpu, label: 'Processing', delay: 0 },
              { icon: Database, label: 'Analyzing', delay: 100 },
              { icon: Lightbulb, label: 'Learning', delay: 200 },
              { icon: Zap, label: 'Optimizing', delay: 300 },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center gap-3"
                  style={{
                    animation: `float 3s ease-in-out ${item.delay}ms infinite`,
                  }}
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-600/40 to-cyan-600/40 border border-white/20 flex items-center justify-center hover:from-blue-600/60 hover:to-cyan-600/60 transition-all duration-300">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-300" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 font-medium">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating animation CSS */}
      <style>
        {`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
      `}
      </style>
    </div>
  );
}
