import { getStationByIdController } from "@/interface_adapters/controllers/content/station/get_station_by_id_controller";
import { notFound } from "next/navigation";
import { ResultClient } from "@/app/_ui/components/content/station/practice/result/ResultClient";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/app/_ui/shadcn/components/ui/breadcrumb";
import Link from "next/link";

export default async function ResultPage(props: {params: Promise<{ stationId: string }>}) {
  const params = await props.params;
  const station = await getStationByIdController(params.stationId);
      
  if (!station) {
    notFound();
  }
  
  return (
    <>
      <div className="container mx-auto py-4 px-4 bg-gradient-to-b from-background to-muted/20">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href="/station" className="hover:text-primary">Stations</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link href={`/station/${params.stationId}`} className="hover:text-primary">
                {station.title}
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Évaluation</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <ResultClient station={station} stationId={params.stationId} />
    </>
  );
}