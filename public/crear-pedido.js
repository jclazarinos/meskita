const API = 'https://meskita-so86.onrender.com//api';

let pedidoItems = [];
const platosContainer = document.getElementById('platosContainer');
const listaPedido = document.getElementById('listaPedido');
const totalPedido = document.getElementById('totalPedido');

async function cargarPlatos() {
  try {
    const res = await fetch(`${API}/platos`);
    const platos = await res.json();

    platosContainer.innerHTML = '';

    platos.forEach(plato => {
      const card = document.createElement('div');
      card.className = 'plato-card';

      const info = document.createElement('div');
      info.innerHTML = `<strong>${plato.nombre}</strong><br>S/. ${plato.precio}`;

      const btn = document.createElement('button');
      btn.textContent = 'Agregar';
      btn.onclick = () => agregarAlPedido(plato);

      card.appendChild(info);
      card.appendChild(btn);
      platosContainer.appendChild(card);
    });
  } catch (error) {
    console.error('Error cargando platos:', error);
  }
}

function agregarAlPedido(plato) {
  pedidoItems.push({
    plato_id: plato._id,
    nombre: plato.nombre,
    precio: plato.precio,
    cantidad: 1,
    observaciones: ''
  });
  renderPedido();
}

function renderPedido() {
  listaPedido.innerHTML = '';
  let total = 0;

  pedidoItems.forEach(item => {
    const div = document.createElement('div');
    div.className = 'pedido-item';
    div.textContent = `${item.nombre} - S/. ${item.precio}`;
    listaPedido.appendChild(div);
    total += item.precio;
  });

  totalPedido.textContent = total.toFixed(2);
}

document.getElementById('enviarPedidoBtn').addEventListener('click', async () => {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  if (!usuario) {
    return alert('Debes iniciar sesión.');
  }

  const itemsFormateados = pedidoItems.map(item => ({
    plato_id: item.plato_id,
    cantidad: item.cantidad,
    observaciones: item.observaciones
  }));

  const res = await fetch(`${API}/pedidos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      mozo_id: usuario._id,
      items: itemsFormateados
    })
  });

  if (res.ok) {
    alert('Pedido enviado con éxito');
    pedidoItems = [];
    renderPedido();
  } else {
    alert('Error al enviar pedido');
  }
});

cargarPlatos();
