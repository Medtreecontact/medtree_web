import { CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function KeyPointsEvaluation({ 
  keyPoints, 
  isKeyPointAddressed 
}: { 
  keyPoints: Array<{ keyPoint: string; subKeyPoints?: string[]; }>; 
  isKeyPointAddressed: (keyPoint: string) => boolean;
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {keyPoints.map((point, index) => (
          <KeyPointItem
            key={index}
            point={point}
            isKeyPointAddressed={isKeyPointAddressed}
          />
        ))}
      </div>
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
  
  // Count addressed sub-points when there are any
  const addressedSubPoints = hasSubKeyPoints ? 
    point.subKeyPoints!.filter(subPoint => isKeyPointAddressed(subPoint)).length : 0;
    
  const totalSubPoints = hasSubKeyPoints ? point.subKeyPoints!.length : 0;
  
  return (
    <motion.div 
      className="rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`p-4 ${isEffectivelyAddressed ? 'bg-green-50' : isPartiallyComplete ? 'bg-amber-50' : 'bg-red-50'}`}>
        <div className="flex items-start gap-3">
          <div className="pt-0.5 flex-shrink-0">
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
              <span className="font-medium">{point.keyPoint}</span>
              
              {isDirectlyAddressed && (
                <span className="text-xs px-2.5 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                  Abordé
                </span>
              )}
              
              {!isDirectlyAddressed && isPartiallyComplete && (
                <div className="flex items-center gap-1.5">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 font-medium">
                    Incomplet
                  </span>
                  <span className="text-xs text-amber-600">
                    {addressedSubPoints}/{totalSubPoints}
                  </span>
                </div>
              )}
              
              {!isDirectlyAddressed && !isPartiallyComplete && !isEffectivelyAddressed && (
                <span className="text-xs px-2.5 py-1 rounded-full bg-red-100 text-red-700 font-medium">
                  Manquant
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Always show sub key points without collapsible */}
      {hasSubKeyPoints && (
        <div className="px-4 py-3 bg-white border-t">
          <div className="pl-8 space-y-3">
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
    </motion.div>
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
    <motion.div 
      className="flex items-start gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex-shrink-0">
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
    </motion.div>
  );
}

