# Setup Instructions for Other Laptop

## Option 1: Push from This Laptop (Current)

1. **Create GitHub repository:**
   - Go to https://github.com/new
   - Name it (e.g., "WhatsApp" or "whatsapp-business-assistant")
   - **Don't** initialize with README, .gitignore, or license
   - Click "Create repository"

2. **Push to GitHub:**
   ```bash
   cd /Users/rmencke/projects/WhatsApp
   git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

3. **On your other laptop, clone it:**
   ```bash
   cd ~/projects  # or wherever you keep projects
   git clone git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git WhatsApp
   cd WhatsApp
   ```

4. **Open in Cursor:**
   ```bash
   cursor .
   ```
   Or open Cursor and use File > Open Folder, then select the WhatsApp directory.

---

## Option 2: Push from Other Laptop (If Network Issues Here)

1. **Copy the project to the other laptop:**
   - Use USB drive, cloud storage, or network transfer
   - Copy the entire `/Users/rmencke/projects/WhatsApp` folder

2. **On the other laptop:**
   ```bash
   cd ~/path/to/copied/WhatsApp
   git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

3. **Then clone it fresh (optional, for clean setup):**
   ```bash
   cd ~/projects
   git clone git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git WhatsApp
   cd WhatsApp
   ```

4. **Open in Cursor:**
   ```bash
   cursor .
   ```

---

## After Cloning on Other Laptop

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

2. **Set up environment variables:**
   Create `.env.local` file:
   ```env
   DATABASE_URL=your_postgresql_connection_string
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   OPENAI_API_KEY=your_openai_api_key
   ```

3. **Run database migrations (if needed):**
   ```bash
   npm run db:migrate
   # or
   npx drizzle-kit push
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   Navigate to http://localhost:3000

---

## Opening in Cursor

**Method 1: Command Line**
```bash
cd ~/path/to/WhatsApp
cursor .
```

**Method 2: GUI**
1. Open Cursor application
2. File > Open Folder (or Cmd+O on Mac, Ctrl+O on Windows/Linux)
3. Navigate to and select the WhatsApp directory
4. Click "Open"

**Method 3: Drag & Drop**
- Drag the WhatsApp folder onto the Cursor icon in your dock/taskbar

