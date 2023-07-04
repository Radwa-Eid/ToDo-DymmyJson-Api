let addTask = document.getElementById("addTask");
let addItem = document.getElementById("addItem");

let oldData;
let updateIndex;

async function getItem() {
    const res = await fetch('https://dummyjson.com/todos')
    const data = await res.json();
    oldData = data.todos;
    displayTodos(data.todos);
}

async function postItem(oldData, newItem) {
    if (newItem != "") {
        const res = await (fetch('https://dummyjson.com/todos/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                todo: newItem,
                completed: false,
                userId: 5,
            })
        }))
        const post = await res.json();
        post.id = oldData.length + 1;
        oldData.push(post)

    }
    else {
        alert("please Enter Item To add");
    }
    console.log(oldData);
    displayTodos(oldData)
}

async function updateItem(index) {
    const res = await fetch(`https://dummyjson.com/todos/${index}`, {
        method: 'PUT',              /* or PATCH */
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            completed: false,
        })
    })
    const update = await res.json();
    console.log(oldData)
    document.getElementById("addItem").style.cssText = "color:white";
    addItem.value = update.todo;
    addTask.innerText = "Update";
    updateIndex = index;
}

async function deleteOne(i) {
    // console.log(oldData)
    const res = await fetch(`https://dummyjson.com/todos/${i}`, {
        method: 'DELETE',
    })
    const deleteItem = await res.json();
    console.log(deleteItem)
    oldData.splice(i, 1)
    // console.log(oldData)
    displayTodos(oldData);
    alert("Todo Deleted");
}

function error() {
    console.log("errrorr");
}

(async function data() {
    try {
        getItem();
    }
    catch {
        error();
    }
})();

function displayTodos(data) {
    let todoList = '';
    for (let i = 0; i < data.length; i++) {
        todoList += `<tr>
        <td>${data[i].id}</td>
        <td>${data[i].todo}</td>
        <td><button onclick="updateItem(${data[i].id})" type="button" class="btn btn-outline-secondary">Update</button></td>
        <td><button onclick="deleteOne(${i})" type="button" class="btn btn-outline-secondary">Delete</button></td>
    </tr>`;
    }
    document.getElementById("tBody").innerHTML = todoList;
}

addTask.addEventListener("click", function () {
    if (addTask.innerText == "Update") {
        oldData[updateIndex - 1].todo = addItem.value;
        console.log(oldData);
        displayTodos(oldData);
        alert("Todo Updated");
        addTask.innerText = "addTask";
        addItem.value = '';
    }
    else {
        postItem(oldData, addItem.value);
        addItem.value = '';
        alert("Todo Added");
    }
})
