import { notFound } from "next/navigation";
import StationStudyTabs from "@/app/_ui/components/content/station/StationOverviewTabs";
import { getStationByIdController } from "@/interface_adapters/controllers/content/station/get_station_by_id_controller";
import { Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator } from "@/app/_ui/shadcn/components/ui/breadcrumb";
import Link from "next/link";

export default async function StationStudyPage(props: {params: Promise<{ stationId: string }>}) {
    const params = await props.params
    const station = await getStationByIdController(params.stationId);
    
    if (!station) {
        notFound();
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
                    <Link href={`/station/${station.id}`}>{station.title}</Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>Study Mode</BreadcrumbPage>
                </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-2xl font-bold mb-6">{station.title} - Study Mode</h1>
            <StationStudyTabs station={station} />
        </div>
    );
}