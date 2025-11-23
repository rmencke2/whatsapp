# WhatsApp Business Assistant

A Next.js application for managing WhatsApp business interactions with AI-powered customer support.

## Features

- Customer onboarding and management
- FAQ management
- Service catalog
- Business hours configuration
- AI agent configuration
- Multi-language support (English, Italian)

## Tech Stack

- **Framework**: Next.js (App Router)
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Supabase
- **AI**: OpenAI
- **TypeScript**: Full type safety

## Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- PostgreSQL database
- Supabase account
- OpenAI API key

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd WhatsApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL=your_postgresql_connection_string
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Run database migrations**
   ```bash
   npm run db:migrate
   # or
   npx drizzle-kit push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/              # Next.js app router pages and API routes
│   ├── api/         # API endpoints
│   ├── dashboard/   # Dashboard pages
│   └── pricing/     # Pricing page
├── db/              # Database schema and migrations
├── lib/             # Utility functions and clients
├── data/            # Data templates and constants
├── messages/        # i18n translation files
└── drizzle/         # Drizzle migration files
```

## Database Schema

The application uses the following main tables:
- `customers` - Customer information
- `faqs` - Frequently asked questions
- `services` - Service catalog
- `hours` - Business hours
- `agent_configs` - AI agent configuration

## Development

- Run migrations: `npm run db:migrate`
- Generate migrations: `npm run db:generate`
- Type checking: `npm run type-check`
- Linting: `npm run lint`

## License

[Add your license here]

