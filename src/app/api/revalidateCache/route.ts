import { revalidateTag } from "next/cache";

// curl -X POST http://localhost:3000/api/revalidateCache?cacheTag=exampleTag
// curl -X POST https://medtree-283318355476.europe-west3.run.app/api/revalidateCache?cacheTag=getExamStepsSynthesesController -H "Content-Length: 0"

export async function POST(request: Request) {
    const url = new URL(request.url);
    const cacheTag = url.searchParams.get("cacheTag");

    if (!cacheTag) {
        return new Response(JSON.stringify({ error: 'Invalid cacheTag' }), {
            headers: { 
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "https://medtree-development.web.app", // Allow all origins
                "Access-Control-Allow-Methods": "POST, OPTIONS", // Allow POST and OPTIONS methods
                "Access-Control-Allow-Headers": "Content-Type, x-caller-auth" // Allow specific headers
            },
        });
    }

    // Check for REFRESH_WEB_CACHE_PRIVATE_KEY header
    if (request.headers.get('x-caller-auth') !== process.env.REFRESH_WEB_CACHE_PRIVATE_KEY) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            headers: { 
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "https://medtree-development.web.app", // Allow all origins
                "Access-Control-Allow-Methods": "POST, OPTIONS", // Allow POST and OPTIONS methods
                "Access-Control-Allow-Headers": "Content-Type, x-caller-auth" // Allow specific headers
            },
            status: 401,
        });
    }

    revalidateTag(cacheTag);

    return new Response(JSON.stringify({ success: true }), {
        headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://medtree-development.web.app", // Allow all origins
            "Access-Control-Allow-Methods": "POST, OPTIONS", // Allow POST and OPTIONS methods
            "Access-Control-Allow-Headers": "Content-Type, x-caller-auth" // Allow specific headers
        },
    });
}

// Handle OPTIONS method for CORS preflight requests
export async function OPTIONS() {
    return new Response(null, {
        headers: {
            "Access-Control-Allow-Origin": "https://medtree-development.web.app", // Allow all origins
            "Access-Control-Allow-Methods": "POST, OPTIONS", // Allow POST and OPTIONS methods
            "Access-Control-Allow-Headers": "Content-Type, x-caller-auth" // Allow specific headers
        }
    });
}