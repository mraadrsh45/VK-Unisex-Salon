// Vercel Serverless Function: api/admin-login.js

export default function handler(req, res) {
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
    const { username, password } = req.body;

    const ADMIN_USER = process.env.ADMIN_USERNAME;
    const ADMIN_PASS = process.env.ADMIN_PASSWORD;

    if (!ADMIN_USER || !ADMIN_PASS) {
      console.error("ADMIN_USERNAME or ADMIN_PASSWORD environment variables are not set.");
      return res.status(500).json({
        success: false,
        message: "Authentication service is not properly configured."
      });
    }

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      // Create a mock token
      const mockToken = `vk_salon_jwt_${Buffer.from(username).toString('base64')}_${Date.now()}`;
      return res.status(200).json({
        success: true,
        token: mockToken,
        message: "Authentication successful"
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid administrator credentials"
    });
  } catch (error) {
    console.error("Login endpoint error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}
