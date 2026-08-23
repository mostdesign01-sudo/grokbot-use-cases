import dataset from "../../data/html-items.json";

export function GET() {
  return new Response(JSON.stringify(dataset, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}
