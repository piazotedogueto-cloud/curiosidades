const grid = document.getElementById("grid");
const q = document.getElementById("q");
const sort = document.getElementById("sort");
const dialog = document.getElementById("dialog");
const dlgTitle = document.getElementById("dlgTitle");
const dlgBody = document.getElementById("dlgBody");
const dlgClose = document.getElementById("dlgClose");

// Curiosidades
const DATA = [
  { id: "antikythera", titulo: "Mecanismo de Anticítera", resumo: "Um computador grego antigo.", conteudo: "Prevê eclipses e movimentos dos planetas.", data: "2024-06-01" },
  { id: "turritopsis", titulo: "Água-viva imortal", resumo: "Pode reverter ao estágio juvenil.", conteudo: "A Turritopsis dohrnii reinicia o ciclo de vida.", data: "2023-11-15" },
  { id: "voynich", titulo: "Manuscrito de Voynich", resumo: "Livro misterioso do século XV.", conteudo: "Língua indecifrada até hoje.", data: "2022-10-01" }
];

let state = { q: "", sort: "recent" };

function render() {
  let list = DATA.filter(d => d.titulo.toLowerCase().includes(state.q));
  if (state.sort === "az") list.sort((a,b)=>a.titulo.localeCompare(b.titulo));
  if (state.sort === "za") list.sort((a,b)=>b.titulo.localeCompare(a.titulo));
  if (state.sort === "recent") list.sort((a,b)=> new Date(b.data) - new Date(a.data));

  grid.innerHTML = "";
  list.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<h3>${item.titulo}</h3><p>${item.resumo}</p><button data-id="${item.id}">Ler mais</button>`;
    card.querySelector("button").addEventListener("click", () => openDialog(item));
    grid.appendChild(card);
  });
}

function openDialog(item) {
  dlgTitle.textContent = item.titulo;
  dlgBody.textContent = item.conteudo;
  dialog.showModal();
}
dlgClose.addEventListener("click", ()=> dialog.close());

q.addEventListener("input", ()=> { state.q = q.value.toLowerCase(); render(); });
sort.addEventListener("change", ()=> { state.sort = sort.value; render(); });

render();
