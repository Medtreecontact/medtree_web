import { getExamSearchResultCase } from '@/domain/use_cases/content/exam/get_exam_search_result_use_case';

export async function getExamSearchResultController(searchQuery: string) {
    const searchResults = await getExamSearchResultCase(searchQuery);
    return searchResults;
}