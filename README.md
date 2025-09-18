# Secret Messages — Fullstack App (React + Node + MongoDB)

This repository contains a full-stack secret-messages app:
- **Backend**: Node.js + Express + MongoDB (Mongoose). Deploy to **Render**.
- **Frontend**: React (Vite) + TailwindCSS + Framer Motion. Deploy to **Vercel**.

Features
- User registration & login (JWT).
- Dashboard where users receive secret messages.
- Each user gets a unique shareable link (e.g. `/send/<linkId>`) friends can use to send secret messages.
- Suggestion modal for the friend to sign up as well.
- Responsive design, modern animations, ready for deployment on free plans.

## Setup (local)

### Backend
1. `cd backend`
2. Copy `.env.example` to `.env` and fill values (MONGO_URI, JWT_SECRET, CLIENT_URL).
3. `npm install`
4. `npm run dev` (uses nodemon)

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

## Deploy
- Backend: create a Render web service (Node) and set environment variables from `.env`.
- Frontend: deploy on Vercel (point to frontend directory). Set environment variable `VITE_API_URL` to your backend URL.

See `docs/deploy.md` for more details.

