import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const res = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
      { next: { revalidate: 604800 } }
    );
    const data = await res.json();
    const thumb: string | undefined = data?.drinks?.[0]?.strDrinkThumb;
    if (thumb) {
      return NextResponse.redirect(thumb, {
        status: 302,
        headers: { "Cache-Control": "public, max-age=604800, stale-while-revalidate=86400" },
      });
    }
  } catch {
    // fall through to 404
  }
  return new NextResponse(null, { status: 404 });
}
