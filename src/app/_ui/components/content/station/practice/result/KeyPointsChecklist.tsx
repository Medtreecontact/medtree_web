'use client';

import { useState } from "react";
import { Checkbox } from "@/app/_ui/shadcn/components/ui/checkbox";
import { ChevronRight, ChevronDown, CheckCircle, Circle, CheckCheck } from "lucide-react";
import { cn } from "@/app/_ui/shadcn/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface KeyPoint {
  keyPoint: string;
  subKeyPoints?: string[];
}

interface CheckedState {
  keyPoints: Record<number, boolean>;
  subKeyPoints: Record<string, boolean>;
}

interface KeyPointsChecklistProps {
  keyPoints: KeyPoint[];
  checkedState: CheckedState;
  onKeyPointChange: (index: number, checked: boolean) => void;
  onSubKeyPointChange: (keyIndex: number, subIndex: number, checked: boolean) => void;
}

export function KeyPointsChecklist({ 
  keyPoints, 
  checkedState, 
  onKeyPointChange, 
  onSubKeyPointChange 
}: KeyPointsChecklistProps) {
  const [expandedGroups, setExpandedGroups] = useState<Record<number, boolean>>({});

  const toggleGroup = (index: number) => {
    setExpandedGroups(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Calculate if all subpoints are checked for a parent point
  const areAllSubPointsChecked = (index: number, subKeyPoints: string[] | undefined) => {
    if (!subKeyPoints || subKeyPoints.length === 0) return false;
    
    for (let i = 0; i < subKeyPoints.length; i++) {
      if (!checkedState.subKeyPoints[`${index}-${i}`]) {
        return false;
      }
    }
    return true;
  };

  // Calculate percentage of completed items
  const completedCount = 
    Object.values(checkedState.keyPoints).filter(Boolean).length + 
    Object.values(checkedState.subKeyPoints).filter(Boolean).length;
  
  const totalItems = keyPoints.length + 
    keyPoints.reduce((acc, point) => acc + (point.subKeyPoints?.length || 0), 0);
  
  const completionPercentage = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

  return (
    <div className="space-y-5">
      <div className="bg-muted/20 p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full p-2 bg-primary/10 text-primary">
            <CheckCheck className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium">Progression de la vérification</h3>
            <p className="text-sm text-muted-foreground">{completedCount} sur {totalItems} éléments vérifiés</p>
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full transition-all duration-500 ease-out",
                completionPercentage >= 80 ? "bg-green-500" :
                completionPercentage >= 60 ? "bg-blue-500" :
                completionPercentage >= 40 ? "bg-amber-500" :
                "bg-red-500"
              )}
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>0%</span>
            <span>{completionPercentage}%</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      <div className="divide-y divide-border/60">
        {keyPoints.map((point, index) => {
          const hasSubKeyPoints = point.subKeyPoints && point.subKeyPoints.length > 0;
          const isExpanded = expandedGroups[index] || false;
          const allSubPointsChecked = hasSubKeyPoints && areAllSubPointsChecked(index, point.subKeyPoints);
          
          return (
            <div key={index} className={cn(
              "py-4 transition-colors",
              (checkedState.keyPoints[index] || allSubPointsChecked) ? "bg-primary/5" : ""
            )}>
              <div className="flex items-start gap-3">
                <div className="flex h-5 items-center pt-0.5">
                  {hasSubKeyPoints ? (
                    <button
                      type="button"
                      onClick={() => toggleGroup(index)}
                      className={cn(
                        "h-5 w-5 flex items-center justify-center rounded-sm transition-colors",
                        isExpanded ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
                      )}
                    >
                      {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>
                  ) : (
                    <Checkbox
                      checked={checkedState.keyPoints[index] || false}
                      onCheckedChange={(checked) => onKeyPointChange(index, checked === true)}
                      id={`keypoint-${index}`}
                      className={cn(
                        "h-5 w-5",
                        checkedState.keyPoints[index] ? "border-primary data-[state=checked]:bg-primary" : ""
                      )}
                    />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor={hasSubKeyPoints ? undefined : `keypoint-${index}`}
                      className={cn(
                        "font-medium text-sm cursor-pointer",
                        (checkedState.keyPoints[index] || allSubPointsChecked) ? "text-primary" : ""
                      )}
                      onClick={hasSubKeyPoints ? () => toggleGroup(index) : undefined}
                    >
                      {point.keyPoint}
                    </label>
                    
                    {allSubPointsChecked && (
                      <span className="text-green-500 flex items-center text-xs gap-1 bg-green-50 px-2 py-0.5 rounded">
                        <CheckCircle className="h-3 w-3" /> Complet
                      </span>
                    )}
                  </div>
                  
                  <AnimatePresence>
                    {hasSubKeyPoints && isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 pl-4 border-l-2 border-muted/70 space-y-2 pt-1">
                          {point.subKeyPoints?.map((subPoint, subIndex) => {
                            const isChecked = checkedState.subKeyPoints[`${index}-${subIndex}`] || false;
                            return (
                              <div key={subIndex} className="flex items-start gap-3 group">
                                <div className="flex h-5 items-center pt-0.5">
                                  <Checkbox
                                    checked={isChecked}
                                    onCheckedChange={(checked) => 
                                      onSubKeyPointChange(index, subIndex, checked === true)
                                    }
                                    id={`subkeypoint-${index}-${subIndex}`}
                                    className={cn(
                                      "h-4 w-4 transition-all",
                                      isChecked ? "border-primary data-[state=checked]:bg-primary" : ""
                                    )}
                                  />
                                </div>
                                <div className="flex-1">
                                  <label
                                    htmlFor={`subkeypoint-${index}-${subIndex}`}
                                    className={cn(
                                      "text-sm leading-tight cursor-pointer transition-colors",
                                      isChecked ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                                    )}
                                  >
                                    {subPoint}
                                  </label>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}