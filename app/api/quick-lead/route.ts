import { NextRequest, NextResponse } from "next/server";
import { transporter, smtpEmail } from "@/utils/nodemailer";
import { appendLeadToSheet, upsertHubSpotContact, type LeadFields } from "@/utils/leads";

interface QuickLeadBody {
  name?: string;
  email?: string;
  phone?: string;
  talentNeeded?: string;
  source?: string;
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: QuickLeadBody;
  try {
    body = (await req.json()) as QuickLeadBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const name = (body.name ?? "").trim().slice(0, 200);
  const email = (body.email ?? "").trim().slice(0, 200);
  const phone = (body.phone ?? "").trim().slice(0, 50);
  const talentNeeded = (body.talentNeeded ?? "").trim().slice(0, 2000);
  const source = (body.source ?? "").trim().slice(0, 200);

  if (!name || !email || !talentNeeded) {
    return NextResponse.json(
      { error: "name, email and talentNeeded are required" },
      { status: 400 }
    );
  }

  const rows: Array<[string, string]> = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone || "—"],
    ["Talent needed", talentNeeded],
    ["Submitted from", source || "—"],
  ];

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#121212">
      <h2 style="margin:0 0 16px">New quick lead (landing popup)</h2>
      <table cellpadding="6" style="border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="color:#6b7280">${label}</td><td><strong>${escapeHtml(
                value
              )}</strong></td></tr>`
          )
          .join("")}
      </table>
    </div>
  `;

  // talentNeeded is free text rather than a picklist, so it goes in as a single
  // role and is repeated in the notes column for readability.
  const lead: LeadFields = {
    fullName: name,
    email,
    phone,
    roles: [talentNeeded],
    additionalRequirements: `${talentNeeded}\n\n[Landing popup — submitted from ${source || "/"}]`,
  };

  // fire-and-forget — neither may block the lead email
  upsertHubSpotContact(lead, "quick-lead").catch((e) =>
    console.error("[quick-lead] HubSpot upsert failed:", e)
  );
  appendLeadToSheet(lead, "quick-lead").catch((e) =>
    console.error("[quick-lead] Sheets append failed:", e)
  );

  try {
    await transporter.sendMail({
      from: smtpEmail,
      to: smtpEmail,
      subject: `Quick lead — ${name}`,
      replyTo: email,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[quick-lead] Failed to send email:", error);
    return NextResponse.json({ error: "Failed to send lead" }, { status: 500 });
  }
}
