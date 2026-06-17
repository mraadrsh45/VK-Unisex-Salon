# V.K Unisex Salon 💇‍♂️💅✨

A premium, luxury salon web application built to deliver an exquisite styling experience, seamless online ritual reservations, and a robust admin management console.

🚀 **Live Site:** [https://vk-unisex-salon.vercel.app](https://vk-unisex-salon.vercel.app)

---

## 🌟 Key Features

*   **Luxury Ambiance UI/UX:** Crafted with custom dark-mode aesthetics, elegant typography (Playfair Display & Outfit), subtle gold gradients, glassmorphism components, and smooth page transitions powered by `Framer Motion`.
*   **Seamless Booking Ritual:** Guests can reserve appointment slots online via an elegant scheduling interface.
*   **Instant Notifications:** Integrates with the **Resend API** to deliver rich HTML booking confirmation emails to both guests and the salon management team.
*   **WhatsApp Concierge:** Direct integration with WhatsApp to request bespoke accommodations or quick consultations.
*   **Before/After Transformative Gallery:** Showcase before and after photos of signature treatments (Balayage, Keratin, and styling).
*   **Secure Admin Management Dashboard:** An elegant, password-protected admin panel to view, search, filter, approve/reject bookings, manage services, publish seasonal coupons, and moderate client reviews.

---

## 🛠️ Technology Stack

*   **Frontend:** React, Vite, Tailwind CSS, Framer Motion, React Icons, React Hot Toast
*   **Serverless APIs:** Vercel Edge Serverless Functions (Node.js)
*   **Email Engine:** Resend API
*   **SEO:** Customized React Helmet-based SEO helper with specific metadata per route.

---

## 📂 Project Structure

```text
├── api/                  # Vercel Serverless Functions (API endpoints)
│   ├── admin-login.js    # Handles secure administrator authentication
│   └── send-email.js     # Manages confirmation email dispatches via Resend
├── public/               # Static assets & webp graphics
├── src/
│   ├── components/       # Reusable React components (GlassCard, BookingModal, etc.)
│   ├── context/          # Application state (AppContext, AdminContext)
│   ├── pages/            # Core views (Home, About, Services, Gallery, AdminPanel)
│   ├── utils/            # SEO helpers & shared utilities
│   ├── App.jsx           # Main routing & layout controller
│   └── index.css         # Global design tokens and animations
├── vercel.json           # Vercel deployment and URL routing rules
└── package.json          # Node dependencies & build scripts
```

---

## ⚙️ Environment Configuration

To successfully host this application, create a `.env` file (or set up Environment Variables in your Vercel Dashboard) with the following values:

```env
# Resend Email Integration
RESEND_API_KEY=re_your_api_key_here
OWNER_EMAIL=salon_owner_email@domain.com
SENDER_EMAIL=onboarding@resend.dev  # Or your custom verified sending domain

# Admin Panel Credentials
ADMIN_USERNAME=servicesmaster12
ADMIN_PASSWORD=Vksaloon@415263
```

---

## 🚀 Getting Started Locally

### 1. Clone & Install Dependencies
```bash
# Clone the repository
git clone https://github.com/mraadrsh45/VK-Unisex-Salon.git
cd VK-Unisex-Salon

# Install package dependencies
npm install
```

### 2. Configure Local Settings
Create a `.env` file in the root folder and add the environment variables listed above.

### 3. Launch Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 🌐 Deployment & Hosting on Vercel

This repository is optimized for quick, zero-config hosting on [Vercel](https://vercel.com):

1. **Import the Project:** Connect your GitHub account and import `VK-Unisex-Salon`.
2. **Add Environment Variables:** Expand the *Environment Variables* section during setup and paste your `.env` keys.
3. **Deploy:** Vercel will automatically detect Vite and deploy your serverless functions under `/api/*`. Every commit pushed to `main` will trigger a new deployment automatically.
