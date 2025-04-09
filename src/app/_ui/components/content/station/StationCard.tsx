import { Station } from "@/entities/models/station";
import Link from "next/link";
import { Lock, Users, User } from "lucide-react";
import { Badge } from "@/app/_ui/shadcn/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/app/_ui/shadcn/components/ui/card";

export default function StationCard({ 
    station,
    isPaidUser
}: { 
    station: Station,
    isPaidUser: boolean
}) {
    const isLocked = station.access === "purchased" && !isPaidUser;
    
    const getScoreColor = (score: number | undefined) => {
        if (score === undefined) return "text-gray-400";
        if (score >= 80) return "text-green-600";
        if (score >= 60) return "text-yellow-600";
        return "text-red-600";
    };

    const soloScore = station.lastResult?.soloScore;
    const multiScore = station.lastResult?.multiScore;

    if (isLocked) {
        return (
            <Card className="text-xl flex flex-col items-center justify-center border-primary/20 shadow-sm hover:shadow-md transition-all duration-200 h-full">
                <CardHeader className="w-full bg-primary/5 pb-4 rounded-t-xl">
                    <div className="flex items-center space-x-4">
                        <div className="h-10 w-20 flex items-center justify-center bg-primary/10 rounded-lg">
                            <p className="font-semibold text-primary">SDD {station.sddNumber}</p>
                        </div>
                        <p className="flex-1 text-center font-semibold">{station.title}</p>
                    </div>
                </CardHeader>
                <CardContent className="justify-center items-center border-t w-full py-6">
                    <div className="space-y-6 mt-2 py-2 w-full">
                        <div className="flex items-center justify-center text-gray-600">
                            <Lock className="h-5 w-5 mr-2" />
                            <p>Contenu payant</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="text-xl flex flex-col items-center justify-center border-primary/20 shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-200 h-full">
            <Link href={`/station/${station.id}`} className="block h-full w-full">
                <CardHeader className="w-full bg-primary/5 pb-4 rounded-t-xl">
                    <div className="flex items-center space-x-4">
                        <div className="h-10 w-20 flex items-center justify-center bg-primary/10 rounded-lg">
                            <p className="font-medium text-primary">SDD {station.sddNumber}</p>
                        </div>
                        <p className="flex-1 text-center font-semibold">{station.title}</p>
                    </div>
                </CardHeader>
                
                <CardContent className="justify-center items-center border-t w-full py-4">
                    <ul className="space-y-4 mt-2 w-full">
                        <li className="flex items-center flex-wrap gap-2">
                            {station.tags.slice(0, 3).map((tag, i) => (
                                <Badge key={i} variant="secondary" className="text-xs bg-primary/5 text-primary">
                                    {tag}
                                </Badge>
                            ))}
                            {station.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                    +{station.tags.length - 3} more
                                </Badge>
                            )}
                        </li>
                        <li className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-3">
                                <User className="text-primary h-5 w-5"/>
                                <p>Entrainement seul</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`font-medium ${getScoreColor(soloScore)}`}>
                                    {soloScore !== undefined ? `${soloScore}%` : "N/A"}
                                </span>
                            </div>
                        </li>
                        <li className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-3">
                                <Users className="text-primary h-5 w-5"/>
                                <p>Entrainement en duo</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`font-medium ${getScoreColor(multiScore)}`}>
                                    {multiScore !== undefined ? `${multiScore}%` : "N/A"}
                                </span>
                            </div>
                        </li>
                    </ul>
                </CardContent>
            </Link>
        </Card>
    );
}