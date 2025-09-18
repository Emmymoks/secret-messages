# Deployment notes

## Backend (Render)
- Create a new Web Service on Render.
- Connect to your repository and choose the `backend` folder.
- Set the start command: `npm start`
- Add environment variables (MONGO_URI, JWT_SECRET, CLIENT_URL).
- Use the free tier.

## Frontend (Vercel)
- Import the project on Vercel and set the root directory to `frontend`.
- Set environment variable `VITE_API_URL` to the backend URL (e.g., https://your-backend.onrender.com).
- Build command: `npm run build`
- Output directory: `dist`

