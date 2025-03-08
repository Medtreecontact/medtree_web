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
        <div className="flex flex-col justify-center items-center w-full p-8">
            {!searchQuery && <ExamsGrid menuItems={menuItems} paidUser={paidUser}/>}
            {searchQuery && <SearchResultList searchResults={searchResults} paidUser={paidUser}/>}
        </div>
    );
}