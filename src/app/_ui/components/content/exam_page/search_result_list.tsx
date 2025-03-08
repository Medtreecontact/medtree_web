import { SearchResult } from "@/entities/models/search_result";
import ResultCard from "./search_result_card";

export default function SearchResultList({searchResults, paidUser} : { searchResults : SearchResult[], paidUser : boolean }) {
    if (!searchResults || searchResults.length === 0) {
        return (
            <div className="text-center py-12">
                <h2 className="text-xl font-semibold">Aucun résultat trouvé</h2>
                <p className="text-gray-500">Essayez avec des termes de recherche différents</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 w-full">
            {searchResults.map((result) => (
                <ResultCard key={result.id} result={result} paidUser={paidUser} />
            ))}
        </div>
    );
}