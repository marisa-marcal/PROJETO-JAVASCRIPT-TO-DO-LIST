
const getBanco = () => JSON.parse(localStorage.getItem('list')) ?? [];

const setBanco = (bancoDeDados) => localStorage.setItem('list', JSON.stringify(bancoDeDados)); 

const AdicionarNovoItem = (tarefa, status, indice) => {
  const newItem = document.createElement('label');
  newItem.classList.add("item");
  newItem.innerHTML=`
    <input type="checkbox" ${status} data-indice=${indice}>
    <div>${tarefa}</div>
    <input type="button" value="X" data-indice=${indice}>
  `
  document.getElementById("list").appendChild(newItem);
}

const limparItensDaTela = () => {
  const lista = document.getElementById('list');
  while (lista.firstChild) {
    lista.removeChild(lista.lastChild);
  }
}

const salvarItensNaTela = () => {
  limparItensDaTela();
  const bancoDeDados = getBanco();
  bancoDeDados.forEach((newItem, indice) => AdicionarNovoItem(newItem.tarefa, newItem.status, indice));
}

const acrescentarItemAoBanco = (evento) => {
  const tecla = evento.key;
  const texto = evento.target.value;
  if (tecla === 'Enter') {
    if (evento.target.value === '') {
      alert("Digite algo!");
    } else {
      const bancoDeDados = getBanco();
      bancoDeDados.push({'tarefa': texto, 'status': ''});
      setBanco(bancoDeDados);
      salvarItensNaTela();
      evento.target.value = '';
    }
  }
}

const removerItem = (indice) => {
  const bancoDeDados = getBanco();
  bancoDeDados.splice(indice, 1);
  setBanco(bancoDeDados);
  salvarItensNaTela();
}

const atualizarItem = (indice) => {
  const bancoDeDados = getBanco();
  bancoDeDados[indice].status = bancoDeDados[indice].status === '' ? 'checked' : '';
  setBanco(bancoDeDados);
  salvarItensNaTela();
}

const clickItem = (evento) => {
  const elemento = evento.target;
  if (elemento.type === "button") {
    const indice = elemento.dataset.indice;
    removerItem(indice)
  } else if (elemento.type === "checkbox") {
    const indice = elemento.dataset.indice;
    atualizarItem(indice);
  }
}

document.getElementById('novo-item').addEventListener("keypress", acrescentarItemAoBanco);
document.getElementById('list').addEventListener("click", clickItem);

salvarItensNaTela();
