import StationCard from "./StationCard";
import { Station } from "@/entities/models/station";

export default function StationsGrid({ 
    stations,
    paidUser
}: { 
    stations: Station[],
    paidUser: boolean
}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {stations.map(station => (
                <StationCard 
                    key={station.id} 
                    station={station} 
                    isPaidUser={paidUser}
                />
            ))}
        </div>
    );
}