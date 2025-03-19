import { getStationByIdController } from "@/interface_adapters/controllers/content/station/get_station_by_id_controller";
import { notFound } from "next/navigation";
import { PatientPracticeClient } from "@/app/_ui/components/content/station/practice/patient/PatientPracticeClient";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/app/_ui/shadcn/components/ui/breadcrumb";
import Link from "next/link";

export default async function PracticePatientPage(props: {params: Promise<{ stationId: string }>}) {
  const params = await props.params;
  const station = await getStationByIdController(params.stationId);
      
  if (!station) {
    notFound();
  }
  
  return (
    <>
      <div className="container mx-auto p-4">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href="/station">Stations</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link href={`/station/${params.stationId}`}>{station.title}</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Patient Practice</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <PatientPracticeClient station={station} stationId={params.stationId} />
    </>
  );
}