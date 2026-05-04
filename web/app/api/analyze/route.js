export async function POST(req) {
  const body = await req.json()

  await fetch("https://YOUR_FIREBASE_FUNCTION/analyze", {
    method: "POST",
    body: JSON.stringify(body)
  })

  return Response.json({ ok: true })
}
