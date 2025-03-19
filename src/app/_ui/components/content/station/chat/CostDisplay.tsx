import React from 'react';

interface ConversationCost {
  inputTokens: number;
  outputTokens: number;
  inputCost: number;
  outputCost: number;
  totalCost: number;
}

interface CostDisplayProps {
  showCost: boolean;
  conversationCost: ConversationCost;
}

export function CostDisplay({ showCost, conversationCost }: CostDisplayProps) {
  if (!showCost) return null;
  
  return (
    <div className="bg-gray-50 p-2 text-xs text-gray-500 border-b flex justify-between">
      <div>
        Input: ~{conversationCost.inputTokens} tokens (${conversationCost.inputCost.toFixed(6)})
      </div>
      <div>
        Output: ~{conversationCost.outputTokens} tokens (${conversationCost.outputCost.toFixed(6)})
      </div>
      <div className="font-semibold">
        Total: ${conversationCost.totalCost.toFixed(6)}
      </div>
    </div>
  );
}