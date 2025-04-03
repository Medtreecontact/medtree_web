import { ChatPageClient } from '@/app/_ui/components/content/station/chat/ChatPageClient';
import { getStationByIdController } from '@/interface_adapters/controllers/content/station/get_station_by_id_controller';
import Link from 'next/link';

export default async function ChatPage(props: {params: Promise<{ stationId: string }>}) {
    const params = await props.params
    const station = await getStationByIdController(params.stationId);
  
    if (!station) {
      return (
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold mb-4">Station Introuvable</h1>
          <p>La station demandée n'a pas été trouvée.</p>
          <Link href="/station" className="text-blue-500 mt-4 inline-block">
            Retour aux stations
          </Link>
        </div>
      );
    }
  
    return <ChatPageClient station={station} stationId={params.stationId} />;
  }