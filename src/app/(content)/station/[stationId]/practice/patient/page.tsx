import { getStationByIdController } from "@/interface_adapters/controllers/content/station/get_station_by_id_controller";
import { notFound } from "next/navigation";
import { PatientPracticeClient } from "@/app/_ui/components/content/station/practice/patient/PatientPracticeClient";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/app/_ui/shadcn/components/ui/breadcrumb";
import Link from "next/link";
import { User, ChevronRight } from 'lucide-react';


export default async function PracticePatientPage(props: {params: Promise<{ stationId: string }>}) {
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
              <Link href="/station" className="hover:text-primary transition-colors">Stations</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <Link href={`/station/${params.stationId}`} className="hover:text-primary transition-colors">{station.title}</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <div className="flex items-center gap-1">
                <User className="h-3.5 w-3.5 text-primary" />
                <BreadcrumbPage>Rôle du Patient</BreadcrumbPage>
              </div>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <div className="flex-1">
        <PatientPracticeClient station={station} stationId={params.stationId} />
      </div>
    </div>
  );
}