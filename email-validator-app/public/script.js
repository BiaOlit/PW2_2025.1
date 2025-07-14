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
      resultado.classList.add('valid-feedback');
      resultado.classList.remove('invalid-feedback');
      input.classList.add('valid');
      input.classList.remove('invalid');
    } else {
      resultado.textContent = '❌ Inválido';
      resultado.classList.add('invalid-feedback');
      resultado.classList.remove('valid-feedback');
      input.classList.add('invalid');
      input.classList.remove('valid');
    }
  });
});

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
