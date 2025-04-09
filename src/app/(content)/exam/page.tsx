import { getMenuItemsController } from "@/interface_adapters/controllers/content/exam/get_menu_items_controller";

import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from '@/core/constants';
import ExamsGrid from "@/app/_ui/components/content/exam_page/exams_grid";
import SearchResultList from "@/app/_ui/components/content/exam_page/search_result_list";
import { MenuItem } from "@/entities/models/menu_item";
import { SearchResult } from "@/entities/models/search_result";
import { getExamSearchResultController } from "@/interface_adapters/controllers/content/exam/get_exam_search_result_controller";

export default async function ExamHomePage({ 
    searchParams 
  }: { searchParams: Promise<{ q?: string }> }) {
    const searchQuery = (await searchParams).q?.toLowerCase() || "";

    let menuItems: MenuItem[] = [];
    let searchResults: SearchResult[] = [];

    if (searchQuery) {
        searchResults = await getExamSearchResultController(searchQuery);
    } else {
        menuItems = await getMenuItemsController();
    }

    let paidUser = false;
    const session = (await cookies()).get(SESSION_COOKIE_NAME);
    if (session)
    {
        const user = JSON.parse(session.value);
        paidUser = user.purchased;
    }

    return( 
        <div className="flex flex-col justify-center w-full p-8">
            <div className="flex items-end space-x-4">
                {!searchQuery ? (
                    <p className="text-xl text-gray-500">Sémiologies complètes, fiches de révisions rapides et quiz d'évaluation</p>
                ) : (
                    <p className="text-xl text-gray-500">Résultats de recherche pour <span className="font-semibold">"{searchQuery}"</span></p>
                )}
            </div>
            <div className="mt-4 mb-8">
                {!searchQuery ? (
                    <p className="text-gray-700 text-lg">
                        Chaque module est structuré avec des chapitres détaillés, des fiches synthèses pour révision rapide et des quiz d'auto-évaluation pour tester vos connaissances.
                    </p>
                ) : (
                    <p className="text-gray-700 text-lg">
                        Les résultats ci-dessous sont organisés par module. Pour chaque module, vous trouverez les fiches synthèses, quiz et chapitres détaillés correspondant à votre recherche.
                    </p>
                )}
            </div>
            {!searchQuery && <ExamsGrid menuItems={menuItems} paidUser={paidUser}/>}
            {searchQuery && <SearchResultList searchResults={searchResults} paidUser={paidUser}/>}
        </div>
    );
}