const API = 'https://meskita-so86.onrender.com//api';

// Registro
document.getElementById('formRegister').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    nombre: document.getElementById('regNombre').value,
    email: document.getElementById('regEmail').value,
    password_hash: document.getElementById('regPassword').value,
    rol: document.getElementById('regRol').value
  };
  const res = await fetch(`${API}/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (res.ok) {
    alert('Registrado con éxito. Ahora inicia sesión.');
    document.getElementById('formRegister').reset();
  } else {
    alert('Error al registrarse');
  }
});

// Login
document.getElementById('formLogin').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const res = await fetch(`${API}/usuarios`);
  const usuarios = await res.json();

  const user = usuarios.find(u => u.email === email && u.password_hash === password);

  if (user) {
    localStorage.setItem('usuario', JSON.stringify(user));
    window.location.href = 'dashboard.html';
  } else {
    alert('Credenciales inválidas');
  }
});
