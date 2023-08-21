const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearbtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formbtn = itemForm.querySelector('button');
let isEditMode = false;
function displayItems(){
  const itemsFromStorage = getItemFromStorage();
  itemsFromStorage.forEach((item) => addItemToDom(item));
}

function onAddItemSubmit(e) {
  e.preventDefault();
  const newItem = itemInput.value;
  //vLid input
  if (newItem === '') {
    alert('enter some value');

    return;
  }

 // create list item
  addItemToDom(newItem);

  //add item to local storage
  addItemToStorage(newItem);
  checkUI();
  itemInput.value = '';
}
function addItemToDom(item){
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));
  const button = createButton('remove-item btn-link text-red');
  // const icon = createIcon('fa-solid fa-xmark');
  li.appendChild(button);
  itemList.appendChild(li);
}

function addItemToStorage(item){
  const itemsFromStorage = getItemFromStorage();

 
  itemsFromStorage.push(item);
 localStorage.setItem('items', JSON.stringify(itemsFromStorage));

}

function getItemFromStorage(){

  let itemsFromStorage;
  if(localStorage.getItem('items')=== null){

    itemsFromStorage = [];

  }
  else{
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }
  return itemsFromStorage;
}
function onClickItem(e){
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  }
else{
  setItemToEdit(e.target);
}
}
function setItemToEdit(item){
  isEditMode  =  true;
item.classList.add('edit-mode');
formbtn.innerHTML = '<i class="fa-solid fa-pen"></i>  Update Item';

formbtn.style.backgroundColor = '#2228B22';
itemInput.value = item.textContent;
}
function clearAll() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  localStorage.removeItem('items');
  checkUI();
}

function removeItem(item) {
if(confirm('are you sure?')){
  //remove from dom
  item.remove();
//remove item from storage
removeItemFromStorage(item.textContent);
checkUI();
}
}
function removeItemFromStorage(item){
 let itemsFromStorage =  getItemFromStorage();
 // filter out item to remvoe
 itemsFromStorage = itemsFromStorage.filter((i)=> i!== item);

 // reset to local storage
 localStorage.setItem('items', JSON.stringify(itemsFromStorage));
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

function filterItems(e) {
  const items = itemList.querySelectorAll('li');
  const text = e.target.value.toLowerCase();
  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLocaleLowerCase();

    if(itemName.indexOf(text) != -1){
     item.style.display = 'flex';
     
    }
    else{
      item.style.display = 'none';
    }
  });
}



function checkUI() {
  const items = itemList.querySelector('li');
  if (items.length === 0) {
    clearbtn.style.display = 'none';
    itemFilter.style.display = 'none';
  }
  else {
    clearbtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }
}
itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', onClickItem);
clearbtn.addEventListener('click', clearAll);
itemFilter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded',displayItems);