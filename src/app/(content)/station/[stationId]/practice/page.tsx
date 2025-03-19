import { PracticeClient } from '@/app/_ui/components/content/station/practice/SelectRole';

import Link from "next/link";
import { Breadcrumb, 
         BreadcrumbItem, 
         BreadcrumbList, 
         BreadcrumbPage, 
         BreadcrumbSeparator } from "@/app/_ui/shadcn/components/ui/breadcrumb";
import { getStationByIdController } from '@/interface_adapters/controllers/content/station/get_station_by_id_controller';
import { notFound } from 'next/navigation';


export default async function PracticePage(props: {params: Promise<{ stationId: string }>}) {
  const params = await props.params;
  const station = await getStationByIdController(params.stationId);
      
  if (!station) {
    notFound();
  }
    
  return(
    <>
      <div className="container py-4 px-4">
        <Breadcrumb>
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
              <BreadcrumbPage>Practice Mode</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <PracticeClient />;
    </>
  );
}
