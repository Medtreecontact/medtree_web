import { notFound } from "next/navigation";
import StationModeSelector from "@/app/_ui/components/content/station/StationModeSelector";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from '@/core/constants';
import { getStationByIdController } from "@/interface_adapters/controllers/content/station/get_station_by_id_controller";
import { 
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator 
} from "@/app/_ui/shadcn/components/ui/breadcrumb";
import { Badge } from "@/app/_ui/shadcn/components/ui/badge";
import { Calendar, ClipboardList, User, Users } from "lucide-react";
import Link from "next/link";

export default async function StationDetailsPage(props: {params: Promise<{ stationId: string }>}) {
    const params = await props.params;
    const station = await getStationByIdController(params.stationId);
    
    if (!station) {
        notFound();
    }
    
    let paidUser = false;
    const session = (await cookies()).get(SESSION_COOKIE_NAME);
    if (session) {
        const user = JSON.parse(session.value);
        paidUser = user.purchased;
    }

    const getScoreColor = (score: number | undefined) => {
        if (score === undefined) return "text-gray-400";
        if (score >= 80) return "text-green-600";
        if (score >= 60) return "text-yellow-600";
        return "text-red-600";
    };

    const formatDate = (date: Date | undefined) => {
        return date ? date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        }) : "Never";
    };

    return (
        <div className="mx-auto max-w-7xl">
            <div className="container py-4 px-4">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <Link href="/station" className="text-primary hover:text-primary/80">Stations</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{station.title}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            {/* Centered Content with reduced width */}
            <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl border border-primary/20 shadow-sm mb-4 overflow-hidden max-w-3xl w-full">
                    {/* Header with background */}
                    <div className="bg-primary/5 p-4 md:p-6">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
                            {/* Left section: SDD number, title, tags */}
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                                <div className="h-12 w-24 flex items-center justify-center bg-primary/15 rounded-lg">
                                    <p className="font-semibold text-primary">SDD {station.sddNumber}</p>
                                </div>
                                <div>
                                    <h1 className="text-2xl font-semibold mb-2 md:mb-0">{station.title}</h1>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {station.tags.map((tag, index) => (
                                            <Badge key={index} variant="secondary" className="bg-primary/5 text-primary">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right section: Statistics */}
                            <div className="w-full md:w-auto bg-white/50 rounded-lg p-3 border border-primary/10 mt-4 md:mt-0">
                                <div className="flex items-center gap-2 text-lg font-medium mb-2">
                                    <ClipboardList className="h-5 w-5 text-primary" />
                                    <span>Vos statistiques</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <User className="h-4 w-4 text-primary" />
                                            <span className="text-sm">Solo</span>
                                        </div>
                                        <div className="flex items-center mt-1">
                                            <Calendar className="h-3 w-3 text-gray-500 mr-1" />
                                            <span className="text-xs text-gray-500 mr-2">
                                                {formatDate(station.lastResult?.soloDate)}
                                            </span>
                                            <span className={`font-medium ${getScoreColor(station.lastResult?.soloScore)}`}>
                                                {station.lastResult?.soloScore !== undefined ? 
                                                    `${station.lastResult.soloScore}%` : "N/A"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Users className="h-4 w-4 text-primary" />
                                            <span className="text-sm">Duo</span>
                                        </div>
                                        <div className="flex items-center mt-1">
                                            <Calendar className="h-3 w-3 text-gray-500 mr-1" />
                                            <span className="text-xs text-gray-500 mr-2">
                                                {formatDate(station.lastResult?.multiDate)}
                                            </span>
                                            <span className={`font-medium ${getScoreColor(station.lastResult?.multiScore)}`}>
                                                {station.lastResult?.multiScore !== undefined ? 
                                                    `${station.lastResult.multiScore}%` : "N/A"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Mode selector is also centered but maintains its internal layout */}
                <div className="max-w-4xl w-full">
                    <StationModeSelector stationId={station.id} paidUser={paidUser} />
                </div>
            </div>
        </div>
    );
}