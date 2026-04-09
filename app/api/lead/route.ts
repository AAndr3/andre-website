export async function POST(req: Request) {
  try {
    const body = await req.json();

    const lead = {
      name:      body.name     ?? "",
      phone:     body.phone    ?? "",
      email:     body.email    ?? "",
      specialty: body.specialty ?? "",
      city:      body.city      ?? "",
      patients:  body.patients  ?? 0,
      source:    body.source    ?? "calculadora",
      timestamp: new Date().toISOString(),
    };

    // ── Webhook (Make / Zapier / n8n) ──────────────────────────────────
    // Set LEAD_WEBHOOK_URL in your .env.local to forward leads anywhere.
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
    }

    // ── Fallback log (visible in Vercel Function logs) ─────────────────
    console.log("[LEAD]", JSON.stringify(lead));

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[LEAD ERROR]", err);
    return Response.json({ ok: false }, { status: 500 });
  }
}
