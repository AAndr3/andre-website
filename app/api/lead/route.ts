import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const lead = {
      name:        body.name      ?? "",
      phone:       body.phone     ?? "",
      email:       body.email     ?? "",
      specialty:   body.specialty ?? "",
      city:        body.city      ?? "",
      patients:    body.patients  ?? 0,
      source:      body.source    ?? "homepage",
      status:      "novo",
      assigned_to: "André",
    };

    // ── Supabase ───────────────────────────────────────────────────────
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { error } = await supabase.from("website_leads").insert(lead);
      if (error) console.error("[SUPABASE]", error.message);
      else console.log("[SUPABASE] lead saved");
    } else {
      console.warn("[SUPABASE] env vars not set");
    }

    // ── Make.com webhook (mantido como backup) ─────────────────────────
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      const res = await fetch(webhookUrl, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(lead),
      });
      console.log("[WEBHOOK]", res.status, res.statusText);
    }

    // ── Dashboard webhook ───────────────────────────────────────────────
    try {
      const dashRes = await fetch("https://dashboard.andreantunes.co/api/webhook/lead", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:      lead.name,
          phone:     lead.phone,
          email:     lead.email,
          specialty: lead.specialty,
          city:      lead.city,
          source:    lead.source,
        }),
      });
      console.log("[DASHBOARD WEBHOOK]", dashRes.status, dashRes.statusText);
    } catch (err) {
      console.error("[DASHBOARD WEBHOOK ERROR]", err);
    }

    console.log("[LEAD]", JSON.stringify(lead));
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[LEAD ERROR]", err);
    return Response.json({ ok: false }, { status: 500 });
  }
}
