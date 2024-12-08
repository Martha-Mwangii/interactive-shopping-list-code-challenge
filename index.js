// Select DOM Elements
const inputField = document.getElementById("item-input");
const addButton = document.getElementById("add-btn");
const clearButton = document.getElementById("clear-btn");
const markPurchasedButton = document.getElementById("purchased-btn");
const shoppingList = document.getElementById("shopping-list");

// Loads the items from local storage
let items = JSON.parse(localStorage.getItem("shoppingList")) || [];

// Add Item Function
function addItem() {
    const itemText = inputField.value.trim();//removes any extra spaces at the start or end and stores the clean result

    if (itemText) {
        items.push({ name: itemText, purchased: false });
        inputField.value = "";//Ensures that the input field is empty, ready for the user to add another item 
        updateList();
        saveToLocalStorage();
    } else {
        alert("Empty! Please enter an item.");
    }
}

// Update List Function
function updateList() {
    shoppingList.innerHTML = ""; // Clears the current list

    items.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.className = "list-item";
        if (item.purchased) listItem.classList.add("purchased");

        // Item Text
        const itemSpan = document.createElement("span");
        itemSpan.textContent = item.name;
        itemSpan.className = "item-text";

        // Button Group (Edit and Delete)
        const buttonGroup = document.createElement("div");
        buttonGroup.className = "button-group";

        // Edit Button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit-btn";
        editButton.addEventListener("click", () => editItem(index));

        // Delete Button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.addEventListener("click", () => deleteItem(index));

        buttonGroup.appendChild(editButton);
        buttonGroup.appendChild(deleteButton);

        // Append elements to the list item
        listItem.appendChild(itemSpan);
        listItem.appendChild(buttonGroup);

        // Add toggle purchased functionality
        listItem.addEventListener("click", () => togglePurchased(index));

        shoppingList.appendChild(listItem);
    });
}

// Toggle Purchased Function
function togglePurchased(index) {
    items[index].purchased = !items[index].purchased;
    updateList();
    saveToLocalStorage();
}

// Edit Item Function with Validation
function editItem(index) {
    const newItem = prompt("Edit item:", items[index].name);

    if (newItem !== null) {
        const trimmedItem = newItem.trim();
        if (trimmedItem) {
            items[index].name = trimmedItem;
            updateList();
            saveToLocalStorage();
        } else {
            alert("Item cannot be empty. Please enter a valid item.");
        }
    }
}

// Delete Item Function
function deleteItem(index) {
    items.splice(index, 1);
    updateList();
    saveToLocalStorage();
}

// Clear List Function
function clearList() {
    if (confirm("This will clear the entire list!")) {//Allows the user to make a choice before proceeding.
        items = [];
        updateList();
        saveToLocalStorage();
    }
}

// Mark All as Purchased Function
function markPurchased() {
    items.forEach(item => (item.purchased = true));
    updateList();
    saveToLocalStorage();
}

/*responsible for saving the current state of the shopping list to the browser's 
localStorage so it can persist across page reloads and session*/
function saveToLocalStorage() {
    localStorage.setItem("shoppingList", JSON.stringify(items));
}

// Event Listeners
addButton.addEventListener("click", addItem);
clearButton.addEventListener("click", clearList);
markPurchasedButton.addEventListener("click", markPurchased);

// Enables the Enter Key to Add an Item
inputField.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addItem();
    }
});

// Ensure the UI(user interface) is updated with the current state of the list
updateList();

