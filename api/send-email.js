// Vercel Serverless Function: api/send-email.js

export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { name, email, mobile, service, date, time, notes } = req.body;

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const SENDER_EMAIL = process.env.SENDER_EMAIL || "onboarding@resend.dev";
    const OWNER_EMAIL = process.env.OWNER_EMAIL || "info@vksalon.com";

    if (!RESEND_API_KEY) {
      console.warn("RESEND_API_KEY is not defined. Email transmission bypassed.");
      return res.status(200).json({
        success: true,
        message: "Email dispatch simulated successfully (Missing API Key).",
        data: req.body
      });
    }

    // 1. Mail to Salon Owner
    const ownerHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0b0b0b; border: 1px solid #c5a028; border-radius: 10px; color: #ffffff;">
        <h2 style="color: #d4af37; border-bottom: 1px solid #333; padding-bottom: 10px; font-family: 'Georgia', serif;">New Salon Reservation</h2>
        <p style="font-size: 15px; color: #cccccc;">A new luxury ritual appointment has been booked online:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 8px 0; color: #d4af37; font-weight: bold; width: 150px;">Guest Name:</td>
            <td style="padding: 8px 0; color: #ffffff;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #d4af37; font-weight: bold;">Mobile:</td>
            <td style="padding: 8px 0; color: #ffffff;"><a href="tel:${mobile}" style="color: #ffffff; text-decoration: none;">${mobile}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #d4af37; font-weight: bold;">Email:</td>
            <td style="padding: 8px 0; color: #ffffff;"><a href="mailto:${email}" style="color: #ffffff; text-decoration: none;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #d4af37; font-weight: bold;">Selected Service:</td>
            <td style="padding: 8px 0; color: #ffffff;">${service}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #d4af37; font-weight: bold;">Date & Time:</td>
            <td style="padding: 8px 0; color: #d4af37;">${date} at ${time}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #d4af37; font-weight: bold; vertical-align: top;">Special Notes:</td>
            <td style="padding: 8px 0; color: #cccccc; font-style: italic;">${notes || 'None'}</td>
          </tr>
        </table>
        
        <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #333; text-align: center; font-size: 12px; color: #555;">
          V.K Salon Automation Hub • Vercel Edge Serverless
        </div>
      </div>
    `;

    const ownerMailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: `V.K Salon Concierge <${SENDER_EMAIL}>`,
        to: OWNER_EMAIL,
        subject: `[New Appointment] ${name} - ${service}`,
        html: ownerHtml
      })
    });

    // 2. Mail to Customer
    const customerHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0b0b0b; border: 1px solid #c5a028; border-radius: 10px; color: #ffffff;">
        <h2 style="color: #d4af37; text-align: center; border-bottom: 1px solid #333; padding-bottom: 15px; font-family: 'Georgia', serif; letter-spacing: 2px;">V.K SALON</h2>
        <p style="font-size: 15px; color: #cccccc; text-align: center;">Dear <strong>${name}</strong>, your styling reservation is confirmed.</p>
        
        <div style="background-color: #121212; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 3px solid #d4af37;">
          <p style="margin: 5px 0; font-size: 14px; color: #888;">Treatment:</p>
          <p style="margin: 0; font-size: 16px; color: #ffffff; font-weight: bold;">${service}</p>
          
          <p style="margin: 15px 0 5px 0; font-size: 14px; color: #888;">Reserved Date & Time:</p>
          <p style="margin: 0; font-size: 16px; color: #d4af37; font-weight: bold;">${date} at ${time}</p>
          
          <p style="margin: 15px 0 5px 0; font-size: 14px; color: #888;">Salon Address:</p>
          <p style="margin: 0; font-size: 14px; color: #ffffff;">123 Gold Luxury Arcade, Platinum Plaza, Bandra West, Mumbai</p>
        </div>
        
        <p style="font-size: 13px; color: #888; text-align: center; line-height: 1.6;">
          If you need to reschedule or have any special requests, please call us at +91 98765 43210 or text our concierge on WhatsApp.
        </p>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px solid #333; font-size: 12px; color: #555;">
          We look forward to styling you.<br>V.K Salon Team
        </div>
      </div>
    `;

    let customerMailSuccess = false;
    // Resend's free tier (onboarding@resend.dev) can only send emails to the owner.
    // If SENDER_EMAIL is the default onboarding, we do not attempt to send to client
    // since it will bounce and return a 400 bad request, unless the developer has verified the customer email.
    if (SENDER_EMAIL !== "onboarding@resend.dev") {
      try {
        const custMailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            from: `V.K Salon <${SENDER_EMAIL}>`,
            to: email,
            subject: `Your Reservation at V.K Salon is Confirmed`,
            html: customerHtml
          })
        });
        if (custMailResponse.ok) customerMailSuccess = true;
      } catch (err) {
        console.error("Error sending email to customer:", err);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Emails processed.",
      ownerNotification: ownerMailResponse.ok,
      customerConfirmation: customerMailSuccess
    });
  } catch (error) {
    console.error("Email API endpoint error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during email dispatch"
    });
  }
}
