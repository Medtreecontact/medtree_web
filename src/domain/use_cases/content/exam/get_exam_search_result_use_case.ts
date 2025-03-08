import { getServerInjection } from "@/dependency_injection/server_container";
import { SearchResult } from "@/entities/models/search_result";
import { Step } from "@/entities/models/step";

export async function getExamSearchResultCase(searchQuery: string) {
    const firebaseReposiory = getServerInjection("IFirebaseRepository");
    
    // Fetch all data at once to minimize database calls
    const menuItems = await firebaseReposiory.getMenuItems();
    const exams = await firebaseReposiory.getExams();
    const steps = await firebaseReposiory.getSteps();
    const substeps = await firebaseReposiory.getSubsteps();
    const syntheses = await firebaseReposiory.getSyntheses();

    substeps.forEach(substep => substep.information = cleanText(substep.information));
    syntheses.forEach(synthese => synthese.content = cleanText(synthese.content));

    // Array to hold all search results
    const searchResults: SearchResult[] = [];
    
    // Process each menu item / exam
    for (const menuItem of menuItems) {
        // Find the exam from our exams array instead of making another call
        const exam = exams.find(e => e.id === menuItem.examId);
        
        if (!exam) {
            console.warn(`Exam with ID ${menuItem.examId} not found for menu item ${menuItem.title}`);
            continue;
        }
        
        // Create a search result object for this exam
        const searchResult: SearchResult = {
            access: menuItem.access,
            examId: menuItem.examId,
            iconPath: await firebaseReposiory.getUrlFromDocumentPath(menuItem.iconPath),
            id: menuItem.id,
            title: menuItem.title,
            stepsResults: [],
            substepsResults: [],
            syntheseResults: [],
            quizzResults: [],
            resultCount: 0
        };
        
        // Track which steps are already included to avoid duplicates
        const includedStepIds = new Set();
        
        // Get all steps for this exam
        if (exam.stepsIds && exam.stepsIds.length > 0) {
            for (const stepId of exam.stepsIds) {
                // Find step from pre-fetched steps array
                const step = steps.find(s => s.id === stepId);
                
                if (!step) {
                    console.warn(`Step with ID ${stepId} not found for exam ${exam.id}`);
                    continue;
                }
                
                let stepIncluded = false;
                
                // If search query matches step title
                if (step.stepTitle.toLowerCase().includes(searchQuery.toLowerCase())) {
                    if (!includedStepIds.has(step.id)) {
                        searchResult.stepsResults.push(step);
                        includedStepIds.add(step.id);
                        stepIncluded = true;
                    }
                }
                
                // Get substeps for this step
                if (step.substepsIds && step.substepsIds.length > 0) {
                    for (const substepId of step.substepsIds) {
                        // Find substep from pre-fetched substeps array
                        const substep = substeps.find(s => s.id === substepId);
                        
                        if (!substep) {
                            console.warn(`Substep with ID ${substepId} not found for step ${step.id}`);
                            continue;
                        }
                        
                        // If search query matches substep title or content
                        if (!searchQuery || 
                            substep.subTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            substep.information.toLowerCase().includes(searchQuery.toLowerCase())) {
                            searchResult.substepsResults.push(substep);
                            
                            // If step wasn't included yet based on its title, include it now
                            if (!stepIncluded && !includedStepIds.has(step.id)) {
                                searchResult.stepsResults.push(step);
                                includedStepIds.add(step.id);
                                stepIncluded = true;
                            }
                        }
                    }
                }
            }
        }
        
        // Get syntheses for this exam
        if (exam.synthesesIds && exam.synthesesIds.length > 0) {
            for (const syntheseId of exam.synthesesIds) {
                // Find synthese from pre-fetched syntheses array
                const synthese = syntheses.find(s => s.id === syntheseId);
                
                if (!synthese) {
                    console.warn(`Synthese with ID ${syntheseId} not found for exam ${exam.id}`);
                    continue;
                }
                
                // If search query matches synthese title or content
                if (!searchQuery || 
                    synthese.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    synthese.content.toLowerCase().includes(searchQuery.toLowerCase())) {
                    searchResult.syntheseResults.push(synthese);
                }
            }
        }

        // TODO add quizz results
        

        function isStandaloneStep(step: Step): boolean {
            return !step.substepsIds.some(substepId => 
                searchResult.substepsResults?.some(substep => substep.id === substepId)
            );
        }
        
        // Count standalone steps (steps without matching substeps in results)
        const standaloneStepsCount = searchResult.stepsResults?.filter(step => isStandaloneStep(step)).length || 0;
        
        // Calculate total results for this exam
        const totalResults = 
            standaloneStepsCount + 
            (searchResult.substepsResults?.length || 0) + 
            (searchResult.syntheseResults?.length || 0) + 
            (searchResult.quizzResults?.length || 0);
        
        searchResult.resultCount = totalResults;
        if (totalResults) {
            searchResults.push(searchResult);
        }
    }

    const sortedSearchResults = searchResults.sort((a, b) => b.resultCount - a.resultCount);

    return sortedSearchResults;    
}

function cleanText(text: string) {
    // First remove HTML tags
    let cleanedText = text.replace(/<[^>]*>?/gm, ' ');
        
    // Then decode HTML entities (like &#x27; to apostrophe)
    cleanedText = cleanedText
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#x27;/g, "'")
        .replace(/&#39;/g, "'")
        .replace(/&ldquo;/g, '"')
        .replace(/&rdquo;/g, '"')
        .replace(/&ndash;/g, '–')
        .replace(/&mdash;/g, '—')
        .replace(/&hellip;/g, '...')
        .replace(/&#x2F;/g, '/')
        .replace(/&rsquo;/g, '\'')
        .replace(/&lsquo;/g, '\'')
        .replace(/&#x2019;/g, '\'')
        .replace(/&#x2018;/g, '\'')
        .replace(/&#xA0;|&nbsp;/g, ' ');
    
    // For any remaining entities like &#nnn; or &#xHHH;
    cleanedText = cleanedText.replace(/&#x([0-9a-f]+);/gi, (match, hex) => {
        return String.fromCodePoint(parseInt(hex, 16));
    });
    
    cleanedText = cleanedText.replace(/&#(\d+);/g, (match, dec) => {
        return String.fromCodePoint(parseInt(dec, 10));
    });

    return cleanedText;
}