# Interactive Shopping List
This Interactive Shopping List webpage allows users to add, edit, delete, and mark items as purchased. The app uses localStorage, so your items are saved across page reloads. The webpage has a user interface with buttons for adding items, clearing the list, marking all items as purchased, and editing or deleting individual items.The Mark Purchased is used for marking all the items but if one needs to mark individual items they click on the item itself.
## Features
    Add Button: Adds new items to the shopping list.
    Edit Button: Edit any item that has been added to the list.
    Delete Button: Removes individual items from the list.
    Mark Purchased Button: Marks all items as purchased (they get crossed out).
    Clear List Button: Clears items on the entire shopping list.
    Persistent Data: All items are saved to localStorage hence save the list even after the page reloads. 
### index.html
Defines the structure of the webpage and includes:
    A header (<h1>) with the title "Shopping List".
    An input field and "Add" button for adding new items to the list.
    A list (<ul>) where items are displayed.
    Buttons for "Mark Purchased" and "Clear List".
    A script tag that links it to the index.js file that handles the interactivity.
### styles.css
This file contains all the styling for the shopping list webpage,including:
    General layout and design for the body and container.
    Styles for the input field, buttons, and list items.
    Styles for the purchased items (crossed-out text) and interactive buttons.
    Hover effects for buttons,improving the user experience.
### index.js
This JavaScript file handles the functionality of the shopping list webpage. It contains:
    Variables for DOM elements such as the input field, buttons, and the shopping list.
    Functions to add, edit, delete, and toggle items as purchased.
    A function to save the shopping list to localStorage so it persists across page reloads.
    Event listeners for user interactions such as clicking the "Add", "Clear", and "Mark Purchased" buttons, as well as pressing the "Enter" key.

 ## Prerequisites
 Install  node js  on your machine 
 Clone the repository (git clone git@github.com:......git <--the ssh code -->)
 A modern webbrowser is required to run the code(e.g Google Chrome)
 Run the html file using Visual Studio live server

 ## Author:Martha Mwangi
 If you encounter any issues with the code or need assistance, kindly reach out through:
 email ..<marthawanguimwangi4@gmail.com> 
 contact ..<+254745418529>

 ## License
 MIT License

 Copyright (c) 2024 Martha-Mwangii