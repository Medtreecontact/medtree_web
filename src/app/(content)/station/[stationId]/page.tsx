import { notFound } from "next/navigation";
import StationModeSelector from "@/app/_ui/components/content/station/StationModeSelector";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from '@/core/constants';
import { getStationByIdController } from "@/interface_adapters/controllers/content/station/get_station_by_id_controller";
import { Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator } from "@/app/_ui/shadcn/components/ui/breadcrumb";
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

    return (
        <div className="container mx-auto p-4">
             <Breadcrumb>
                <BreadcrumbList>
                <BreadcrumbItem>
                    <Link href="/station">Stations</Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>{station.title}</BreadcrumbPage>
                </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-2xl font-bold mb-6">{station.title}</h1>
            <div className="mb-4">
                <span className="text-sm text-gray-500">SDD numéro: {station.sddNumber}</span>
                <div className="mt-2 flex flex-wrap gap-1">
                    {station.tags.map((tag, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            
            <StationModeSelector stationId={station.id} paidUser={paidUser} />
        </div>
    );
}