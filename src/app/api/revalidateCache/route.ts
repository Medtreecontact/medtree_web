import { revalidateTag } from "next/cache";


// curl -X POST http://localhost:3000/api/revalidateCache?cacheTag=exampleTag
export async function POST(request: Request) {
    const url = new URL(request.url);
    const cacheTag = url.searchParams.get("cacheTag");

    if (!cacheTag) {
        return new Response(JSON.stringify({ error: 'Invalid cacheTag' }), {
            headers: { "Content-Type": "application/json" },
        });
    }

    // TODO faire une vérification de sécurité ici en vérifiant que l'utilisateur est autorisé à revalider le cache

    revalidateTag(cacheTag);

    return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" },
    });
}