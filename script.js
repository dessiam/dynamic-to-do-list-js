// Initialize app once the HTML document has fully loaded
document.addEventListener("DOMContentLoaded", init);

// Main initialization function: select DOM elements, define addTask, attach listeners
function init() {
    // Select DOM elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Function to add a new task
    // If `suppressAlert` is true, do not show an alert when input is empty (used on load)
    function addTask(suppressAlert = false) {
        // Get and trim text from input field
        const taskText = taskInput.value.trim();

        // Check if input is empty
        if (taskText === "") {
            if (!suppressAlert) {
                alert("Please enter a task.");
            }
            return;
        }

        // Create a new list item <li>
        const li = document.createElement("li");
        li.textContent = taskText;

        // Create a remove button
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        // Use classList.add to assign the button class
        removeBtn.classList.add("remove-btn");

        // Add event to remove the task when button is clicked
        removeBtn.onclick = function () {
            taskList.removeChild(li);
        };

        // Append remove button to the list item
        li.appendChild(removeBtn);

        // Add the list item to the task list
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = "";
    }

    // Event listener for "Add Task" button
    addButton.addEventListener("click", addTask);

    // Allow adding tasks by pressing Enter
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // Invoke addTask on load safely (won't alert if input is empty)
    addTask(true);
}
