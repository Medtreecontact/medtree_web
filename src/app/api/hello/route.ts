export async function GET(request: Request) {
  const url = new URL(request.url);
  const name = url.searchParams.get("name") || "World";
  return new Response(JSON.stringify(`Hello, ${name}!`), {
    headers: { "Content-Type": "application/json" },
  });
}