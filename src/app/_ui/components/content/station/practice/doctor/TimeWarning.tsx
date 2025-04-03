'use client';

import { Timer } from 'lucide-react';

interface TimeWarningProps {
  timeLeft: number;
}

export function TimeWarning({ timeLeft }: TimeWarningProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-lg">
      <div className="flex items-center">
        <Timer className="h-5 w-5 mr-2" />
        <span><strong>Time alert:</strong> {formatTime(timeLeft)} remaining!</span>
      </div>
    </div>
  );
}