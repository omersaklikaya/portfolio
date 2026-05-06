const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

/** @type {{ runtime?: string; maxDuration?: number }} */
export const config = {
  runtime: "nodejs",
  maxDuration: 30,
};

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Resend reply_to: plain email or "Name <email>" — no < > in display name */
function sanitizeReplyDisplayName(n) {
  const s = String(n).replace(/[\r\n<>"]/g, " ").trim();
  return s.slice(0, 100) || "Ziyaretci";
}

function isValidEmail(s) {
  const v = String(s).trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return jsonResponse({ success: false, error: "Gecersiz istek." }, 400);
  }

  const { name, email, subject, message } = data || {};

  if (!name || !email || !message) {
    return jsonResponse(
      { success: false, error: "Ad, e-posta ve mesaj zorunludur." },
      400
    );
  }

  const replyEmail = String(email).trim();
  if (!isValidEmail(replyEmail)) {
    return jsonResponse(
      { success: false, error: "Gecerli bir e-posta adresi girin." },
      400
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL;

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = subject ? escapeHtml(subject) : "";
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

  try {
    if (apiKey && toEmail) {
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "CodeGrid <onboarding@resend.dev>",
          to: [toEmail],
          reply_to: `${sanitizeReplyDisplayName(name)} <${replyEmail}>`,
          subject: subject
            ? `CodeGrid — ${String(subject)}`
            : `CodeGrid — ${String(name)} mesaj gönderdi`,
          html: `
            <h3>Yeni iletisim formu mesaji</h3>
            <p><strong>Isim:</strong> ${safeName}</p>
            <p><strong>E-posta:</strong> ${safeEmail}</p>
            <p><strong>Konu:</strong> ${subject ? safeSubject : "-"}</p>
            <p><strong>Mesaj:</strong></p>
            <p>${safeMessage}</p>
          `,
        }),
      });

      if (!resendRes.ok) {
        const errBody = await resendRes.text();
        console.error("Resend API error:", resendRes.status, errBody);
        const short =
          errBody.length > 400 ? errBody.slice(0, 400) + "…" : errBody;
        return jsonResponse(
          {
            success: false,
            error: "E-posta gonderilemedi.",
            resendStatus: resendRes.status,
            resendDetail: short,
          },
          500
        );
      }

      // Auto confirmation email to sender
      const confirmRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "CodeGrid <onboarding@resend.dev>",
          to: [replyEmail],
          subject: "Mesajınızı aldık — CodeGrid",
          html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;max-width:600px;width:100%;">
          
          <!-- Header -->
          <tr>
            <td style="background:#111111;padding:32px 40px;">
              <span style="font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">
                Code<span style="color:#E84B1A;">Grid</span>
              </span>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <p style="margin:0 0 16px;font-size:16px;color:#111111;">Merhaba <strong>${safeName}</strong>,</p>
              <p style="margin:0 0 24px;font-size:16px;color:#444444;line-height:1.6;">
                Mesajınızı aldık. En kısa sürede size dönüş yapacağız — genellikle <strong>24 saat içinde</strong> yanıt veriyoruz.
              </p>

              <!-- Divider -->
              <hr style="border:none;border-top:1px solid #eeeeee;margin:24px 0;">

              <!-- Mesaj özeti -->
              <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#E84B1A;letter-spacing:0.08em;text-transform:uppercase;">Gönderdiğiniz mesaj</p>
              <p style="margin:0 0 8px;font-size:14px;color:#666666;"><strong>Konu:</strong> ${subject ? safeSubject : "-"}</p>
              <p style="margin:0;font-size:14px;color:#666666;line-height:1.6;background:#f9f9f9;padding:16px;border-left:3px solid #E84B1A;border-radius:0 4px 4px 0;">
                ${safeMessage}
              </p>

              <!-- Divider -->
              <hr style="border:none;border-top:1px solid #eeeeee;margin:24px 0;">

              <p style="margin:0;font-size:14px;color:#888888;line-height:1.6;">
                Bu mail otomatik olarak gönderilmiştir. Doğrudan yanıtlayabilirsiniz.<br>
                <strong style="color:#111111;">CodeGrid Ekibi</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#111111;padding:24px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#666666;">
                © 2025 CodeGrid · İstanbul, Türkiye
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
          `,
        }),
      });

      if (!confirmRes.ok) {
        const errBody = await confirmRes.text();
        console.error("Resend confirm email error:", confirmRes.status, errBody);
      }
    } else {
      console.log("New contact message (no email config):", {
        name,
        email,
        subject,
        message,
      });
    }

    return jsonResponse({ success: true }, 200);
  } catch (err) {
    console.error(err);
    return jsonResponse(
      { success: false, error: "Sunucu hatasi, tekrar deneyin." },
      500
    );
  }
}
