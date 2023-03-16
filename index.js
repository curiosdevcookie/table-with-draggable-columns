
// This is a simple example of how to make a table with draggable columns:

let dragSource = null;
let dropTarget = null;

const ths = document.querySelectorAll('th');
ths.forEach(th => {
  th.addEventListener('dragstart', handleDragStart);
  th.addEventListener('dragover', handleDragOver);
  th.addEventListener('drop', handleDrop);
  th.addEventListener('dragend', handleDragEnd);
});

function handleDragStart(event) {
  dragSource = event.target;
}

function handleDragOver(event) {
  event.preventDefault();
  dropTarget = event.target;
}

function handleDrop(event) {
  event.preventDefault();
  const sourceIndex = dragSource.cellIndex;
  const targetIndex = dropTarget.cellIndex;
  const tableRows = document.querySelectorAll('tbody tr');

  const sourceTH = dragSource;
  const targetTH = dropTarget;
  const temp = document.createElement('div');
  sourceTH.parentNode.insertBefore(temp, targetTH);
  sourceTH.parentNode.insertBefore(targetTH, sourceTH);
  sourceTH.parentNode.insertBefore(sourceTH, temp);
  sourceTH.parentNode.removeChild(temp);

  tableRows.forEach(row => {
    const cells = row.querySelectorAll('td');
    const sourceCell = cells[sourceIndex];
    const targetCell = cells[targetIndex];
    const temp = document.createElement('div');
    row.insertBefore(temp, targetCell);
    row.insertBefore(targetCell, sourceCell);
    row.insertBefore(sourceCell, temp);
    row.removeChild(temp);
  });

}

function handleDragEnd(event) {
  dragSource = null;
  dropTarget = null;
}

// Session Storage:
function saveTableStateSessionStorage() {
  const table = document.querySelector('table');
  const tableState = table.innerHTML;
  sessionStorage.setItem('tableState', tableState);
  console.log(tableState);
}
function createTableSessionStorage() {

  const newOrderSessionStorage = document.getElementById('newOrderSessionStorage');
  const table = document.createElement('table');
  table.innerHTML = sessionStorage.getItem('tableState');
  newOrderSessionStorage.appendChild(table);
}

// Local Storage:
function saveTableStateLocalStorage() {
  const table = document.querySelector('table');
  const tableState = table.innerHTML;
  localStorage.setItem('tableState', tableState);
  console.log(tableState);
}

function createTableLocalStorage() {
  const newOrderLocalStorage = document.getElementById('newOrderLocalStorage');
  const table = document.createElement('table');
  table.innerHTML = localStorage.getItem('tableState');
  const newOrderTable = newOrderLocalStorage.appendChild(table);
  // console.log(newOrderTable);

  persistElement();
}

createTableLocalStorage();

function persistElement() {
  //Serialize the table:
  const persistedElement = document.querySelector('table').outerHTML;

  //Save the serialized table to local storage:
  localStorage.setItem('persistedElement', persistedElement);

  //Retrieve the serialized table from local storage:
  const retrievedElement = localStorage.getItem('persistedElement');

  tempElement = document.createElement("div");
  tempElement.innerHTML = retrievedElement;

  //Append the retrieved table to the DOM:
  newOrderLocalStorage.appendChild(tempElement.firstChild);

}





