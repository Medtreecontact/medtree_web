import { getStationsController } from "@/interface_adapters/controllers/content/station/get_stations_controller";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from '@/core/constants';
import StationsGrid from "@/app/_ui/components/content/station/StationsGrid";
// import StationSearchResultList from "@/app/_ui/components/content/station/StationSearchResults";
import { SearchResult } from "@/entities/models/search_result";
import { Station } from "@/entities/models/station";
// import { getStationSearchResultController } from "@/interface_adapters/controllers/content/station/get_station_search_result_controller";

export default async function StationHomePage({ 
    searchParams 
  }: { searchParams: Promise<{ q?: string }> }) {
    const searchQuery = (await searchParams).q?.toLowerCase() || "";

    let stations: Station[] = [];
    // let searchResults: SearchResult[] = [];

    if (searchQuery) {
        // searchResults = await getStationSearchResultController(searchQuery);
        stations = await getStationsController();
    } else {
        stations = await getStationsController();
    }

    let paidUser = false;
    const session = (await cookies()).get(SESSION_COOKIE_NAME);
    if (session) {
        const user = JSON.parse(session.value);
        paidUser = user.purchased;
    }

    return( 
        <div className="flex flex-col justify-center w-full p-8">
            <div className="flex items-end space-x-4">
                <p className="text-xl text-gray-500">Session d'entraînement médecin - patient</p>
            </div>
            
            <div className="mt-4 mb-8">
                <p className="text-gray-700 text-lg">
                Les stations ECOS sont conçues pour simuler des consultations médicales réelles. Vous pouvez vous entraîner seul face à un patient virtuel ou en duo avec un partenaire.
                </p>
            </div>
            {!searchQuery && <StationsGrid stations={stations} paidUser={paidUser}/>}
            {/* {searchQuery && <StationSearchResultList searchResults={searchResults} paidUser={paidUser}/>} */}
        </div>
    );
}