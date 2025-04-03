export function TranscriptView({ 
    chatHistory 
  }: { 
    chatHistory: Array<{ role: string; text: string; }> 
  }) {
    return (
      <div className="border rounded-md overflow-hidden">
        <div className="bg-gray-50 p-3 border-b">
          <h3 className="font-medium">Historique de la consultation</h3>
        </div>
        <div className="p-4 max-h-[500px] overflow-y-auto space-y-4">
          {chatHistory.map((message, idx) => (
            <div key={idx} className={`${
              message.role === 'user' ? 'pl-4 border-l-4 border-blue-500' : 'pl-4 border-l-4 border-gray-300'
            }`}>
              <p className="text-xs font-medium mb-1">
                {message.role === 'user' ? 'Vous (Docteur)' : 'Patient'}
              </p>
              <p className="text-sm whitespace-pre-line">{message.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  