const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function sendJson(res, statusCode, payload) {
  res.status(statusCode).setHeader("Content-Type", "application/json");
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });
  res.send(JSON.stringify(payload));
}

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") {
    Object.entries(corsHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return sendJson(res, 405, { success: false, error: "Method Not Allowed" });
  }

  try {
    const { name, email, subject, message } = req.body || {};

    if (!name || !email || !message) {
      return sendJson(res, 400, {
        success: false,
        error: "Ad, e-posta ve mesaj zorunludur.",
      });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL;

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
          subject: subject ? `[Portfolyo] ${subject}` : `[Portfolyo] ${name} mesaj gönderdi`,
          html: `
            <h3>Yeni iletisim formu mesaji</h3>
            <p><strong>Isim:</strong> ${name}</p>
            <p><strong>E-posta:</strong> ${email}</p>
            <p><strong>Konu:</strong> ${subject || "-"}</p>
            <p><strong>Mesaj:</strong></p>
            <p>${String(message).replace(/\n/g, "<br>")}</p>
          `,
        }),
      });

      if (!resendRes.ok) {
        const errBody = await resendRes.text();
        console.error("Resend API error:", resendRes.status, errBody);
        return sendJson(res, 500, {
          success: false,
          error: "E-posta gonderilemedi.",
        });
      }
    } else {
      console.log("New contact message (no email config):", {
        name,
        email,
        subject,
        message,
      });
    }

    return sendJson(res, 200, { success: true });
  } catch (err) {
    console.error(err);
    return sendJson(res, 500, {
      success: false,
      error: "Sunucu hatasi, tekrar deneyin.",
    });
  }
};
