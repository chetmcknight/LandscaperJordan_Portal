<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase" alt="Supabase">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript">
</div>

<br>

<p align="center">
  <a href="https://landscaperjordan.com">
    <img src="https://img.shields.io/badge/🌿-Landscaper_Jordan-2D6A4F" height="48" alt="Landscaper Jordan">
  </a>
</p>

<h1 align="center">Landscaper Jordan Portal</h1>

<p align="center">
  A beautiful, modern SaaS application for landscaping business management. Manage jobs, clients, crew, and finances all in one place.
</p>

<br>

## ✨ Features

### 👤 Multi-Role Access
- **Owner** - Full access to all features, settings, and data
- **Crew** - View assigned jobs, track time, view routes
- **Client** - View appointments and invoices

### 📊 Dashboard
- Today's schedule overview
- Active crew status
- Revenue metrics (MTD)
- Client statistics
- Quick actions

### 💼 Job Management
- Create and track jobs
- Status tracking (Scheduled → In Progress → Completed)
- Assign crew members
- Job checklists
- Notes and sensitive client info

### 👥 Client Management
- Client directory with search
- Lifetime value (LTV) tracking
- Outstanding balance monitoring
- Contact information
- Private notes (only visible to owner)

### 👷 Crew Management
- Worker profiles with roles
- Hour tracking (daily/weekly)
- Pay rate management
- YTD wages
- Status tracking (Active/Break/Idle)

### 📅 Calendar
- Monthly job view
- Visual job density
- Quick date navigation

### 💰 Invoices
- Invoice creation and tracking
- Status management (Unpaid/Paid/Overdue)
- Payment recording
- Outstanding totals

### 💵 Finances
- Income vs Expenses
- Net profit calculation
- Expense categorization
- Revenue by client visualization

### 🗺️ Route Map
- Job stop ordering
- Distance estimation
- Navigation integration

### 🎨 Modern UI
- Beautiful, clean design
- Responsive (mobile + desktop)
- Dark mode support
- Smooth animations

<br>

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | Next.js 15, React 18 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Icons | Lucide React |
| Deployment | Google Cloud Run |

<br>

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Google Cloud account (for deployment)

### Local Development

```bash
# Clone the repository
git clone https://github.com/chetmcknight/LandscaperJordan_Portal.git
cd LandscaperJordan_Portal/app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Database Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run `supabase/schema.sql` in the Supabase SQL Editor
3. Add your Supabase URL and anon key to `.env.local`

<br>

## ☁️ Deployment

### Google Cloud Run

```bash
# Build the Docker image
docker build -t landscaper-jordan .

# Deploy to Cloud Run
gcloud run deploy landscaper-jordan \
  --image landscaper-jordan \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars NEXT_PUBLIC_SUPABASE_URL=your-url,NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
```

See [DEPLOY.md](./DEPLOY.md) for detailed deployment instructions.

<br>

## 📱 Screenshots

<p align="center">
  <img src="https://placehold.co/800x500/2D6A4F/white?text=Dashboard" alt="Dashboard" width="48%">
  <img src="https://placehold.co/800x500/2D6A4F/white?text=Jobs" alt="Jobs" width="48%">
</p>

<p align="center">
  <img src="https://placehold.co/800x500/2D6A4F/white?text=Clients" alt="Clients" width="48%">
  <img src="https://placehold.co/800x500/2D6A4F/white?text=Crew" alt="Crew" width="48%">
</p>

<br>

## 📄 License

MIT License - feel free to use this for your own landscaping business!

<br>

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/chetmcknight">chetmcknight</a>
</p>
