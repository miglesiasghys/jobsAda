//****Selectores universales
const $=(selector=> document.querySelector(selector))
const $$=(selector=> document.querySelectorAll(selector))

//*****Mostrar vistas
const showView=(view)=>{
    $$(".view").forEach((view)=> view.classList.add("is-hidden"));
    $(`#${view}`).classList.remove("is-hidden")
}

//*****Obtener data de la Api
const getData= async()=>{
    showView("spinner")
    let response= await fetch("https://6533f91ee1b6f4c5904670c5.mockapi.io/api/jobs")
    let data= await response.json()
    setTimeout(()=>{initialization(data)}, 2000)
}

//*****Funciones que inicializan la web
const initialization=(data)=>{
    postData(data)
    getCountries(data)
}

//*****Filtrar por ID 
const getJobsById= async(id)=>{
    showView("spinner")
    let response= await fetch(`https://6533f91ee1b6f4c5904670c5.mockapi.io/api/jobs/${id}`) 
    let data= await response.json()
    setTimeout(()=>{showDetails(data)}, 2000)
}

//Filtro por parametros
const getFilter = async (param)=>{
    showView("spinner")
    let response= await fetch(`https://6533f91ee1b6f4c5904670c5.mockapi.io/api/jobs/seniority/${param}`)
    let data= await response.json()
    filter(data.seniority)
}

//*****Agregar trabajo nuevo
const addJob= async()=>{
    let response= await fetch("https://6533f91ee1b6f4c5904670c5.mockapi.io/api/jobs", {
        method: 'POST',
        headers: {'content-type':'application/json'},
        body: JSON.stringify(createNewJob())
    })
    const data= await response.json()
    
    createNewJob(data)
    getData()
    $("#form-new-job").reset()
}

//delete job
const deleteJob=(id)=>{
    fetch(`https://6533f91ee1b6f4c5904670c5.mockapi.io/api/jobs/${id}`, {
        method: 'DELETE',
    })
    getData()//vuelve a pintar sin el eliminado 
}

window= getData()