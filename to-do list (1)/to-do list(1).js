const inputBox= document.getElementById("input-box");
const listContainer=document.getElementById("list-container");
const completedCounter = document.getElementById("complete");
const uncompletedCounter = document.getElementById("uncomplete");

function addName(){
    let owner=document.createElement("header");
    const name=prompt("Please Input Name");
    owner=name+"'s "+"To-Do List";
    document.getElementById("header").innerHTML=owner;
}

function addTask(){
    const task= inputBox.value.trim();
    if(!task){
        alert("Please Input a Task");
    return;
    }

const li = document.createElement("li");

li.innerHTML = `
  <label>
    <input type="checkbox">
    <span>${task}</span>
  </label>
  <span class="edit-btn">Edit</span>
  <span class="delete-btn">Delete</span>
`;

listContainer.appendChild(li);
inputBox.value="";

const checkbox = li.querySelector("input");
const editBtn = li.querySelector(".edit-btn");
const taskSpan = li.querySelector("span");
const deleteBtn = li.querySelector(".delete-btn");

checkbox.addEventListener("click", function () {
    li.classList.toggle("complete", checkbox.checked);
  });


    checkbox.addEventListener("click", function () {
        li.classList.toggle("complete", checkbox.checked);
        //add the function below
        updateCounters();
      });

      editBtn.addEventListener("click", function () {
        const update = prompt("Edit Task:", taskSpan.textContent);
        if (update !== null) {
          taskSpan.textContent = update;
          li.classList.remove("complete");
          //add the code below
          checkbox.checked = false;
          updateCounters();
        }
    
  });

  deleteBtn.addEventListener("click", function () {
    if (confirm("Are you sure you want to delete this task?")) {
      li.remove();
      updateCounters();
    }
  });


updateCounters();
}

function updateCounters() {
    const completedTasks = document.querySelectorAll(".complete").length;
    const uncompletedTasks =
      document.querySelectorAll("li:not(.complete)").length;
    complete.textContent = completedTasks;
    uncomplete.textContent = uncompletedTasks;
  
    }







  
  
  