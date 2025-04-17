import { Card, CardContent, CardHeader, CardTitle } from '@/app/_ui/shadcn/components/ui/card';
import { Progress } from '@/app/_ui/shadcn/components/ui/progress';
import { Award, BarChart, CheckCircle2, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export function ScoreCard({ 
  score, 
  addressedCount, 
  totalKeyPoints, 
  date 
}: { 
  score: number; 
  addressedCount: number; 
  totalKeyPoints: number; 
  date: Date; 
}) {
  const getGradeInfo = (score: number) => {
    if (score >= 90) return { letter: 'A', color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200', description: 'Excellent' };
    if (score >= 80) return { letter: 'B', color: 'text-emerald-600', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200', description: 'Très bien' };
    if (score >= 70) return { letter: 'C', color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200', description: 'Bien' };
    if (score >= 60) return { letter: 'D', color: 'text-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-200', description: 'Satisfaisant' };
    return { letter: 'F', color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200', description: 'Insuffisant' };
  };
  
  const grade = getGradeInfo(score);
  
  const getProgressColor = (percent: number) => {
    if (percent >= 90) return 'bg-gradient-to-r from-green-400 to-green-600';
    if (percent >= 80) return 'bg-gradient-to-r from-emerald-400 to-emerald-600';
    if (percent >= 70) return 'bg-gradient-to-r from-blue-400 to-blue-600';
    if (percent >= 60) return 'bg-gradient-to-r from-amber-400 to-amber-600';
    return 'bg-gradient-to-r from-red-400 to-red-600';
  };

  const completedPercentage = Math.round((addressedCount / totalKeyPoints) * 100);
  
  return (
    <Card className="shadow-md border-t-4" style={{ borderTopColor: `var(--${grade.color.split('-')[1]}-${grade.color.split('-')[2]})` }}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <BarChart className="h-5 w-5 text-primary" />
          Note de la session
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="py-2 space-y-6">
          <motion.div 
            className="flex items-center gap-6 justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className={`relative w-28 h-28 rounded-full flex items-center justify-center ${grade.bgColor} shadow-inner ${grade.borderColor} border-4`}>
              <motion.div 
                className={`text-5xl font-bold ${grade.color}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                {grade.letter}
              </motion.div>
            </div>
            
            <div className="space-y-2">
              <motion.div 
                className="text-3xl font-bold flex items-baseline gap-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {score}<span className="text-lg text-muted-foreground">%</span>
              </motion.div>
              <div className={`text-lg font-medium ${grade.color}`}>
                {grade.description}
              </div>
              <div className="flex items-center gap-1.5 text-sm bg-gray-50 px-3 py-1.5 rounded-md shadow-sm">
                <CheckCircle2 className={`h-4 w-4 ${grade.color}`} />
                <span><strong>{addressedCount}</strong> sur <strong>{totalKeyPoints}</strong> points abordés</span>
              </div>
            </div>
          </motion.div>
          
          <div className="space-y-2 bg-gray-50 p-3 rounded-lg">
            <div className="flex justify-between text-sm font-medium mb-1">
              <span>Réussite globale</span>
              <span className={grade.color}>{score}%</span>
            </div>
            <Progress 
              value={score} 
              className="h-2.5 rounded-full"
              style={{ 
                ["--progress-background" as any]: getProgressColor(score) 
              }}
            />
          </div>
          
          <div className="flex gap-2 justify-center items-center text-center py-2 px-3 bg-primary/5 rounded-md">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="text-sm text-gray-600">
              Session complétée le <strong>{date.toLocaleDateString('fr-FR')}</strong>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}