# Setup Instructions for Other Laptop

## Step 1: Clone the Repository

```bash
# Navigate to where you want the project
cd ~/projects  # or your preferred location

# Clone the repository
git clone git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git WhatsApp
cd WhatsApp
```

**Note:** Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name.

## Step 2: Open in Cursor

### Method 1: From Terminal
```bash
# From the project directory
cursor .
```

### Method 2: From Cursor UI
1. Open Cursor application
2. Go to **File → Open Folder** (or **File → Open** on Windows)
3. Navigate to and select the `WhatsApp` folder you just cloned

## Step 3: Install Dependencies

```bash
# Make sure you're in the project directory
npm install
# or
yarn install
# or
pnpm install
```

## Step 4: Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
DATABASE_URL=your_postgresql_connection_string
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
OPENAI_API_KEY=your_openai_api_key
```

## Step 5: Run Database Migrations

```bash
npm run db:migrate
# or
npx drizzle-kit push
```

## Step 6: Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Troubleshooting

- **If `cursor` command not found**: You may need to install Cursor's command line tools from Cursor settings
- **If git clone fails**: Make sure you have SSH keys set up with GitHub, or use HTTPS: `git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git`
- **If dependencies fail**: Make sure you have Node.js 18+ installed (`node --version`)
