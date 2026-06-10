import { NextRequest, NextResponse } from "next/server";
import { transporter, smtpEmail } from "@/utils/nodemailer";
import { renderContactEmail } from "@/utils/renderEmail";

const HUBSPOT_BASE = "https://api.hubapi.com/crm/v3/objects/contacts";

interface ContactBody {
  fullName: string;
  email: string;
  company: string;
  phone: string;
  industry: string;
  roles: string[];
  numberOfProfessionals: string;
  timeline: string;
  additionalRequirements?: string;
  recaptchaToken: string;
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

async function upsertHubSpotContact(body: ContactBody): Promise<void> {
  const apiKey = process.env.HUBSPOT_API_KEY;
  if (!apiKey || !body.email?.trim()) return;

  const parts = (body.fullName ?? "").trim().split(/\s+/);
  const properties: Record<string, string> = {
    email: body.email.trim(),
    firstname: parts[0] ?? "",
    lastname: parts.slice(1).join(" "),
    hs_lead_status: "OPEN",
  };
  if (body.phone)    properties.phone    = body.phone.trim();
  if (body.company)  properties.company  = body.company.trim();
  if (body.industry) properties.industry = body.industry.trim();
  if (Array.isArray(body.roles) && body.roles.length > 0) {
    properties.roles__requested_ = body.roles.join("; ");
  }

  const createRes = await fetch(HUBSPOT_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ properties }),
  });

  if (createRes.ok) return;

  if (createRes.status !== 409) {
    console.error(`[contact] HubSpot CREATE failed (${createRes.status})`);
    return;
  }

  const existingId = await findContactByEmail(body.email.trim(), apiKey);
  if (!existingId) {
    console.error("[contact] HubSpot: could not find existing contact for", body.email);
    return;
  }

  const patchRes = await fetch(`${HUBSPOT_BASE}/${existingId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ properties }),
  });

  if (!patchRes.ok) {
    console.error(`[contact] HubSpot PATCH failed (${patchRes.status})`);
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = (await req.json()) as ContactBody;
  const {
    fullName,
    email,
    company,
    phone,
    industry,
    roles,
    numberOfProfessionals,
    timeline,
    additionalRequirements,
    recaptchaToken,
  } = body;

  if (!recaptchaToken) {
    return NextResponse.json({ error: "reCAPTCHA token is required" }, { status: 400 });
  }

  try {
    const recaptchaResponse = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    });

    const recaptchaData = await recaptchaResponse.json();
    if (!recaptchaData.success) {
      return NextResponse.json({ error: "reCAPTCHA verification failed" }, { status: 400 });
    }
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return NextResponse.json({ error: "reCAPTCHA verification failed" }, { status: 500 });
  }

  const sheetsData = new FormData();
  sheetsData.append("Fullname", fullName);
  sheetsData.append("Email", email);
  sheetsData.append("Company", company);
  sheetsData.append("Phone", phone);
  sheetsData.append("Industry", industry);
  sheetsData.append("Roles", roles.join(", ") ?? "");
  sheetsData.append("NumberOfProfessionals", numberOfProfessionals ?? "");
  sheetsData.append("Timeline", timeline ?? "");
  sheetsData.append("AdditionalRequirements", additionalRequirements ?? "");

  const emailHtml = await renderContactEmail({
    fullName,
    email,
    company,
    phone,
    industry,
    roles,
    numberOfProfessionals,
    timeline,
    additionalRequirements,
  });

  const sendToSheets = async () => {
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycby7IROKA_FHn0_aFYYPMNa6Iw_37o8G18_1sbIzMBjJSl30wmpE5HjLTgYkzxOxcXJVbA/exec",
        { method: "POST", body: sheetsData }
      );
      if (!response.ok) console.error("Failed to submit data to sheets");
    } catch (error) {
      console.error("Error submitting to sheets:", error);
    }
  };

  const options = {
    from: smtpEmail,
    to: smtpEmail,
    subject: "New Talent Request",
    html: emailHtml,
  };

  // fire-and-forget — HubSpot failure must not block email/sheets
  upsertHubSpotContact(body).catch((e) => console.error("[contact] HubSpot upsert failed:", e));

  try {
    await transporter.sendMail(options);
    await sendToSheets();
    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
