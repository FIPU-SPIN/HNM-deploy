// Centralized API base URL for the backend (Express server).
// Override per-environment via NEXT_PUBLIC_API_URL in .env.local
// (e.g. NEXT_PUBLIC_API_URL=https://api.example.com). Falls back to the
// local dev server on port 5000.
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default API_URL;
