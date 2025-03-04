// seleção de elementos
const taskInput = document.querySelector("#txt1");
const taskList = document.querySelector(".task-container")

function salvarTask() {

    if (taskInput.value.length == 0) {
        alert("[Erro]Digite alguma tarefa")
    } else {
            const tasks = document.createElement("div")
            tasks.classList.add("tasks")

            const taskTitle = document.createElement("h3")
            taskTitle.innerText = taskInput.value
            tasks.appendChild(taskTitle)

            const doneBtn = document.createElement("button")
            doneBtn.classList.add("finish-task")
            doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
            tasks.appendChild(doneBtn)

            const deleteBtn = document.createElement("button")
            deleteBtn.classList.add("remove-task")
            deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
            tasks.appendChild(deleteBtn)

            taskList.appendChild(tasks)

            taskInput.value = ''
    }

}

document.addEventListener('click', (e) => {
    const elementoClicado = e.target
    const paiDoElemento = elementoClicado.closest('div')

    if (elementoClicado.classList.contains('remove-task')) {
        paiDoElemento.remove();
        console.log('remove')
    }

    if (elementoClicado.classList.contains('finish-task')) {
        paiDoElemento.classList.toggle("done");
        console.log('done')
    }
})