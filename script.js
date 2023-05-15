// Variables:
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearButton = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('.btn');
let isEditMode = false;

function displayItems() {
  const itemsFromStorage = getItemFromLocalStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));
  checkUI();
}
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

  // Check for edit mode:
  if (isEditMode) {
    const itemToEdit = itemList.querySelector('.edit-mode');
    removeItemFromLocalStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    isEditMode = false;
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
  const itemsFromStorage = getItemFromLocalStorage();

  // Add new item to array:
  itemsFromStorage.push(item);

  // Convert to a JSON string and set to local storage:
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemFromLocalStorage() {
  let itemsFromStorage;

  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }
  return itemsFromStorage;
}

function onClickItem(event) {
  if (event.target.parentElement.classList.contains('remove-item')) {
    removeItem(event.target.parentElement.parentElement);
  } else {
    setItemToEdit(event.target);
  }
}

function setItemToEdit(item) {
  isEditMode = true;
  itemList.querySelectorAll('li').forEach((i) => {
    i.classList.remove('edit-mode');
  });
  item.classList.add('edit-mode');
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i>  Update item';
  formBtn.style.backgroundColor = '#228B22';
  itemInput.value = item.textContent;
}
// Event Deligation
function removeItem(item) {
  if (confirm('Are you sure?')) {
    // Remove item from DOM:
    item.remove();
    // Remove item from local storage:
    removeItemFromLocalStorage(item.textContent);
    checkUI();
  }
}

function removeItemFromLocalStorage(item) {
  let itemsFromStorage = getItemFromLocalStorage();

  //Filter out item to be removed:
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  // Remove items from local storage:
  localStorage.removeItem('items');

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
  itemInput.value = '';

  const items = itemList.querySelectorAll('li');
  if (items.length === 0) {
    clearButton.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearButton.style.display = 'block';
    itemFilter.style.display = 'block';
  }

  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = '#333';
  isEditMode = flase;
}
// Initialize app:
function init() {
  // Event Listeners
  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', onClickItem);
  clearButton.addEventListener('click', clearItems);
  itemFilter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItems);

  checkUI();
}

init();
