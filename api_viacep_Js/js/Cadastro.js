'use strict';

const limpaTela=(endereco)=>{
document.getElementById('endereco').value="";
document.getElementById('bairro').value="";
document.getElementById('cidade').value="";
document.getElementById('estado').value="";
}

const preencherForm=(endereco)=>{
document.getElementById('endereco').value=endereco.logradouro;
document.getElementById('bairro').value=endereco.bairro;
document.getElementById('cidade').value=endereco.localidade;
document.getElementById('estado').value=endereco.estado;
}

const isNumber=(numero)=>/^[0-9]+$/.test(numero);

const cepValido=(cep)=>cep.length==8 && isNumber(cep);
const pesquisaCep= async()=>{
    limpaTela();
    const cep=document.getElementById('cep').value;
    console.log(cep);
    const url=`http://viacep.com.br/ws/${cep}/json/`;
    if(cepValido(cep)){

        const dados= await fetch(url);
        const endereco= await dados.json();
        if (endereco.hasOwnProperty('erro')) {
            Swal.fire({
                icon:'error',
                title:'Erro!',
                text: 'CEP inválido!'
            });
        }else{
            preencherForm(endereco);
        }
    }else{
        Swal.fire({
                icon:'error',
                title:'Erro!',
                text: 'CEP incorreto!'
            });
    }

}
document.getElementById('cep').addEventListener('focusout',pesquisaCep);

//enviar os dados do formulario para a API rh_tech

const cadastraFuncionario=async()=>{
    const funcionario={
        nome:document.getElementById('nome').value,
        email:document.getElementById('email').value,
        senha:document.getElementById('senha').value,
        cep:document.getElementById('cep').value,
        endereco:document.getElementById('endereco').value,
        numero:document.getElementById('numero').value,
        bairro:document.getElementById('bairro').value,
        cidade:document.getElementById('cidade').value,
        estado:document.getElementById('estado').value
    };
    
    try {
        const resposta = await fetch("http://localhost:8080/funcionarios", {
            method: "POST",
            headers:{
                "Content-Type":"Application/json"
            },
            body: JSON.stringify(funcionario)
        });

        if (resposta.ok) {
            Swal.fire({
                icon:'success',
                title: 'sucesso!',
                text: 'Cadastro realizado com sucesso.'
            });
        }else{
            Swal.fire({
                icon:'error',
                title:'Erro!',
                text: 'Falha ao cadastrar o funcionário. Verifique os dados.'
            });
        }
    } catch (error) {
        Swal.fire({
                icon:'error',
                title:'Erro de conexão!',
                text: 'Falha ao conectar com à API.'
            });
            console.log(error)
    }
}
