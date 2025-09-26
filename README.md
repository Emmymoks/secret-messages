# Secret Messages - Full Stack

This repo contains a simple full-stack "Secret Messages" app:
- Backend: Node/Express + MongoDB (Mongoose)
- Frontend: React (Vite) + Tailwind + Framer Motion
- DB: MongoDB Atlas (connection string provided in .env.example).

Folders:
- backend/ - server and API
- frontend/ - React app

Quick start (locally):

1. Backend:
   - Copy backend/.env.example -> backend/.env and set values (MONGODB_URI, JWT_SECRET)
   - Install & run:
     ```bash
     cd backend
     npm install
     npm run dev
     ```

2. Frontend:
   - Copy frontend/.env.example -> frontend/.env (set VITE_API_URL to your backend URL)
   - Install & run:
     ```bash
     cd frontend
     npm install
     npm run dev
     ```

Deployment hints:
- Backend: Render (free plan) — create a new Web Service, connect to GitHub, set build command `npm install` and start command `npm start`. Set env vars on Render (MONGODB_URI, JWT_SECRET, FRONTEND_URL).
- Frontend: Vercel — import the frontend folder, build command `npm run build`, publish directory `dist`. Set environment variable `VITE_API_URL` to your backend's public URL.

Security note: The `.env.example` contains the MongoDB connection string that was supplied; consider rotating credentials before putting the project in a public repository.

Enjoy!

