const API = 'http://localhost:10000/api';

// Usuarios
const formUsuario = document.getElementById('formUsuario');
const listaUsuarios = document.getElementById('listaUsuarios');

formUsuario.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    nombre: document.getElementById('nombreUsuario').value,
    email: document.getElementById('emailUsuario').value,
    password_hash: document.getElementById('passwordUsuario').value,
    rol: document.getElementById('rolUsuario').value
  };
  await fetch(`${API}/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  formUsuario.reset();
  cargarUsuarios();
});

async function cargarUsuarios() {
  const res = await fetch(`${API}/usuarios`);
  const usuarios = await res.json();
  listaUsuarios.innerHTML = '';
  usuarios.forEach(u => {
    const li = document.createElement('li');
    li.textContent = `${u.nombre} (${u.email})`;
    const btn = document.createElement('button');
    btn.textContent = 'Eliminar';
    btn.onclick = async () => {
      await fetch(`${API}/usuarios/${u._id}`, { method: 'DELETE' });
      cargarUsuarios();
    };
    li.appendChild(btn);
    listaUsuarios.appendChild(li);
  });
}

// Platos
const formPlato = document.getElementById('formPlato');
const listaPlatos = document.getElementById('listaPlatos');

formPlato.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    nombre: document.getElementById('nombrePlato').value,
    descripcion: document.getElementById('descripcionPlato').value,
    precio: parseFloat(document.getElementById('precioPlato').value),
    categoria: document.getElementById('categoriaPlato').value
  };
  await fetch(`${API}/platos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  formPlato.reset();
  cargarPlatos();
});

async function cargarPlatos() {
  const res = await fetch(`${API}/platos`);
  const platos = await res.json();
  listaPlatos.innerHTML = '';
  platos.forEach(p => {
    const li = document.createElement('li');
    li.textContent = `${p.nombre} - S/ ${p.precio}`;
    const btn = document.createElement('button');
    btn.textContent = 'Eliminar';
    btn.onclick = async () => {
      await fetch(`${API}/platos/${p._id}`, { method: 'DELETE' });
      cargarPlatos();
    };
    li.appendChild(btn);
    listaPlatos.appendChild(li);
  });
}

// Inicial
cargarUsuarios();
cargarPlatos();
