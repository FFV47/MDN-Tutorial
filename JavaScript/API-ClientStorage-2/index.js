// Create needed constants
const list = document.querySelector("ul");
const noteSection = document.querySelector(".note-display");
/** @type {HTMLInputElement} */
const titleInput = document.querySelector("#title");
/** @type {HTMLInputElement} */
const bodyInput = document.querySelector("#body");
const form = document.querySelector("form");
/** @type {HTMLButtonElement} */
// const submitBtn = document.querySelector("form button");

/** @type {IDBDatabase} */
let db;

window.onload = () => {
	let request = window.indexedDB.open("notes_db");

	// If the database doesn't already exist, it is created by the open operation, then an 'onupgradeneeded' event is triggered and you create the database schema in the handler for this event.
	request.onupgradeneeded = (e) => {
		db = e.target.result;

		let objectStore = db.createObjectStore("notes_os", {
			keyPath: "id",
			autoIncrement: true,
		});

		objectStore.createIndex("title", "title", { unique: false });
		objectStore.createIndex("body", "body", { unique: false });

		console.log("Database setup complete");
	};

	request.onerror = () => {
		noteSection.innerHTML = "";
		const dbAlert = document.createElement("h2");
		dbAlert.textContent = "Database failed to open";
		noteSection.appendChild(dbAlert);
		console.log("Database failed to open");
	};

	request.onsuccess = () => {
		db = request.result;

		displayData();

		console.log("Database opened successfully");
	};

	// runs before onsuccess handler

	form.addEventListener("submit", addData);

	function addData(e) {
		e.preventDefault();

		let newItem = { title: titleInput.value, body: bodyInput.value };

		// open a read/write db transaction, ready for adding the data
		let trans = db.transaction("notes_os", "readwrite");

		// call an object store that's already been added to the database
		let objectStore = trans.objectStore("notes_os");

		let request = objectStore.add(newItem);

		request.onsuccess = function () {
			titleInput.value = "";
			bodyInput.value = "";
		};

		// Report on the success of the transaction completing, when everything is done
		trans.oncomplete = function () {
			console.log("Transaction completed: database modification finished.");

			// update the display of data to show the newly added item, by running displayData() again.
			displayData();
		};

		trans.onerror = function () {
			console.log("Transaction not opened due to error");
		};
	}

	function displayData() {
		// Here we empty the contents of the list element each time the display is updated
		// If you didn't do this, you'd get duplicates listed each time a new note is added
		while (list.firstChild) {
			list.removeChild(list.firstChild);
		}

		// Open our object store and then get a cursor - which iterates through all the
		// different data items in the store
		let objectStore = db.transaction("notes_os").objectStore("notes_os");
		objectStore.openCursor().onsuccess = function (e) {
			// Get a reference to the cursor
			let cursor = e.target.result;

			// If there is still another data item to iterate through, keep running this code
			if (cursor) {
				// Create a list item, h3, and p to put each data item inside when displaying it
				// structure the HTML fragment, and append it inside the list
				const listItem = document.createElement("li");
				const h3 = document.createElement("h3");
				const para = document.createElement("p");

				listItem.appendChild(h3);
				listItem.appendChild(para);
				list.appendChild(listItem);

				// Put the data from the cursor inside the h3 and para
				h3.textContent = cursor.value.title;
				para.textContent = cursor.value.body;

				// Store the ID of the data item inside an attribute on the listItem, so we know
				// which item it corresponds to. This will be useful later when we want to delete items
				listItem.setAttribute("data-note-id", cursor.value.id);

				// Create a button and place it inside each listItem
				const deleteBtn = document.createElement("button");
				listItem.appendChild(deleteBtn);
				deleteBtn.textContent = "Delete";

				// Set an event handler so that when the button is clicked, the deleteItem()
				// function is run
				deleteBtn.onclick = deleteItem;

				// Iterate to the next item in the cursor
				cursor.continue();
			} else {
				// Again, if list item is empty, display a 'No notes stored' message
				if (!list.firstChild) {
					const listItem = document.createElement("li");
					listItem.textContent = "No notes stored.";
					list.appendChild(listItem);
				}
				// if there are no more cursor items to iterate through, say so
				console.log("Notes all displayed");
			}
		};
	}

	// Define the deleteItem() function
	function deleteItem(e) {
		// retrieve the name of the task we want to delete. We need
		// to convert it to a number before trying it use it with IDB; IDB key
		// values are type-sensitive.
		let noteId = Number(e.target.parentNode.getAttribute("data-note-id"));

		// open a database transaction and delete the task, finding it using the id we retrieved above
		let transaction = db.transaction("notes_os", "readwrite");
		let objectStore = transaction.objectStore("notes_os");
		objectStore.delete(noteId);

		// report that the data item has been deleted
		transaction.oncomplete = function () {
			// delete the parent of the button
			// which is the list item, so it is no longer displayed
			e.target.parentNode.parentNode.removeChild(e.target.parentNode);
			console.log("Note " + noteId + " deleted.");

			// Again, if list item is empty, display a 'No notes stored' message
			if (!list.firstChild) {
				let listItem = document.createElement("li");
				listItem.textContent = "No notes stored.";
				list.appendChild(listItem);
			}
		};
	}
};
