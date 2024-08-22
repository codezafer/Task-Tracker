# Task Tracker
Task Tracker is a simple Node.js command-line application for managing tasks. You can add, list, and remove tasks, which are stored in a JSON file.

Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/task-tracker.git
cd task-tracker

Usage
The Task Tracker application can be used through the command line. Below are the commands you can use:

Add a new task:

bash
Copy code
node task-tracker.js add "Your task description here"
This will add a new task with the given description.

List all tasks:

bash
Copy code
node task-tracker.js list
This will display a list of all tasks, showing their IDs, descriptions, and statuses (Completed/Pending).

Remove a task:

bash
Copy code
node task-tracker.js remove <task-id>
Replace <task-id> with the ID of the task you want to remove.

Project Structure
bash
Copy code
task-tracker/
├── tasks.json      # File where tasks are stored
├── task-tracker.js # Main application file
└── README.md       # Project documentation
tasks.json: Stores the tasks as a JSON array.
task-tracker.js: The main application script containing logic for adding, listing, and removing tasks.