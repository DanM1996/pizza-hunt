// setting up the indexDB connection process
// create variable to hold db connection
let db;
// establish a connection to IndexedDB database called 'pizza_hunt' and set it to version 1
const request = indexedDB.open('pizza_hunt', 1);

// runs when a database with more data is stored, in essence upgrading from version 1 to 2
request.onupgradeneeded = function(event) {
    // save a reference to the database
    const db = event.target.result;
    // create an object store (table) called 'new_pizza', set it to have an auto incrementing primary key of sorts
    db.createObjectStore('new_pizza', { autoIncrement: true });
};

// when the connection is successful
request.onsuccess = function(event) {
    // when database is sucessfully created with its object store(table) (from upgrade event above) or simply established a connection, save reference to db in global variable 
    db = event.target.result;

    // check if app is online, if yes run uploadPizza() function to send all local db data to api
    if (navigator.online) {
        // we haven't created this yet, but we will soon
        // uploadPizza();
    }
};

request.onerror = function(event) {
    // log the error
    console.log(event.target.errorCode);
}

// data being sent to the indexDB database
// this function will be executed if we attempt to submit a new pizza and there's no internet connection
function saveRecord(record) {
    // open a new transaction with the database with read and write permissions
    const transaction = db.transaction(['new_pizza'], 'readwrite');
    
    // access the object store for 'new_pizza'
    const pizzaObjectStore = transaction.objectStore('new_pizza');

    // add record(new data) to your store with add method
    pizzaObjectStore.add(record);
}