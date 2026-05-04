import { NextResponse } from "next/server";

const HUBSPOT_BASE = "https://api.hubapi.com/crm/v3/objects/contacts";

// RequestTalentPageFragment sends firstName/lastName separately, ContactForm sends a single "name"
function buildProperties(body) {
  const props = {};

  if (body.email) props.email = body.email.trim();

  if (body.firstName) {
    props.firstname = body.firstName.trim();
  } else if (body.name) {
    const parts = body.name.trim().split(/\s+/);
    props.firstname = parts[0] ?? "";
    props.lastname = parts.slice(1).join(" ");
  }

  if (body.lastName) props.lastname = body.lastName.trim();

  if (body.phone)    props.phone    = body.phone.trim();
  if (body.company)  props.company  = body.company.trim();
  if (body.industry) props.industry = body.industry.trim();
  if (body.message)  props.message  = body.message.trim();

  // HubSpot only takes strings — make sure the property name matches what's in your portal
  if (Array.isArray(body.roles) && body.roles.length > 0) {
    props.roles__requested_ = body.roles.join("; ");
  }

  props.hs_lead_status = "OPEN";

  return props;
}

async function findContactByEmail(email, apiKey) {
  try {
    const res = await fetch(`${HUBSPOT_BASE}/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        filterGroups: [
          {
            filters: [{ propertyName: "email", operator: "EQ", value: email }],
          },
        ],
        properties: ["email"],
        limit: 1,
      }),
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.results?.[0]?.id ?? null;
  } catch {
    return null;
  }
}

export async function POST(req) {
  console.log("[capture-partial] POST received");
  try {
    const body = await req.json();
    console.log("[capture-partial] Body:", JSON.stringify(body));

    const apiKey = process.env.HUBSPOT_API_KEY;
    if (!apiKey) {
      console.error("[capture-partial] HUBSPOT_API_KEY is not set");
      return NextResponse.json({ ok: true }, { status: 200 });
    }
    console.log("[capture-partial] API key present, length:", apiKey.length);

    if (!body.email || !body.email.trim()) {
      console.log("[capture-partial] No email in body, skipping");
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const properties = buildProperties(body);
    console.log("[capture-partial] HubSpot properties:", JSON.stringify(properties));

    console.log("[capture-partial] Attempting CREATE...");
    const createRes = await fetch(HUBSPOT_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ properties }),
    });

    const createText = await createRes.text();
    console.log(`[capture-partial] CREATE response ${createRes.status}:`, createText);

    if (createRes.ok) {
      console.log("[capture-partial] Contact created successfully");
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    if (createRes.status !== 409) {
      console.error(`[capture-partial] HubSpot CREATE failed (${createRes.status}):`, createText);
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // contact already exists, find it and patch instead
    console.log("[capture-partial] 409 — searching for existing contact...");
    const existingId = await findContactByEmail(body.email.trim(), apiKey);
    console.log("[capture-partial] Existing contact id:", existingId);

    if (!existingId) {
      console.error("[capture-partial] Could not find existing contact for:", body.email);
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    console.log("[capture-partial] Attempting PATCH on contact:", existingId);
    const patchRes = await fetch(`${HUBSPOT_BASE}/${existingId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ properties }),
    });

    const patchText = await patchRes.text();
    console.log(`[capture-partial] PATCH response ${patchRes.status}:`, patchText);

    if (!patchRes.ok) {
      console.error(`[capture-partial] HubSpot PATCH failed (${patchRes.status}):`, patchText);
    } else {
      console.log("[capture-partial] Contact updated successfully");
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[capture-partial] Unhandled error:", err);
    return NextResponse.json({ ok: true }, { status: 200 });
  }
}
