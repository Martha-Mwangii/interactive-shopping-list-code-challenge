// Selecting  DOM Elements by their ids
/*Selects the input field element by its id 'item-input' 
//where the user can type in the name of the item they want to add to the shopping list.*/
const inputField = document.getElementById("item-input");
/* Selects the 'Add' button element by its id 'add-btn'
where the user clicks the button to add an item that's on the input field to the shopping list.*/
const addButton = document.getElementById("add-btn");
/* Selects the 'Clear List' button element by its id 'clear-btn'
when the user clicks the button it clears the entire shopping list*/
const clearButton = document.getElementById("clear-btn");
/*Selects the 'Mark Purchased' button element by its id 'purchased-btn'
when the user clicks the button all items in the shopping list get marked as purchased*/
const markPurchasedButton = document.getElementById("purchased-btn");
/*Selecting the shopping list container by its id 'shopping-list'
This is the  element that holds the actual list of items in the shopping list.*/
const shoppingList = document.getElementById("shopping-list");

// Loads the items that were on the list from local storage
let items = JSON.parse(localStorage.getItem("shoppingList")) || [];

// Add Item Function
function addItem() {
    const itemText = inputField.value.trim();//removes any extra spaces at the start or end and stores the clean result

    if (itemText) {
        items.push({ name: itemText, purchased: false });
        inputField.value = "";//Ensures that the input field is empty, ready for the user to add another item 
        updateList();//Ensures that the displayed shopping list always matches the current state of the list
        saveToLocalStorage();//ensures the current state of the shopping list is stored in the browser's localStorage
    } else {
        alert("Empty! Please enter an item.");//pops up this error message when one adds an empty item
    }
}

// Update List Function
function updateList() {
    shoppingList.innerHTML = ""; // Clears the current list

    items.forEach((item, index) => {
        const listItem = document.createElement("li");// creates a new list Item for the shopping list  
        listItem.className = "list-item";//useful for styling in the CSS
        if (item.purchased) listItem.classList.add("purchased");//checks status of the list item and acts accordingly(css)

        // Item Text
        const itemSpan = document.createElement("span");//creates an inline container that styles small pieces of text 
        itemSpan.textContent = item.name;//ensures only the plain text is inserted as the item neme
        itemSpan.className = "item-text";//assign the styling defined in the CSS file

        // Button Group (Edit and Delete)
        //create a container that group together ("Edit" and "Delete")buttons for each shopping list item
        //Wrapping the buttons in a <div> makes it easier to manage them as a group
        const buttonGroup = document.createElement("div");
        buttonGroup.className = "button-group";// styles and organizes the buttons

        // Edit Button
        //creates an "Edit" button for each item in the  list and sets up functionality for when the user clicks the button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";//Sets the text content of the button as "Edit"
        editButton.className = "edit-btn";//allows me to apply specific styles to the button(css)
        editButton.addEventListener("click", () => editItem(index));//allows the editItem function know which item in the list is being edited once clicked

        // Delete Button
        //creates a "Delete" button for each item in the  list and sets up functionality for when the user clicks the button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.addEventListener("click", () => deleteItem(index));

        // Add the buttons to the buttonGroup
        buttonGroup.appendChild(editButton);
        buttonGroup.appendChild(deleteButton);

        // Adds elements to the list item i.e (append)ensures the changes happen
        //listItem represents each individual shopping list item e.g., "OMO"
        listItem.appendChild(itemSpan);
        listItem.appendChild(buttonGroup);

        // Add toggle purchased functionality
        //The function changes the purchased state of the item by toggling it between true and false.
        //i.e when clicked the item will appear visually as purchased (or unpurchased) in the UI accordingly
        listItem.addEventListener("click", () => togglePurchased(index));

        //Adds the listItem element  to the shoppingList container.
        shoppingList.appendChild(listItem);
    });
}

// Toggle Purchased Function which allows users to individually mark items as purchased or not purchased
//i.e gives the effect of crossing over(line-through) for purchased and vice versa when clicked
function togglePurchased(index) {
    items[index].purchased = !items[index].purchased;//changes the status from purchased to not purchased or vice versa
    updateList();//refreshs the display so the user can see the updated status
    saveToLocalStorage();//stores the updated state of the list in the browser,i.e for persistance
}

// Edit Item Function with Validation
function editItem(index) {
    const newItem = prompt("Edit item:", items[index].name);
//the if else statement checks whether item is empty,if it's not it gets saved and is stored,else user is alerted to give a valid input
    if (newItem !== null) {
        const trimmedItem = newItem.trim();
        if (trimmedItem) {
            items[index].name = trimmedItem;
            updateList();
            saveToLocalStorage();
        } else {
            alert("Item cannot be empty. Please enter a valid item.");// pops up to inform user when the list is empty
        }
    }
}

// Delete Item Function
function deleteItem(index) {
    //(index) specifies the position of the item you want to remove from the array.
    //The second argument (1) tells splice() how many items to remove (1)starting from the index ,in this case (1,1) splice deletes the second item
    items.splice(index, 1);
    updateList();
    saveToLocalStorage();
}

// Clear List Function
function clearList() {
    //If user confirm (click "OK"), the list clearing process proceeds; otherwise, it is canceled i.e list isn't cleared
    if (confirm("This will clear the entire list!")) {//Allows the user to make a choice before proceeding hence prevents accidental deletion of all the items
        items = [];// sets items to an empty array hence deleting/clearing the existing array i.e empty both on the UI and in localStorage
        updateList();//updates the UI to reflect  that the shopping list is now empty
        saveToLocalStorage();//saves the current (empty) state of the items array to localStorage
    }
}

/* Mark All as Purchased Function
The function loops through every item in the items array and sets their purchased property to true
 i.e marks all items as purchased regardless of current status*/
function markPurchased() {
    items.forEach(item => (item.purchased = true));
    // Updates the list display and saves the changes to localStorage
    updateList();
    saveToLocalStorage();
}

/*function markPurchased() {
    // Selects all the list items
    const listItems = document.querySelectorAll('.list-item');

    // Loops through each list item and marks it as purchased
    listItems.forEach(item => {
        item.classList.add('purchased'); // Add the 'purchased' class to mark it visually(css styling purpose)
        const index = Array.from(listItems).indexOf(item); // Get the index of the current item
        items[index].purchased = true; // Mark the corresponding item in the array as purchased
    });
    // Updates the list display and save to localStorage
    updateList();
    saveToLocalStorage();
}*/


/*responsible for saving the current state of the shopping list to the browser's 
localStorage so it can persist across page reloads and session*/
//localStorage is a web API provided by browsers to allow web applications to store data in the user's browser
function saveToLocalStorage() {
    //JSON.stringify() converts the items array into a JSON string making it possible to store the data in local storage under the name shopping list
    localStorage.setItem("shoppingList", JSON.stringify(items));
}

// Event Listeners
//When the "Add" button is clicked, it calls the addItem() function to add the item to the list
addButton.addEventListener("click", addItem);
//When the "Clear List" button is clicked, it calls the clearList() function to clear all the items on the shopping list.
clearButton.addEventListener("click", clearList);
// When the "Mark Purchased" button is clicked, it calls the markPurchased() function to mark all items on the list as purchased.
markPurchasedButton.addEventListener("click", markPurchased);

// Enables the Enter Key to Add an Item
inputField.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addItem();
    }
});

// Ensure the UI(user interface) is updated with the current state of the list
updateList();

