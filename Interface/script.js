document.addEventListener("DOMContentLoaded", () => {
  const cepInput = document.getElementById("cep");
  const erroCep = document.getElementById("erro-cep");

  cepInput.addEventListener("blur", async () => {
    const cep = cepInput.value.trim();
    if (cep.length !== 8 || isNaN(cep)) {
      erroCep.textContent = "CEP inválido. Deve conter 8 números.";
      return;
    }

    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const dados = await resposta.json();

      if (dados.erro) {
        erroCep.textContent = "CEP não encontrado.";
        limparCamposEndereco();
      } else {
        erroCep.textContent = "";
        document.getElementById("endereco").value = dados.logradouro;
        document.getElementById("bairro").value = dados.bairro;
        document.getElementById("cidade").value = dados.localidade;
        document.getElementById("estado").value = dados.uf;
      }
    } catch (erro) {
      erroCep.textContent = "Erro ao buscar CEP.";
    }
  });

  function limparCamposEndereco() {
    document.getElementById("endereco").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("estado").value = "";
  }
});
