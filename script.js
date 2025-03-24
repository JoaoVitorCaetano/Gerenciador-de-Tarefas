
const taskInput = document.querySelector("#txt1");
const taskList = document.querySelector(".task-container")
const addTaskBtn = document.querySelector("#addTaskBtn")
const nameTask = document.querySelector("#nameTask")
const popup = document.querySelector(".popup")
const select = document.querySelector("#dificuldade")
const taskDateInput = document.querySelector("#taskDate")
const Data = document.querySelector(".currentDate")
const filterPopup = document.querySelector(".filter-popup")
const filterBtn = document.querySelector("#filterTaskBtn")
const addFilterBtn = document.querySelector("#filterBtn")
const filterDificuldade = document.querySelector("#dificuldade-filter")
const closeFilterBtn = document.querySelector("#closeFilterBtn")

//Obtém a data atual e exibe na interface
const date = new Date()
const dataAtual = date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
})
Data.innerHTML = `Data Atual: ${dataAtual}`

//Função para salvar uma nova tarefa
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

        if (taskDateInput.value.length == 0) {
            alert("Digite uma data válida")
            return;
        } else if (selectedDate < dataAtual) {
            alert("Essa data já passou")
            return;
        } else {
                const dateSpan = document.createElement("p") 
                dateSpan.classList.add("date-badge")
    
                dateSpan.innerText = dataFormatada 
                taskTitle.appendChild(dateSpan)
        }

        //Processa a dificuldade da tarefa
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

//Evento para capturar cliques e executar as funçoes de remover/concluir tarefas
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

//Exibe o popup de adicionar uma nova tarefa
addTaskBtn.addEventListener('click', function() {
    
    if (taskInput.value.length == 0) {
        alert("[Erro] Digite alguma tarefa");
        return;
    } else {
        popup.style.display = "flex"
        nameTask.innerText = taskInput.value
    }

})


//Exibe o popup de filtros
filterBtn.addEventListener('click', function() {
    filterPopup.style.display = "flex"
})

closeFilterBtn.addEventListener('click', function() {
    filterPopup.style.display = "none"
})

//Função para filtrar tarefas por dificuldade e data
function filterTasks() {
    const tasks = document.querySelectorAll(".tasks");

    if(filterDificuldade.value === "Todas"){
        tasks.forEach(task => {
            task.style.display = "flex";
        });
        return;
    } else{
        tasks.forEach(task => {
            const difficultySpan = task.querySelector(".difficulty-badge");
            const isCompleted = task.classList.contains("done");
            
            if (difficultySpan && !isCompleted) {
                const difficulty = difficultySpan.innerText;
        
                if (difficulty === filterDificuldade.value) {
                    task.style.display = "flex";
                }else {
                    task.style.display = "none";
                }
            }   
        });
    }
    
    const filterDateInput = document.querySelector("#data-filter");
    const filteredTasks = document.querySelectorAll('.tasks[style*="display: flex"]');

    if (filterDateInput.value) {
        const filterDate = new Date(filterDateInput.value + "T00:00:00");
        const dataFormatada = filterDate.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        })
        const filterDateFormatada = dataFormatada

        filteredTasks.forEach(task => {
            const dateSpan = task.querySelector(".date-badge").innerHTML;
            const isCompleted = task.classList.contains("done");
            if (dateSpan && !isCompleted) {
                if (dateSpan >= dataAtual && dateSpan <= filterDateFormatada) {
                    task.style.display = "flex";
                } else {
                    task.style.display = "none";
                }
            }
        });
    }

}
