// Variables:
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {fa-solid fa-xmark
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
// Event Listeners
itemForm.addEventListener('submit', addItem);
