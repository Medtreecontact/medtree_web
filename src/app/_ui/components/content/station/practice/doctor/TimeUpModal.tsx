'use client';

import { Button } from "@/app/_ui/shadcn/components/ui/button";

interface TimeUpModalProps {
  setTimeLeft: (time: number) => void;
  handleEndSession: () => void;
}

export function TimeUpModal({ setTimeLeft, handleEndSession }: TimeUpModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Time's Up!</h2>
        <p className="mb-6">Your 8-minute session has ended.</p>
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => setTimeLeft(30)}>
            Add 30 Seconds
          </Button>
          <Button onClick={handleEndSession}>
            Finish Session
          </Button>
        </div>
      </div>
    </div>
  );
}