import { getStationByIdController } from '@/interface_adapters/controllers/content/station/get_station_by_id_controller';
import { notFound } from 'next/navigation';
import { ChatResultClient } from '@/app/_ui/components/content/station/chat/result/ChatResultClient';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/app/_ui/shadcn/components/ui/breadcrumb';
import Link from 'next/link';
import { getAnalysisResultByIdController } from '@/interface_adapters/controllers/content/station/get_analysis_result_by_id_controller';

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
                <BreadcrumbPage>Évaluation</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        <ChatResultClient 
          station={station}
          stationId={params.stationId}
          analysisResult={analysisResult}
        />
      </>
    );
  } catch (error) {
    console.error("Error fetching analysis results:", error);
    notFound();
  }
}