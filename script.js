// Initialize app once the HTML document has fully loaded
document.addEventListener("DOMContentLoaded", init);

// Main initialization function
function init() {
    // Select DOM elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // ---- Load tasks from Local Storage on startup ----
    loadTasks();

    // Function to add a new task
    // If taskText is provided, it means we are loading from Local Storage
    function addTask(taskText = null, suppressAlert = false) {
        // If no taskText passed, get text from input
        const text = taskText !== null ? taskText : taskInput.value.trim();

        // Validate
        if (text === "") {
            if (!suppressAlert) alert("Please enter a task.");
            return;
        }

        // Create the list item <li>
        const li = document.createElement("li");
        li.textContent = text;

        // Create remove button
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn");

        // Remove task from DOM + Local Storage
        removeBtn.onclick = function () {
            taskList.removeChild(li);
            removeTaskFromLocalStorage(text);
        };

        // Append remove button inside <li>
        li.appendChild(removeBtn);

        // Add <li> to the DOM
        taskList.appendChild(li);

        // Save to Local Storage ONLY if the user manually added it
        if (taskText === null) {
            saveTaskToLocalStorage(text);
            taskInput.value = "";
        }
    }

    // ---- Save a new task to Local Storage ----
    function saveTaskToLocalStorage(task) {
        const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // ---- Remove a task from Local Storage ----
    function removeTaskFromLocalStorage(task) {
        const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        const updated = tasks.filter(t => t !== task);
        localStorage.setItem("tasks", JSON.stringify(updated));
    }

    // ---- Load tasks from Local Storage ----
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        tasks.forEach(t => addTask(t, true));  // true = suppress alert
    }

    // Button click → add task
    addButton.addEventListener("click", function () {
        addTask();
    });

    // Pressing Enter inside input → add task
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") addTask();
    });
}
