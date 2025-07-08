const API_URL = '/api';

function saveToken(token) {
  localStorage.setItem('hai_token', token);
}

function getToken() {
  return localStorage.getItem('hai_token');
}

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + getToken()
  };
}

function logout() {
  localStorage.removeItem('hai_token');
  window.location.href = 'login.html';
}

async function login(email, password) {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    saveToken(data.token);
    return { success: true };
  } catch (err) {
    return { error: err.message };
  }
}

async function register(name, email, password) {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');
    saveToken(data.token);
    return { success: true };
  } catch (err) {
    return { error: err.message };
  }
}

// On protected pages, redirect if not authenticated
if (window.location.pathname.endsWith('dashboard.html')) {
  if (!getToken()) {
    window.location.href = 'login.html';
  }
}