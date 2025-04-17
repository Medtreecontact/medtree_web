import { notFound } from "next/navigation";
import StationStudyTabs from "@/app/_ui/components/content/station/StationOverviewTabs";
import { getStationByIdController } from "@/interface_adapters/controllers/content/station/get_station_by_id_controller";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator 
} from "@/app/_ui/shadcn/components/ui/breadcrumb";
import Link from "next/link";
import { BookOpen, ChevronRight } from 'lucide-react';

export default async function StationStudyPage(props: {params: Promise<{ stationId: string }>}) {
  const params = await props.params;
  const station = await getStationByIdController(params.stationId);
  
  if (!station) {
    notFound();
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/5">
      <div className="container mx-auto p-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href="/station" className="hover:text-primary transition-colors">
                Stations
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <Link href={`/station/${station.id}`} className="hover:text-primary transition-colors">
                {station.title}
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <div className="flex items-center gap-1">
                <BookOpen className="h-3.5 w-3.5 text-primary" />
                <BreadcrumbPage>Lecture Libre</BreadcrumbPage>
              </div>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <div className="flex-1 container mx-auto px-4 py-6">
        <StationStudyTabs station={station} />
      </div>
    </div>
  );
}