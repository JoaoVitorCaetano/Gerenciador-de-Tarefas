
const taskInput = document.querySelector("#txt1");
const taskList = document.querySelector(".task-container")
const addTaskBtn = document.querySelector("#addTaskBtn")
const nameTask = document.querySelector("#nameTask")
const popup = document.querySelector(".popup")
const select = document.querySelector("#dificuldade")
const taskDateInput = document.querySelector("#taskDate")
const Data = document.querySelector(".currentDate")

const date = new Date()
const dataAtual = date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
})
Data.innerHTML = `Data Atual: ${dataAtual}`

function salvarTask() {
    
    if (taskInput.value.length == 0) {
        alert("[Erro] Digite alguma tarefa");
        return;
    } else {
        
        const tasks = document.createElement("div");
        tasks.classList.add("tasks");

        
        const taskTitle = document.createElement("h3");
        taskTitle.innerText = taskInput.value;
        tasks.appendChild(taskTitle);


        const selectedDate = new Date(taskDateInput.value +  "T00:00:00")
        const dataFormatada = selectedDate.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        })
        
        const dataAtual = new Date();
        dataAtual.setHours(0, 0, 0, 0) 

        if (selectedDate < date) {
            alert("Essa data já passou")
            return;
        } else {
                const dateSpan = document.createElement("p") 
                dateSpan.classList.add("date-badge")
    
                dateSpan.innerText = dataFormatada 
                taskTitle.appendChild(dateSpan)
        }

        const selectedDifficulty = select.value;

        if (selectedDifficulty) {
            const difficultySpan = document.createElement("span"); 
            difficultySpan.classList.add("difficulty-badge");

            
            if (selectedDifficulty === "fácil") {  
                difficultySpan.classList.add("difficulty-easy");
            } else if (selectedDifficulty === "médio") {
                difficultySpan.classList.add("difficulty-medium");
            } else if (selectedDifficulty === "difícil") {
                difficultySpan.classList.add("difficulty-hard");
            }

            difficultySpan.innerText = selectedDifficulty; 
            tasks.appendChild(difficultySpan);
        }


        const doneBtn = document.createElement("button");
        doneBtn.classList.add("finish-task");
        doneBtn.innerHTML = '<i class="fa-solid fa-check" id="icon"></i>';
        tasks.appendChild(doneBtn);

        
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("remove-task");
        deleteBtn.innerHTML = '<i class="fa-solid fa-xmark" id="icon"></i>';
        tasks.appendChild(deleteBtn);

        
        taskList.appendChild(tasks);

        
        taskInput.value = "";
        select.value = "";
        taskDateInput.value = ""

        
        popup.style.display = "none";
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

addTaskBtn.addEventListener('click', function() {
    
    if (taskInput.value.length == 0) {
        alert("[Erro] Digite alguma tarefa");
        return;
    } else {
        popup.style.display = "flex"
        nameTask.innerText = taskInput.value
    }

})
