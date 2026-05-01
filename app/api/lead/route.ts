import crypto from "crypto";

function hash(value: string) {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

async function sendMetaCAPI(eventName: string, lead: {
  email: string; phone: string; name: string; source: string;
}, requestIp?: string) {
  const pixelId = process.env.META_PIXEL_ID;
  const token   = process.env.META_CAPI_TOKEN;
  if (!pixelId || !token) return;

  const userData: Record<string, string> = {
    client_user_agent: "Mozilla/5.0",
  };
  if (lead.email) userData["em"] = hash(lead.email);
  if (lead.phone) userData["ph"] = hash(lead.phone.replace(/\s+/g, ""));
  if (requestIp)  userData["client_ip_address"] = requestIp;

  const payload: Record<string, unknown> = {
    data: [{
      event_name:       eventName,
      event_time:       Math.floor(Date.now() / 1000),
      action_source:    "website",
      event_source_url: `https://andreantunes.co/${lead.source}`,
      user_data:        userData,
    }],
  };
  if (process.env.META_CAPI_TEST_CODE) {
    payload["test_event_code"] = process.env.META_CAPI_TEST_CODE;
  }

  try {
    const res  = await fetch(
      `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${token}`,
      { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }
    );
    const json = await res.json().catch(() => ({}));
    console.log(`[META CAPI] ${eventName}`, res.status, JSON.stringify(json));
  } catch (e) { console.error(`[META CAPI ERROR] ${eventName}`, e); }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const ip   = req.headers.get("x-forwarded-for")?.split(",")[0] ?? undefined;

    const lead = {
      name:      body.name      ?? "",
      phone:     body.phone     ?? "",
      email:     body.email     ?? "",
      specialty: body.specialty ?? "",
      city:      body.city      ?? "",
      patients:  body.patients  ?? 0,
      source:    body.source    ?? "homepage",
      notes:     body.notes     ?? "",
      orcamento: body.orcamento ?? "",
      problema:  body.problema  ?? "",
    };

    // ── Dashboard webhook ──────────────────────────────────────────────
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

    // ── Meta Conversions API ───────────────────────────────────────────
    await Promise.all([
      sendMetaCAPI("Lead",     lead, ip),
      sendMetaCAPI("Contact",  lead, ip),
      sendMetaCAPI("Schedule", lead, ip),
    ]);

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[LEAD ERROR]", err);
    return Response.json({ ok: false }, { status: 500 });
  }
}
