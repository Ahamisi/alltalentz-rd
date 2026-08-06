import { NextRequest, NextResponse } from "next/server";
import { transporter, smtpEmail } from "@/utils/nodemailer";

/**
 * Three-field lead from the landing popup (<WelcomeLeadModal />).
 *
 * Deliberately lighter than /api/contact: no reCAPTCHA gate, because the popup
 * trades verification for conversion. It only notifies the team by email — with
 * no email address on the lead there is nothing to key a HubSpot contact on, so
 * follow-up happens from the inbox.
 */

interface QuickLeadBody {
  name?: string;
  company?: string;
  talentNeeded?: string;
  /** Path the popup was shown on — useful for attributing the lead. */
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
  const company = (body.company ?? "").trim().slice(0, 200);
  const talentNeeded = (body.talentNeeded ?? "").trim().slice(0, 2000);
  const source = (body.source ?? "").trim().slice(0, 200);

  if (!name || !company || !talentNeeded) {
    return NextResponse.json(
      { error: "name, company and talentNeeded are required" },
      { status: 400 }
    );
  }

  const rows: Array<[string, string]> = [
    ["Name", name],
    ["Company", company],
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
      <p style="margin-top:16px;font-size:13px;color:#6b7280">
        No contact details were collected — reply through whichever channel this lead used.
      </p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: smtpEmail,
      to: smtpEmail,
      subject: `Quick lead — ${company}`,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[quick-lead] Failed to send email:", error);
    return NextResponse.json({ error: "Failed to send lead" }, { status: 500 });
  }
}
