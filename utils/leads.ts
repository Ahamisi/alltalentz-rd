// Shared by /api/contact and /api/quick-lead — both push into the same HubSpot
// pipeline and Google Sheet.

const HUBSPOT_BASE = "https://api.hubapi.com/crm/v3/objects/contacts";

const SHEETS_ENDPOINT =
  "https://script.google.com/macros/s/AKfycby7IROKA_FHn0_aFYYPMNa6Iw_37o8G18_1sbIzMBjJSl30wmpE5HjLTgYkzxOxcXJVbA/exec";

export interface LeadFields {
  fullName?: string;
  email?: string;
  company?: string;
  phone?: string;
  industry?: string;
  roles?: string[];
  numberOfProfessionals?: string;
  timeline?: string;
  additionalRequirements?: string;
}

async function findContactByEmail(email: string, apiKey: string): Promise<string | null> {
  try {
    const res = await fetch(`${HUBSPOT_BASE}/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        filterGroups: [{ filters: [{ propertyName: "email", operator: "EQ", value: email }] }],
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

// Create the contact, or PATCH the existing one when HubSpot reports a 409.
export async function upsertHubSpotContact(lead: LeadFields, logTag = "contact"): Promise<void> {
  const apiKey = process.env.HUBSPOT_API_KEY;
  if (!apiKey || !lead.email?.trim()) return;

  const parts = (lead.fullName ?? "").trim().split(/\s+/);
  const properties: Record<string, string> = {
    email: lead.email.trim(),
    firstname: parts[0] ?? "",
    lastname: parts.slice(1).join(" "),
    hs_lead_status: "OPEN",
  };
  if (lead.phone)    properties.phone    = lead.phone.trim();
  if (lead.company)  properties.company  = lead.company.trim();
  if (lead.industry) properties.industry = lead.industry.trim();
  if (Array.isArray(lead.roles) && lead.roles.length > 0) {
    properties.roles__requested_ = lead.roles.join("; ");
  }

  const createRes = await fetch(HUBSPOT_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ properties }),
  });

  if (createRes.ok) return;

  if (createRes.status !== 409) {
    console.error(`[${logTag}] HubSpot CREATE failed (${createRes.status})`);
    return;
  }

  const existingId = await findContactByEmail(lead.email.trim(), apiKey);
  if (!existingId) {
    console.error(`[${logTag}] HubSpot: could not find existing contact for`, lead.email);
    return;
  }

  const patchRes = await fetch(`${HUBSPOT_BASE}/${existingId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ properties }),
  });

  if (!patchRes.ok) {
    console.error(`[${logTag}] HubSpot PATCH failed (${patchRes.status})`);
  }
}

// The keys are the sheet's column headers — keep them in sync with the Apps
// Script, and always send all of them so popup rows line up with full-form rows.
export async function appendLeadToSheet(lead: LeadFields, logTag = "contact"): Promise<void> {
  const sheetsData = new FormData();
  sheetsData.append("Fullname", lead.fullName ?? "");
  sheetsData.append("Email", lead.email ?? "");
  sheetsData.append("Company", lead.company ?? "");
  sheetsData.append("Phone", lead.phone ?? "");
  sheetsData.append("Industry", lead.industry ?? "");
  sheetsData.append("Roles", (lead.roles ?? []).join(", "));
  sheetsData.append("NumberOfProfessionals", lead.numberOfProfessionals ?? "");
  sheetsData.append("Timeline", lead.timeline ?? "");
  sheetsData.append("AdditionalRequirements", lead.additionalRequirements ?? "");

  try {
    const response = await fetch(SHEETS_ENDPOINT, { method: "POST", body: sheetsData });
    if (!response.ok) console.error(`[${logTag}] Failed to submit data to sheets`);
  } catch (error) {
    console.error(`[${logTag}] Error submitting to sheets:`, error);
  }
}
