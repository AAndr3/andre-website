export async function POST(req: Request) {
  try {
    const body = await req.json();

    const lead = {
      name:      body.name      ?? "",
      phone:     body.phone     ?? "",
      email:     body.email     ?? "",
      specialty: body.specialty ?? "",
      city:      body.city      ?? "",
      patients:  body.patients  ?? 0,
      source:    body.source    ?? "homepage",
    };

    // ── Dashboard webhook (Supabase + notificações) ────────────────────
    const dashRes = await fetch("https://dashboard.andreantunes.co/api/webhook/lead", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(lead),
    });
    const dashJson = await dashRes.json().catch(() => ({}));
    console.log("[DASHBOARD WEBHOOK]", dashRes.status, JSON.stringify(dashJson));

    // ── Make.com webhook (backup) ──────────────────────────────────────
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      fetch(webhookUrl, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(lead),
      }).catch(() => {});
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[LEAD ERROR]", err);
    return Response.json({ ok: false }, { status: 500 });
  }
}
