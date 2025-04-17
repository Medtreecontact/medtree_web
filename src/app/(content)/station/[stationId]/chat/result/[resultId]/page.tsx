import { getStationByIdController } from '@/interface_adapters/controllers/content/station/get_station_by_id_controller';
import { notFound } from 'next/navigation';
import { ChatResultClient } from '@/app/_ui/components/content/station/chat/result/ChatResultClient';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from '@/app/_ui/shadcn/components/ui/breadcrumb';
import Link from 'next/link';
import { getAnalysisResultByIdController } from '@/interface_adapters/controllers/content/station/get_analysis_result_by_id_controller';
import { ClipboardCheck, Home } from 'lucide-react';

export default async function ChatResultPage(props: {params: Promise<{ stationId: string, resultId: string }>}) {
  const params = await props.params;
  
  try {
    const station = await getStationByIdController(params.stationId);
    if (!station) {
      notFound();
    }
    
    const analysisResult = await getAnalysisResultByIdController(params.resultId);
    if (!analysisResult) {
      notFound();
    }
    
    return (
      <div className="min-h-screen bg-gray-50/60 pb-10">
        <div className="container mx-auto pt-4 px-4">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link href="/" className="flex items-center gap-1.5 text-primary hover:text-primary/90 text-sm">
                  <Home className="h-3.5 w-3.5" />
                  Accueil
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link href="/station" className="text-primary hover:text-primary/90 text-sm">
                  Stations
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Link 
                  href={`/station/${params.stationId}`} 
                  className="text-primary hover:text-primary/90 text-sm max-w-[200px] truncate"
                >
                  {station.title}
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="flex items-center gap-1.5 text-sm">
                  <ClipboardCheck className="h-3.5 w-3.5" />
                  Évaluation
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        <ChatResultClient 
          station={station}
          stationId={params.stationId}
          analysisResult={analysisResult}
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching analysis results:", error);
    notFound();
  }
}