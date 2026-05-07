const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';

export const fetcher = async (url, options = {}) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const res = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'API Error');
  }
  return res.json();
};
