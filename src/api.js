const base = '/api';

export async function apiGet(path, opts = {}) {
  const res = await fetch(base + path, { credentials: 'include', ...opts });
  if (!res.ok) throw await res.json().catch(() => ({ message: res.statusText }));
  return res.json();
}
export async function apiPost(path, body, opts = {}) {
  const res = await fetch(base + path, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw await res.json().catch(() => ({ message: res.statusText }));
  return res.json();
}