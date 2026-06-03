import { environment } from '../../environments/environment';

/** Build a full API URL from a path like `/api/contact`. */
export function apiUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const base = environment.apiBaseUrl.replace(/\/$/, '');
  return `${base}${normalizedPath}`;
}

/** True for admin API calls (works with relative and absolute URLs). */
export function isAdminApiRequest(url: string): boolean {
  return url.includes('/api/admin');
}
