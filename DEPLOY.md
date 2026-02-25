# Landscaper Jordan Portal - SaaS Deployment

## Prerequisites

1. **Google Cloud Platform Account** with billing enabled
2. **Supabase Project** created
3. **Docker** installed locally

## Setup Steps

### 1. Supabase Setup

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note your project URL and anon key
3. Run the schema in `supabase/schema.sql` in the Supabase SQL Editor:
   ```bash
   # In Supabase Dashboard > SQL Editor
   ```

### 2. Environment Variables

Create `.env.local` in the `app` directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Local Development

```bash
cd app
npm install
npm run dev
```

Visit http://localhost:3000

### 4. Build Docker Image

```bash
cd app
docker build -t landscaper-jordan .
```

### 5. Deploy to Google Cloud Run

#### Option A: gcloud CLI

```bash
# Configure Google Cloud
gcloud auth login
gcloud config set project your-project-id

# Enable required APIs
gcloud services enable cloudrun.googleapis.com containerregistry.googleapis.com

# Tag image for Container Registry
docker tag landscaper-jordan gcr.io/your-project-id/landscaper-jordan

# Push to Google Container Registry
docker push gcr.io/your-project-id/landscaper-jordan

# Deploy to Cloud Run
gcloud run deploy landscaper-jordan \
  --image gcr.io/your-project-id/landscaper-jordan \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co,NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
```

#### Option B: Google Cloud Console

1. Go to Cloud Run in Google Cloud Console
2. Create a new service
3. Select your container image
4. Configure port: 3000
5. Add environment variables
6. Deploy

### 6. Custom Domain (Optional)

1. Go to Cloud Run > Domain Mappings
2. Add your custom domain
3. Update DNS records as instructed

## Features

- **Multi-role authentication**: Owner, Crew, Client
- **Dashboard**: Overview of jobs, crew, revenue
- **Jobs Management**: Create, track, complete jobs
- **Client Management**: Track clients, LTV, notes
- **Crew Management**: Track workers, hours, pay
- **Calendar**: View scheduled jobs
- **Invoices**: Create and track invoices
- **Finances**: Revenue and expense tracking
- **Route Map**: Job routing visualization
- **Dark Mode**: Toggle light/dark theme
- **Responsive**: Works on mobile and desktop

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Deployment**: Google Cloud Run
- **Icons**: Lucide React
