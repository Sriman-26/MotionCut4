const id = (x) => {
    return document.getElementById(x);
};

let input = id('input');
let addBtn = id('add_btn');
let listContainer = id('item_list_container');
let itemList = localStorage.itemList ? JSON.parse(localStorage.itemList) : [];

const renderList = () => {
    listContainer.innerHTML = ``;
    for (let i = itemList.length - 1; i >= 0; i--) {
        listContainer.innerHTML += `
            <div class="list-item">
                <div class="item-name">
                    ${itemList[i].name}
                </div>
                <div class="item-actions">
                    <button onclick="editItem(${i})">EDIT</button>
                    <button onclick="deleteItem(${i})">DEL</button>
                    <button onclick="toggleComplete(${i})">${itemList[i].completed ? 'Complete' : 'InComplete'}</button>
                </div>
            </div>
        `;
    }
};

const addEvent = () => {
    let value = input.value;
    if (value.length > 0) {
        itemList.push({ name: value, completed: false });
        input.value = "";
    } else {
        alert("Please specify a name for your task");
    }
    localStorage.itemList = JSON.stringify(itemList);
    renderList();
};

const deleteItem = (index) => {
    let item = itemList[index];
    if (item != undefined) {
        itemList.splice(index, 1);
        localStorage.itemList = JSON.stringify(itemList);
        renderList();
    } else {
        alert("Item has already been deleted.");
    }
};

const editItem = (index) => {
    let item = itemList[index];
    if (item != undefined) {
        let ask = prompt(`Change "${item.name}" to : `);
        if (ask.length > 0) {
            itemList[index].name = ask;
            localStorage.itemList = JSON.stringify(itemList);
            renderList();
        }
    } else {
        alert("Item not available in list.");
    }
};

const toggleComplete = (index) => {
    let item = itemList[index];
    if (item != undefined) {
        item.completed = !item.completed;
        localStorage.itemList = JSON.stringify(itemList);
        renderList();
    }
};

addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addEvent();
});

renderList();