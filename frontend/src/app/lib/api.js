// Centralized API base URL for the backend (Express server).
// Requests go through the Next.js proxy (see rewrites in next.config.js),
// so the browser never talks to port 5000 directly.
export const API_URL = "/api";

export default API_URL;