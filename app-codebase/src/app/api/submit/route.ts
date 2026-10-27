import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const fullName = (formData.get("Driver Full Name") || formData.get("name") || "Not Provided").toString();
    const phone = (formData.get("Phone Number") || formData.get("phone") || "Not Provided").toString();
    const email = (formData.get("Email Address") || formData.get("email") || "Not Provided").toString();
    const citation = (formData.get("Citation Number") || formData.get("citation_number") || "Not Provided").toString();
    const state = (formData.get("State of Issue") || formData.get("state") || "Not Provided").toString();
    const county = (formData.get("County Jurisdiction") || formData.get("county") || "Not Provided").toString();
    const violation = (formData.get("Violation Category") || formData.get("violation_type") || "Not Specified").toString();
    const details = (formData.get("Incident Details & Notes") || formData.get("details") || "No additional notes provided.").toString();

    // Check for uploaded file attachment
    const fileEntry = formData.get("attachment") || formData.get("file");
    let attachments: Array<{ filename: string; content: Buffer }> = [];
    let fileInfoText = "No document attached";

    if (fileEntry && typeof fileEntry === "object" && "arrayBuffer" in fileEntry) {
      const file = fileEntry as File;
      if (file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        attachments.push({
          filename: file.name,
          content: buffer,
        });
        const sizeKb = (file.size / 1024).toFixed(1);
        fileInfoText = `${file.name} (${sizeKb} KB)`;
      }
    }

    // Generate Custom Luxury Email Table (matches RouteDefense_Custom_Email_Preview.html exactly)
    const customHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RouteDefense Case Dossier</title>
</head>
<body style="margin: 0; padding: 30px 15px; background-color: #F3F4F6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #111111;">
  <div style="max-width: 640px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08);">
    
    <!-- Luxury Obsidian & Red Header -->
    <div style="background-color: #111111; padding: 28px 32px; border-bottom: 4px solid #E63946;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td>
            <div style="font-size: 22px; font-weight: 800; letter-spacing: 2px; color: #FFFFFF; text-transform: uppercase;">ROUTEDEFENSE</div>
            <div style="font-size: 11px; letter-spacing: 1.5px; color: #9CA3AF; text-transform: uppercase; margin-top: 4px; font-weight: 600;">Institutional Traffic Defense Network</div>
          </td>
          <td style="text-align: right;">
            <span style="background-color: #E63946; color: #FFFFFF; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 6px 12px; border-radius: 4px;">Priority Intake</span>
          </td>
        </tr>
      </table>
    </div>

    <!-- Case Dossier Sub-Banner -->
    <div style="background-color: #FAFAFA; border-bottom: 1px solid #E5E7EB; padding: 14px 32px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 12px; color: #6B7280;">
        <tr>
          <td><strong>STATUS:</strong> PENDING ATTORNEY ASSIGNMENT</td>
          <td style="text-align: right;"><strong>TRANSMITTED:</strong> ${new Date().toUTCString()}</td>
        </tr>
      </table>
    </div>

    <!-- Custom High-Legibility Data Table -->
    <div style="padding: 24px 32px 32px 32px;">
      <table style="width: 100%; border-collapse: collapse; border: 1px solid #E5E7EB; border-radius: 8px; overflow: hidden;">
        
        <!-- Driver Full Name -->
        <tr style="border-bottom: 1px solid #E5E7EB;">
          <td style="width: 35%; padding: 16px 20px; background-color: #F9FAFB; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #4B5563;">
            Driver Legal Name
          </td>
          <td style="width: 65%; padding: 16px 20px; background-color: #FFFFFF; font-size: 16px; font-weight: 700; color: #111111;">
            ${fullName}
          </td>
        </tr>

        <!-- Phone Number -->
        <tr style="border-bottom: 1px solid #E5E7EB;">
          <td style="padding: 16px 20px; background-color: #F9FAFB; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #4B5563;">
            Phone Number
          </td>
          <td style="padding: 16px 20px; background-color: #FFFFFF; font-size: 15px; font-weight: 600; color: #111111;">
            <a href="tel:${phone}" style="color: #111111; text-decoration: none;">${phone}</a>
          </td>
        </tr>

        <!-- Email Address -->
        <tr style="border-bottom: 1px solid #E5E7EB;">
          <td style="padding: 16px 20px; background-color: #F9FAFB; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #4B5563;">
            Email Address
          </td>
          <td style="padding: 16px 20px; background-color: #FFFFFF; font-size: 15px; font-weight: 600; color: #111111;">
            <a href="mailto:${email}" style="color: #E63946; text-decoration: none;">${email}</a>
          </td>
        </tr>

        <!-- Citation Number -->
        <tr style="border-bottom: 1px solid #E5E7EB;">
          <td style="padding: 16px 20px; background-color: #F9FAFB; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #4B5563;">
            Citation Number
          </td>
          <td style="padding: 16px 20px; background-color: #FFFFFF; font-size: 17px; font-weight: 800; color: #E63946; letter-spacing: 0.5px;">
            ${citation}
          </td>
        </tr>

        <!-- State Jurisdiction -->
        <tr style="border-bottom: 1px solid #E5E7EB;">
          <td style="padding: 16px 20px; background-color: #F9FAFB; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #4B5563;">
            State of Issue
          </td>
          <td style="padding: 16px 20px; background-color: #FFFFFF; font-size: 15px; font-weight: 600; color: #111111;">
            ${state}
          </td>
        </tr>

        <!-- County Jurisdiction -->
        <tr style="border-bottom: 1px solid #E5E7EB;">
          <td style="padding: 16px 20px; background-color: #F9FAFB; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #4B5563;">
            County Jurisdiction
          </td>
          <td style="padding: 16px 20px; background-color: #FFFFFF; font-size: 15px; font-weight: 600; color: #111111;">
            ${county}
          </td>
        </tr>

        <!-- Violation Category -->
        <tr style="border-bottom: 1px solid #E5E7EB;">
          <td style="padding: 16px 20px; background-color: #F9FAFB; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #4B5563;">
            Violation Category
          </td>
          <td style="padding: 16px 20px; background-color: #FFFFFF; font-size: 15px; font-weight: 600; color: #111111;">
            <span style="display: inline-block; background-color: #FEE2E2; color: #991B1B; padding: 4px 12px; border-radius: 4px; font-weight: 700; font-size: 13px;">
              ${violation}
            </span>
          </td>
        </tr>

        <!-- Attached Evidence -->
        <tr style="border-bottom: 1px solid #E5E7EB;">
          <td style="padding: 16px 20px; background-color: #F9FAFB; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #4B5563;">
            Citation Attachment
          </td>
          <td style="padding: 16px 20px; background-color: #FFFFFF; font-size: 14px; font-weight: 600; color: #111111;">
            📎 ${fileInfoText}
          </td>
        </tr>

        <!-- Incident Details & Notes -->
        <tr>
          <td style="padding: 16px 20px; background-color: #F9FAFB; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #4B5563; vertical-align: top;">
            Incident Details & Notes
          </td>
          <td style="padding: 16px 20px; background-color: #FFFFFF; font-size: 14px; line-height: 1.6; color: #374151;">
            <div style="background-color: #F9FAFB; border-left: 3px solid #E63946; padding: 12px 16px; border-radius: 4px; font-style: italic;">
              ${details.replace(/\n/g, "<br/>")}
            </div>
          </td>
        </tr>

      </table>
    </div>

    <!-- Confidentiality Footer -->
    <div style="background-color: #F9FAFB; border-top: 1px solid #E5E7EB; padding: 20px 32px; font-size: 11px; color: #9CA3AF; line-height: 1.6;">
      <p style="margin: 0 0 6px 0;"><strong>CONFIDENTIALITY NOTICE:</strong> This electronic transmission contains confidential attorney-client intake data intended solely for RouteDefense Legal Network.</p>
      <p style="margin: 0;">RouteDefense &copy; ${new Date().getFullYear()} &bull; Nationwide Traffic Defense Docketing</p>
    </div>

  </div>
</body>
</html>
`;

    // Strategy 1: Resend API (Free, 3,000 emails/month)
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      const { data, error } = await resend.emails.send({
        from: process.env.EMAIL_FROM || "RouteDefense Intake <onboarding@resend.dev>",
        to: ["routedefense@gmail.com"],
        subject: `RouteDefense Case Dossier: ${fullName} — ${citation}`,
        html: customHtml,
        attachments: attachments,
      });

      if (error) {
        console.error("Resend error:", error);
      } else {
        return NextResponse.json({ success: true, provider: "resend", id: data?.id });
      }
    }

    // Strategy 2: Gmail SMTP / Nodemailer
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASSWORD;
    if (gmailAppPassword) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER || "routedefense@gmail.com",
          pass: gmailAppPassword,
        },
      });

      const mailOptions = {
        from: `"RouteDefense Intake" <${process.env.GMAIL_USER || "routedefense@gmail.com"}>`,
        to: "routedefense@gmail.com",
        subject: `RouteDefense Case Dossier: ${fullName} — ${citation}`,
        html: customHtml,
        attachments: attachments.map((a) => ({
          filename: a.filename,
          content: a.content,
        })),
      };

      await transporter.sendMail(mailOptions);
      return NextResponse.json({ success: true, provider: "gmail_smtp" });
    }

    // Strategy 3: Fallback via FormSubmit if credentials are not yet set in environment
    const formSubmitData = new FormData();
    formSubmitData.append("_subject", `RouteDefense Case Dossier: ${fullName} — ${citation}`);
    formSubmitData.append("_captcha", "false");
    formSubmitData.append("_template", "table");
    formSubmitData.append("Driver Full Name", fullName);
    formSubmitData.append("Phone Number", phone);
    formSubmitData.append("Email Address", email);
    formSubmitData.append("Citation Number", citation);
    formSubmitData.append("State of Issue", state);
    formSubmitData.append("County Jurisdiction", county);
    formSubmitData.append("Violation Category", violation);
    formSubmitData.append("Incident Details & Notes", details);

    if (fileEntry && typeof fileEntry === "object") {
      formSubmitData.append("attachment", fileEntry as Blob);
    }

    const fsResponse = await fetch("https://formsubmit.co/routedefense@gmail.com", {
      method: "POST",
      body: formSubmitData,
    });

    if (fsResponse.ok) {
      return NextResponse.json({ success: true, provider: "formsubmit_fallback" });
    } else {
      return NextResponse.json({ success: false, error: "Submission failed" }, { status: 500 });
    }
  } catch (err: unknown) {
    console.error("Submit API error:", err);
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
