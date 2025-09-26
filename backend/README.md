# Secret Messages - Backend

1. Copy `.env.example` to `.env` and update values (including MONGODB_URI and JWT_SECRET).
2. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Start server in dev:
   ```bash
   npm run dev
   ```
4. API endpoints:
   - POST /api/auth/register { username, password }
   - POST /api/auth/login { username, password }
   - POST /api/messages/send/:userId { fromName, content }
   - GET  /api/messages/my (requires Authorization: Bearer <token>)
