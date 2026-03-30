const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

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

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL;

  try {
    if (apiKey && toEmail) {
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolyo <onboarding@resend.dev>",
          to: [toEmail],
          reply_to: email,
          subject: subject
            ? `[Portfolyo] ${subject}`
            : `[Portfolyo] ${name} mesaj gonderdi`,
          html: `
            <h3>Yeni iletisim formu mesaji</h3>
            <p><strong>Isim:</strong> ${String(name)}</p>
            <p><strong>E-posta:</strong> ${String(email)}</p>
            <p><strong>Konu:</strong> ${subject ? String(subject) : "-"}</p>
            <p><strong>Mesaj:</strong></p>
            <p>${String(message).replace(/\n/g, "<br>")}</p>
          `,
        }),
      });

      if (!resendRes.ok) {
        const errBody = await resendRes.text();
        console.error("Resend API error:", resendRes.status, errBody);
        return jsonResponse(
          { success: false, error: "E-posta gonderilemedi." },
          500
        );
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
