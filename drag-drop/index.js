let lists = document.getElementsByClassName("list");
let rightBox = document.getElementById("right");
let leftBox = document.getElementById("left");


function addTodo(){
    let task = document.getElementById("task");
    const todoItem = document.createElement('div');
todoItem.classList.add('list');
todoItem.setAttribute('draggable', "true");
todoItem.innerHTML = `<img src="icon.png" alt="icon">${task.value}`;
    leftBox.appendChild(todoItem);
    addListener(todoItem);
    task.value = "";
}

function addListener(list){
    list.addEventListener("dragstart", function(e){
        let selected = e.target;
        rightBox.addEventListener("dragover",function(e){
            e.preventDefault();
        });

        rightBox.addEventListener("drop", function(e){
            rightBox.appendChild(selected);
            selected.style.backgroundColor = "#019f55";
            selected = null;
        });

        leftBox.addEventListener("dragover",function(e){
            e.preventDefault();
        });

        leftBox.addEventListener("drop", function(e){
            leftBox.appendChild(selected);
            selected.style.backgroundColor = "#e91e63";
            selected = null;
        });
    })
}

for(list of lists) {
    addListener(list);
}