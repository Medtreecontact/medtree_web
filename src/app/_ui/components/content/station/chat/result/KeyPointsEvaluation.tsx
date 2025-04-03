import { CheckCircle, XCircle } from 'lucide-react';

export function KeyPointsEvaluation({ 
  keyPoints, 
  isKeyPointAddressed 
}: { 
  keyPoints: Array<{ keyPoint: string; subKeyPoints?: string[]; }>; 
  isKeyPointAddressed: (keyPoint: string) => boolean;
}) {
  return (
    <div className="space-y-4">
      {keyPoints.map((point, index) => (
        <KeyPointItem
          key={index}
          point={point}
          isKeyPointAddressed={isKeyPointAddressed}
        />
      ))}
    </div>
  );
}

function KeyPointItem({
    point,
    isKeyPointAddressed
  }: {
    point: { keyPoint: string; subKeyPoints?: string[]; };
    isKeyPointAddressed: (keyPoint: string) => boolean;
  }) {
    const hasSubKeyPoints = point.subKeyPoints && point.subKeyPoints.length > 0;
    
    const isDirectlyAddressed = isKeyPointAddressed(point.keyPoint);
    
    const allSubPointsAddressed = hasSubKeyPoints && point.subKeyPoints!.length > 0 && 
      point.subKeyPoints!.every(subPoint => isKeyPointAddressed(subPoint));
    
    const someSubPointsAddressed = hasSubKeyPoints && point.subKeyPoints!.some(subPoint => 
      isKeyPointAddressed(subPoint));
      
    const isPartiallyComplete = hasSubKeyPoints && someSubPointsAddressed && !allSubPointsAddressed;
    
    const isEffectivelyAddressed = isDirectlyAddressed || allSubPointsAddressed;
    
    return (
      <div className="rounded-lg bg-gray-50 p-4 border border-gray-100">
        <div className="flex items-start gap-3">
          <div className="pt-0.5">
            {isEffectivelyAddressed ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : isPartiallyComplete ? (
              <XCircle className="h-5 w-5 text-amber-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium">{point.keyPoint}</span>
              
              {isDirectlyAddressed && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                  Abordé
                </span>
              )}
              
              {!isDirectlyAddressed && isPartiallyComplete && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                  Incomplet
                </span>
              )}
              
              {!isDirectlyAddressed && !isPartiallyComplete && !isEffectivelyAddressed && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                  Manquant
                </span>
              )}
            </div>
            
            {hasSubKeyPoints && (
              <div className="mt-3 pl-4 border-l-2 border-gray-200">
                <div className="space-y-2">
                  {point.subKeyPoints?.map((subPoint, subIndex) => (
                    <SubKeyPointItem
                      key={subIndex}
                      subPoint={subPoint}
                      isAddressed={isKeyPointAddressed(subPoint)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  function SubKeyPointItem({
    subPoint,
    isAddressed
  }: {
    subPoint: string;
    isAddressed: boolean;
  }) {
    return (
      <div className="flex items-start gap-3">
        <div>
          {isAddressed ? (
            <CheckCircle className="h-4 w-4 text-green-600" />
          ) : (
            <XCircle className="h-4 w-4 text-red-500" />
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <span className="text-sm">{subPoint}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              isAddressed 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {isAddressed ? 'Abordé' : 'Manquant'}
            </span>
          </div>
        </div>
      </div>
    );
  }
  
