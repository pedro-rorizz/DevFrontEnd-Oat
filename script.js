// Seletores
const recordForm = document.getElementById("recordForm");
const recordTable = document.getElementById("recordTable");
let editIndex = null; // Índice do registro em edição

// Função para carregar registros do LocalStorage
function loadRecords() {
  const records = JSON.parse(localStorage.getItem("records")) || [];
  renderTable(records);
}

// Função para renderizar a tabela
function renderTable(records) {
  recordTable.innerHTML = records
    .map(
      (record, index) => `
      <tr class="fade-in">
        <td>${index + 1}</td>
        <td>${record.name}</td>
        <td>${record.email}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="deleteRecord(${index})">Excluir</button>
        </td>
      </tr>`
    )
    .join("");
}

// Validação em tempo real
document.querySelectorAll("#recordForm input").forEach((input) => {
  input.addEventListener("input", () => {
    if (input.checkValidity()) {
      input.classList.remove("is-invalid");
    } else {
      input.classList.add("is-invalid");
    }
  });
});

// Função para adicionar ou editar um registro
recordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();

  if (name && email) {
    const records = JSON.parse(localStorage.getItem("records")) || [];

    // Verifica se o email já existe no LocalStorage (para novos registros)
    if (editIndex === null && records.some((record) => record.email === email)) {
      alert("Este email já está cadastrado! Por favor, use outro.");
      return;
    }

    if (editIndex !== null) {
      // Atualiza registro existente
      records[editIndex] = { name, email };
      editIndex = null;
    } else {
      // Adiciona novo registro
      records.push({ name, email });
    }

    localStorage.setItem("records", JSON.stringify(records));
    loadRecords();
    recordForm.reset();
  }
});

// Função para excluir um registro
function deleteRecord(index) {
  const records = JSON.parse(localStorage.getItem("records")) || [];
  records.splice(index, 1);
  localStorage.setItem("records", JSON.stringify(records));
  loadRecords();
}

// Carregar registros ao inicializar
loadRecords();
