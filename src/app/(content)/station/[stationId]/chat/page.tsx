import { getStationByIdController } from '@/interface_adapters/controllers/content/station/get_station_by_id_controller';
import Link from 'next/link';
import { ChatInterface } from '@/app/_ui/components/content/station/chat/ChatInterface';
import { ArrowLeft } from 'lucide-react';

export default async function ChatPage(props: {params: Promise<{ stationId: string }>}) {
    const params = await props.params
    const station = await getStationByIdController(params.stationId);
  
    if (!station) {
        return (
            <div className="p-6 text-center">
                <h1 className="text-2xl font-bold mb-4">Station Not Found</h1>
                <p>The requested station could not be found.</p>
                <Link href="/station" className="text-blue-500 mt-4 inline-block">
                    Back to Stations
                </Link>
            </div>
        );
    }
  
    return (
        // page main div
        <div className="flex flex-col h-[calc(100vh-76.5955px)]">
            <div className="bg-white shadow-sm p-4 flex items-center">
                <Link href={`/station/${station.id}`} className="mr-3 text-blue-500">
                    <ArrowLeft size={18} />
                </Link>
                <h1 className="text-xl font-semibold">{station.title}</h1>
                <span className="ml-2 text-sm text-gray-500">Patient Simulation</span>
            </div>
            
            <div className="flex-1 overflow-hidden">
                <ChatInterface station={station} />
            </div>
        </div>
    );
}