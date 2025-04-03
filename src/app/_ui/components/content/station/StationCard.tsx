import { Station } from "@/entities/models/station";
import Link from "next/link";
import { Calendar, FileText, Lock, Users, User } from "lucide-react";
import { Badge } from "@/app/_ui/shadcn/components/ui/badge";
import { Card, CardHeader, CardContent, CardFooter } from "@/app/_ui/shadcn/components/ui/card";

export default function StationCard({ 
    station,
    isPaidUser
}: { 
    station: Station,
    isPaidUser: boolean
}) {
    const isLocked = false;
    
    const formatDate = (date: Date | undefined) => {
        return date ? date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric'
        }) : "Never";
    };
    
    const getScoreColor = (score: number | undefined) => {
        if (score === undefined) return "text-gray-400";
        if (score >= 80) return "text-green-600";
        if (score >= 60) return "text-yellow-600";
        return "text-red-600";
    };

    const soloDate = station.lastResult?.soloDate;
    const multiDate = station.lastResult?.multiDate;
    const soloScore = station.lastResult?.soloScore;
    const multiScore = station.lastResult?.multiScore;

    return (
        <Card className="overflow-hidden h-full transition-all hover:shadow-lg relative">
            {isLocked && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 rounded-lg">
                    <Lock className="text-white h-10 w-10" />
                </div>
            )}
            
            <Link href={isLocked ? "#" : `/station/${station.id}`} className="block h-full">
                <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <FileText className="h-4 w-4" />
                        <span>SDD #{station.sddNumber}</span>
                    </div>
                    <h3 className="font-medium text-xl line-clamp-2">{station.title}</h3>
                </CardHeader>
                
                <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-1 mt-1">
                        {station.tags.slice(0, 3).map((tag, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                                {tag}
                            </Badge>
                        ))}
                        {station.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                                +{station.tags.length - 3} more
                            </Badge>
                        )}
                    </div>
                </CardContent>
                
                <CardFooter className="border-t pt-3 mt-auto flex-col">
                    <div className="flex items-center justify-between w-full text-sm mb-2">
                        <div className="flex items-center gap-1.5">
                            <User className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-muted-foreground">Entrainement seul :</span>
                            <span className="text-xs">{formatDate(soloDate)}</span>
                        </div>
                        
                        <div className={`font-medium ${getScoreColor(soloScore)}`}>
                            {soloScore !== undefined ? `${soloScore}%` : "N/A"}
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between w-full text-sm">
                        <div className="flex items-center gap-1.5">
                            <Users className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-muted-foreground">Entrainement en duo :</span>
                            <span className="text-xs">{formatDate(multiDate)}</span>
                        </div>
                        
                        <div className={`font-medium ${getScoreColor(multiScore)}`}>
                            {multiScore !== undefined ? `${multiScore}%` : "N/A"}
                        </div>
                    </div>
                </CardFooter>
            </Link>
        </Card>
    );
}