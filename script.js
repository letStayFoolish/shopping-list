// Variables:
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearButton = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

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

function onAddItemSubmit(event) {
  event.preventDefault();
  const newItem = itemInput.value;

  // Validation

  if (newItem === '') {
    alert('Please add the item.');
    return;
  }
  // Create item DOM element:
  addItemToDOM(newItem);
  // Add item to local storage:
  addItemToLocalStorage(newItem);

  checkUI();
  itemInput.value = '';
}

function addItemToDOM(item) {
  // Create list item:
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);
  // Add items to DOM:
  itemList.appendChild(li);
}

function addItemToLocalStorage(item) {
  let itemsFromStorage;

  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }

  // Add new item to array:
  itemsFromStorage.push(item);

  // Convert to a JSON string and set to local storage:
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

// Event Deligation
function removeItem(event) {
  console.log(event.target.parentElement);
  if (event.target.parentElement.classList.contains('remove-item')) {
    if (window.confirm('Are you sure?')) {
      event.target.parentElement.parentElement.remove();

      checkUI();
    }
  }
}

function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  checkUI();
}

function filterItems(event) {
  const items = itemList.querySelectorAll('li');
  const text = event.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) !== -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

function checkUI() {
  const items = itemList.querySelectorAll('li');
  if (items.length === 0) {
    clearButton.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearButton.style.display = 'block';
    itemFilter.style.display = 'block';
  }
}

// Event Listeners
itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', removeItem);
clearButton.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);

checkUI();
