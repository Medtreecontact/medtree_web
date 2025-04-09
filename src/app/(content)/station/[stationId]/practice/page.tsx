import { PracticeClient } from '@/app/_ui/components/content/station/practice/SelectRole';
import Link from "next/link";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/app/_ui/shadcn/components/ui/breadcrumb";
import { getStationByIdController } from '@/interface_adapters/controllers/content/station/get_station_by_id_controller';
import { notFound } from 'next/navigation';
import { ChevronRight, Users } from 'lucide-react';
import { Separator } from '@/app/_ui/shadcn/components/ui/separator';

export default async function PracticePage(props: {params: Promise<{ stationId: string }>}) {
  const params = await props.params;
  const station = await getStationByIdController(params.stationId);
      
  if (!station) {
    notFound();
  }
    
  return(
    <>
      <div className="bg-primary/5 border-b border-primary/10">
        <div className="container py-4 px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link href="/station" className="text-primary hover:text-primary/80 hover:underline">
                  Stations
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <Link 
                  href={`/station/${params.stationId}`}
                  className="text-primary hover:text-primary/80 hover:underline"
                >
                  {station.title}
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="flex items-center">
                  <Users className="h-3.5 w-3.5 mr-1 text-primary" />
                  Entrainement en duo
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="bg-gradient-to-b from-primary/5 to-transparent pt-1">
        <div className="container mx-auto mt-6 pb-4">
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 rounded-full bg-primary/10 border border-primary/20">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              Entrainement en duo: {station.title}
            </h1>
          </div>
          <p className="text-muted-foreground ml-10 pl-1 text-base">
            SDD {station.sddNumber} - Pratique interactive médecin-patient
          </p>
          <Separator className="mt-4 mb-8" />
        </div>

        <PracticeClient />
      </div>
    </>
  );
}
