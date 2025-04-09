import { SearchResult } from "@/entities/models/search_result";
import ResultCard from "./search_result_card";
import { SearchX } from "lucide-react";

export default function SearchResultList({searchResults, paidUser} : { searchResults : SearchResult[], paidUser : boolean }) {
    if (!searchResults || searchResults.length === 0) {
        return (
            <div className="text-center py-16 px-4 border border-dashed border-primary/20 rounded-lg bg-primary/5">
                <SearchX className="h-12 w-12 mx-auto text-primary/50 mb-4" />
                <h2 className="text-xl font-semibold mb-2">Aucun résultat trouvé</h2>
                <p className="text-gray-500 max-w-md mx-auto">
                    Essayez avec des termes de recherche différents ou vérifiez l'orthographe
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8 w-full animate-in fade-in duration-300">
            {searchResults.map((result, index) => (
                <div 
                    key={result.id} 
                    className="transition-all hover:translate-y-[-2px]"
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                    <ResultCard result={result} paidUser={paidUser} />
                </div>
            ))}
        </div>
    );
}