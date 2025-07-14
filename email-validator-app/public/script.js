const campos = ['email', 'placa', 'cpf', 'matricula', 'campus'];

campos.forEach((campo) => {
  const input = document.getElementById(campo);
  const resultado = document.getElementById(`res${capitalize(campo)}`);

  input.addEventListener('input', async () => {
    const valor = input.value;

    const response = await fetch('/validar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ campo, valor })
    });

    const data = await response.json();

    if (data.valido) {
      resultado.textContent = '✅ Válido';
      resultado.classList.remove('text-danger');
      resultado.classList.add('text-success');
    } else {
      resultado.textContent = '❌ Inválido';
      resultado.classList.remove('text-success');
      resultado.classList.add('text-danger');
    }
  });
});

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
