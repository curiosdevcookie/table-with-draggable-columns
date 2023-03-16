
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

//Put result of dragging and dropping action in browser session storage:
function saveTableState() {
  const table = document.querySelector('table');
  const tableState = table.innerHTML;
  sessionStorage.setItem('tableState', tableState);
  console.log('Table state saved');

  const storageOfTableState = sessionStorage.getItem('tableState');
  console.log(storageOfTableState);
}