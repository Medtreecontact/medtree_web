'use client';

import { Checkbox } from "@/app/_ui/shadcn/components/ui/checkbox";
import { FolderOpen } from "lucide-react";

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
  return (
    <div className="space-y-6">
      {keyPoints.map((point, index) => {
        const hasSubKeyPoints = point.subKeyPoints && point.subKeyPoints.length > 0;
        
        return (
          <div key={index} className="rounded-lg bg-gray-50 p-4 border border-gray-100">
            <div className="flex items-start gap-3">
              {!hasSubKeyPoints ? (
                <div className="flex h-5 items-center pt-1">
                  <Checkbox
                    checked={checkedState.keyPoints[index] || false}
                    onCheckedChange={(checked) => onKeyPointChange(index, checked === true)}
                    id={`keypoint-${index}`}
                    className="border-primary"
                  />
                </div>
              ) : (
                <div className="flex h-5 items-center pt-1">
                  <FolderOpen className="h-5 w-5 text-primary/70" />
                </div>
              )}
              
              <div className="flex-1">
                  <label
                              htmlFor={`keypoint-${index}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                              {point.keyPoint}
                            </label>
                
                {hasSubKeyPoints && (
                  <div className="mt-3 pl-4 border-l-2 border-gray-200">
                    <div className="space-y-2">
                      {point.subKeyPoints?.map((subPoint, subIndex) => (
                        <div key={subIndex} className="flex items-start gap-3">
                          <div className="flex h-4 items-center pt-0.5">
                            <Checkbox
                              checked={checkedState.subKeyPoints[`${index}-${subIndex}`] || false}
                              onCheckedChange={(checked) => 
                                onSubKeyPointChange(index, subIndex, checked === true)
                              }
                              id={`subkeypoint-${index}-${subIndex}`}
                              className="h-4 w-4 border-primary/70"
                            />
                          </div>
                          <div className="flex-1">
                            <label
                              htmlFor={`subkeypoint-${index}-${subIndex}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                              {subPoint}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}