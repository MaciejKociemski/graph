// Pobranie danych z localStorage (jeśli istnieją)
var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Funkcja do zapisywania danych w localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Funkcja do dodawania nowego zadania do listy i tabeli
function addTask(taskName, startDate, endDate, color) {
  // Tworzenie nowego zadania
  var task = {
    name: taskName,
    start: startDate,
    end: endDate,
    color: color,
  };

  // Dodanie zadania do listy
  tasks.push(task);

  // Odświeżenie tabeli
  refreshTable();

  // Zapisanie danych w localStorage
  saveTasks();
}

// Funkcja do odświeżania tabeli z zadaniami
function refreshTable() {
  var tableBody = document
    .getElementById("taskTable")
    .getElementsByTagName("tbody")[0];
  tableBody.innerHTML = ""; // Wyczyszczenie aktualnej zawartości tabeli

  // Iteracja po zadaniach i dodanie ich do tabeli
  tasks.forEach(function (task) {
    var newRow = tableBody.insertRow();
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    cell1.innerHTML = task.name;
    cell2.innerHTML = task.start;
    cell3.innerHTML = task.end;
    cell4.innerHTML =
      "<div style='width: 20px; height: 20px; background-color: " +
      task.color +
      "'></div>";
  });
}

// Dodanie zdarzenia nasłuchującego na formularz
document
  .getElementById("ganttForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var taskName = document.getElementById("taskName").value;
    var startDate = document.getElementById("startDate").value;
    var endDate = document.getElementById("endDate").value;
    var color = document.getElementById("color").value;

    // Dodanie nowego zadania
    addTask(taskName, startDate, endDate, color);
  });

// Odświeżenie tabeli po załadowaniu strony
refreshTable();
