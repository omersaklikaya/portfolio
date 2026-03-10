exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, error: 'Method Not Allowed' }),
    };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const { name, email, subject, message } = data;

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: 'Ad, e-posta ve mesaj zorunludur.' }),
      };
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL;

    if (apiKey && toEmail) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Portfolyo <onboarding@resend.dev>',
          to: [toEmail],
          reply_to: email,
          subject: subject ? `[Portfolyo] ${subject}` : `[Portfolyo] ${name} mesaj gönderdi`,
          html: `
            <h3>Yeni iletişim formu mesajı</h3>
            <p><strong>İsim:</strong> ${name}</p>
            <p><strong>E-posta:</strong> ${email}</p>
            <p><strong>Konu:</strong> ${subject || '—'}</p>
            <p><strong>Mesaj:</strong></p>
            <p>${String(message).replace(/\n/g, '<br>')}</p>
          `,
        }),
      });

      if (!res.ok) {
        const errBody = await res.text();
        console.error('Resend API error:', res.status, errBody);
        return {
          statusCode: 500,
          body: JSON.stringify({ success: false, error: 'E-posta gönderilemedi.' }),
        };
      }
    } else {
      console.log('New contact message (no email config):', { name, email, subject, message });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: 'Sunucu hatası, tekrar deneyin.' }),
    };
  }
};
