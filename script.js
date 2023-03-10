const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sNome = document.querySelector('#m-nome');
const sFuncao = document.querySelector('#m-funcao');
const sSalario = document.querySelector('#m-salario');
const btnSalvar = document.querySelector('#btnSalvar');

let itens;
let id;

function openModal(edit = false, index = 0) { //abrir o modal na tela
    modal.classList.add('active');

    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
            modal.classList.remove('active') //se clicar fora do modal, ele fecha
        };
    };

  if (edit) { //atribuindo os valores
    sNome.value = itens[index].nome
    sFuncao.value = itens[index].funcao
    sSalario.value = itens[index].salario
    id = index
  } else {
    sNome.value = ''
    sFuncao.value = ''
    sSalario.value = ''
    };
  
};

function editItem(index) { // quando for editar, abre o modal novamente.

    openModal(true, index);
};

function deleteItem(index) { //deletando um cadastro do array, pelo indice, inserido na criação
    itens.splice(index, 1);
    setItensBD();
    loadItens();
};

function insertItem(item, index) { //adicionando o novo cadastro na tela.
    let tr = document.createElement('tr');

    tr.innerHTML = `
        <td>${item.nome}</td>
        <td>${item.funcao}</td>
        <td>R$ ${item.salario}</td>
        <td class="acao">
        <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
        </td>
        <td class="acao">
        <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
        </td>
     `; // criando elemento que será inserido na tela
    
    tbody.appendChild(tr); //inserindo na tela os elemntos acima, via variavel
}

btnSalvar.onclick = e => {
  
    if (sNome.value == '' || sFuncao.value == '' || sSalario.value == '') { // se for vazio os campos, ele faz validação nativa
        return
    };

    e.preventDefault(); //evitando que o click no botão mande diretamente a ação.

    if (id !== undefined) { //criar os dados se as areas forem diferentes de indefinido ou vazio.
        itens[id].nome = sNome.value;
        itens[id].funcao = sFuncao.value;
        itens[id].salario = sSalario.value;
    } else {
        itens.push({ 'nome': sNome.value, 'funcao': sFuncao.value, 'salario': sSalario.value });
    };

    setItensBD();

    modal.classList.remove('active'); //assim que o modal for finalziado, ele já recarrega os itens ou atualiza
    loadItens();
    id = undefined;
};

function loadItens() { //carregar itens
  itens = getItensBD() //pegando cada item do BD
  tbody.innerHTML = ''
    itens.forEach((item, index) => {
        insertItem(item, index)
    });

};

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []; // Pega os elementos no BD(localStorage), se não encontrar, retonar um array vazio
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens)); //Seta os dadoss para o BD

loadItens(); // Carregar os itens