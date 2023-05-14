// Variables:
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearButton = document.getElementById('clear');

function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

function addItem(event) {
  event.preventDefault();
  const newItem = itemInput.value;

  // Validation

  if (newItem === '') {
    alert('Please add the item.');
    return;
  }

  // Create list item:
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem));

  const button = createButton('remove-tem btn-link text-red');
  li.appendChild(button);

  itemList.appendChild(li);

  itemInput.value = '';
}
// Event Deligation
function removeItem(event) {
  if (event.target.parentElement.classList.contains('remove-item')) {
    event.target.parentElement.parentElement.remove();
  }
}

function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
}

// Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearButton.addEventListener('click', clearItems);
