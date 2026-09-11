export function GET() { return Response.json({ error: "Image uploads require admin access." }, { status: 405 }); }
